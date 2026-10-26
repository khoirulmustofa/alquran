// =====================================================================
// Quran Foundation API v4 Official Schema
// =====================================================================

export interface QFTranslatedName {
  language_name: string
  name: string
}

export interface QFChapter {
  id: number
  revelation_place: 'makkah' | 'madinah'
  revelation_order: number
  bismillah_pre: boolean
  name_simple: string
  name_complex: string
  name_arabic: string
  verses_count: number
  pages: [number, number]
  translated_name: QFTranslatedName
}

export interface QFChaptersResponse {
  chapters: QFChapter[]
}

export interface QFTranslation {
  id: number
  resource_id: number
  text: string
}

export interface QFVerse {
  id: number
  verse_number: number
  verse_key: string
  hizb_number?: number
  rub_el_hizb_number?: number
  ruku_number?: number
  manzil_number?: number
  sajdah_number?: number | null
  text_uthmani: string
  chapter_id: number
  page_number: number
  juz_number: number
  translations?: QFTranslation[]
  audio?: {
    url?: string
  }
}

export interface QFVersesResponse {
  verses: QFVerse[]
  pagination?: {
    per_page: number
    current_page: number
    next_page: number | null
    total_pages: number
    total_records: number
  }
}

// =====================================================================
// UI State & Application Types
// =====================================================================

export type QuranViewMode = 'surah' | 'page'

export interface PageInfo {
  pageNumber: number
  juzNumber: number
  surahNames: string[]
  versesCount: number
}

export interface NormalizedAyat {
  nomorAyat: number
  verseKey: string
  teksArab: string
  teksLatin?: string
  teksIndonesia: string
  pageNumber: number
  juzNumber: number
  chapterId: number
  audioUrl?: string
}

export interface NormalizedSurah {
  nomor: number
  namaLatin: string
  namaArab: string
  arti: string
  jumlahAyat: number
  tempatTurun: 'Mekah' | 'Madinah'
  halamanMulai: number
  halamanAkhir: number
  ayat: NormalizedAyat[]
}
