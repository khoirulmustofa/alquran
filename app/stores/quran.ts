import { defineStore } from 'pinia'
import {
  SURAH_LIST,
  INITIAL_AL_BAQARAH,
  INITIAL_AL_FATIHAH,
  toArabicNumber,
  type SurahMeta,
  type SurahDetail,
  type AyatItem
} from '~/data/surahData'
import type { QuranViewMode, NormalizedAyat } from '~/types/quran'

export interface BookmarkItem {
  id: string
  surahNomor: number
  surahNama: string
  ayatNomor: number
  teksArab: string
  createdAt: number
}

export const useQuranStore = defineStore('quran', {
  state: () => ({
    // Mode tampilan: 'surah' (default) atau 'page' (per halaman mushaf)
    viewMode: 'surah' as QuranViewMode,

    // Data Surah
    surahList: SURAH_LIST as SurahMeta[],
    selectedSurah: INITIAL_AL_BAQARAH as SurahDetail,
    searchQuery: '',

    // Data Halaman (Mushaf Page 1 - 604)
    currentPage: 1,
    totalPages: 604,
    pageVerses: [] as NormalizedAyat[],
    pageSearchQuery: '',

    // Status & Playback
    isLoading: false,
    errorMessage: '',
    isPlaying: false,
    currentPlayingAyat: null as number | null,
    audioInstance: null as HTMLAudioElement | null,
    bookmarks: [] as BookmarkItem[]
  }),

  getters: {
    filteredSurahList(state): SurahMeta[] {
      if (!state.searchQuery.trim()) {
        return state.surahList
      }
      const query = state.searchQuery.toLowerCase().trim()
      return state.surahList.filter(s =>
        s.namaLatin.toLowerCase().includes(query) ||
        s.arti.toLowerCase().includes(query) ||
        s.namaArab.includes(query) ||
        String(s.nomor).includes(query)
      )
    },

    // Informasi juz dan surah untuk halaman aktif saat ini
    currentPageInfo(state): { juz: number, surahNames: string[] } {
      if (state.pageVerses.length > 0) {
        const juz = state.pageVerses[0].juzNumber || 1
        const surahIds = [...new Set(state.pageVerses.map(v => v.chapterId))]
        const surahNames = surahIds
          .map(id => state.surahList.find(s => s.nomor === id)?.namaLatin)
          .filter((name): name is string => Boolean(name))

        return { juz, surahNames }
      }
      return { juz: 1, surahNames: ['Al-Fatihah'] }
    },

    isBookmarked: (state) => (surahNomor: number, ayatNomor: number) => {
      return state.bookmarks.some(
        b => b.surahNomor === surahNomor && b.ayatNomor === ayatNomor
      )
    }
  },

  actions: {
    setViewMode(mode: QuranViewMode) {
      this.viewMode = mode
      this.stopAudio()
      if (mode === 'page' && this.pageVerses.length === 0) {
        this.selectPage(this.currentPage)
      }
    },

    initBookmarks() {
      if (import.meta.client) {
        try {
          const saved = localStorage.getItem('ramadhan_pro_bookmarks')
          if (saved) {
            this.bookmarks = JSON.parse(saved)
          }
        } catch (e) {
          console.error('Gagal memuat bookmarks', e)
        }
      }
    },

    async initChapters() {
      try {
        const response = await fetch('/api/quran/chapters')
        if (response.ok) {
          const chapters = await response.json()
          if (Array.isArray(chapters) && chapters.length > 0) {
            this.surahList = chapters.map((c: any) => ({
              nomor: c.id,
              namaLatin: c.name_simple || c.namaLatin,
              namaArab: c.name_arabic || c.namaArab,
              arti: c.translated_name?.name || c.arti || '',
              jumlahAyat: c.verses_count || c.jumlahAyat || 0,
              tempatTurun: c.revelation_place === 'makkah' || c.tempatTurun === 'Mekah' ? 'Mekah' : 'Madinah'
            }))
          }
        }
      } catch (err) {
        console.warn('Menggunakan fallback daftar surah lokal:', err)
      }
    },

    toggleBookmark(ayat: { nomorAyat: number, teksArab: string, chapterId?: number }) {
      const surahNomor = ayat.chapterId || this.selectedSurah?.nomor || 1
      const ayatNomor = ayat.nomorAyat
      const id = `${surahNomor}:${ayatNomor}`
      const surahNama = this.surahList.find(s => s.nomor === surahNomor)?.namaLatin || `Surah ${surahNomor}`

      const index = this.bookmarks.findIndex(b => b.id === id)
      if (index >= 0) {
        this.bookmarks.splice(index, 1)
      } else {
        this.bookmarks.push({
          id,
          surahNomor,
          surahNama,
          ayatNomor,
          teksArab: ayat.teksArab,
          createdAt: Date.now()
        })
      }

      if (import.meta.client) {
        try {
          localStorage.setItem('ramadhan_pro_bookmarks', JSON.stringify(this.bookmarks))
        } catch (e) {
          console.error('Gagal menyimpan bookmarks', e)
        }
      }
    },

    async selectSurah(nomor: number) {
      const meta = this.surahList.find(s => s.nomor === nomor)
      if (!meta) return

      this.stopAudio()

      // Assign initial fallback for instant render
      if (nomor === 1) {
        this.selectedSurah = { ...INITIAL_AL_FATIHAH }
      } else if (nomor === 2) {
        this.selectedSurah = { ...INITIAL_AL_BAQARAH }
      } else {
        this.selectedSurah = {
          ...meta,
          nomorArab: toArabicNumber(meta.nomor),
          ayat: []
        }
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        const response = await fetch(`/api/quran/surah/${nomor}`)
        if (response.ok) {
          const res = await response.json()
          if (res && Array.isArray(res.verses)) {
            const mappedAyat: AyatItem[] = res.verses.map((v: any) => ({
              nomorAyat: v.verse_number || v.id,
              teksArab: v.text_uthmani,
              teksLatin: v.teks_latin || `Ayat ${v.verse_number}`,
              teksIndonesia: v.translations?.[0]?.text || '',
              audio: v.audio?.url || ''
            }))

            this.selectedSurah = {
              nomor: meta.nomor,
              namaLatin: meta.namaLatin,
              namaArab: meta.namaArab,
              arti: meta.arti,
              jumlahAyat: meta.jumlahAyat,
              tempatTurun: meta.tempatTurun,
              nomorArab: toArabicNumber(meta.nomor),
              ayat: mappedAyat
            }
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat ayat dari server route, menggunakan fallback:', err)
      } finally {
        this.isLoading = false
      }
    },

    async selectPage(pageNumber: number) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return

      this.currentPage = pageNumber
      this.stopAudio()
      this.isLoading = true
      this.errorMessage = ''

      try {
        const response = await fetch(`/api/quran/page/${pageNumber}`)
        if (response.ok) {
          const res = await response.json()
          if (res && Array.isArray(res.verses)) {
            this.pageVerses = res.verses.map((v: any) => ({
              nomorAyat: v.verse_number || v.id,
              verseKey: v.verse_key || `${v.chapter_id}:${v.verse_number}`,
              teksArab: v.text_uthmani,
              teksLatin: v.teks_latin || `Ayat ${v.verse_number}`,
              teksIndonesia: v.translations?.[0]?.text || '',
              pageNumber: v.page_number || pageNumber,
              juzNumber: v.juz_number || 1,
              chapterId: v.chapter_id || 1,
              audioUrl: v.audio?.url || ''
            }))
          }
        }
      } catch (err) {
        console.warn(`Gagal memuat halaman ${pageNumber}:`, err)
      } finally {
        this.isLoading = false
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.selectPage(this.currentPage + 1)
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.selectPage(this.currentPage - 1)
      }
    },

    playAyatAudio(audioUrl?: string, ayatNomor?: number) {
      if (!audioUrl) return

      if (this.currentPlayingAyat === ayatNomor && this.isPlaying) {
        this.pauseAudio()
        return
      }

      this.stopAudio()

      if (import.meta.client) {
        this.audioInstance = new Audio(audioUrl)
        this.currentPlayingAyat = ayatNomor ?? null
        this.isPlaying = true

        this.audioInstance.play().catch(e => {
          console.error('Audio playback error', e)
          this.stopAudio()
        })

        this.audioInstance.onended = () => {
          this.stopAudio()
        }
      }
    },

    pauseAudio() {
      if (this.audioInstance) {
        this.audioInstance.pause()
        this.isPlaying = false
      }
    },

    stopAudio() {
      if (this.audioInstance) {
        this.audioInstance.pause()
        this.audioInstance = null
      }
      this.isPlaying = false
      this.currentPlayingAyat = null
    }
  }
})
