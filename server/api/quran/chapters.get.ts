import { defineEventHandler } from 'h3'
import { getCachedOrFetchJson, fetchQfContent } from '~~/server/utils/quranFoundation'
import { SURAH_LIST } from '~~/app/data/surahData'

export default defineEventHandler(async () => {
  return await getCachedOrFetchJson('chapters.json', async () => {
    try {
      const qfData = await fetchQfContent<any>('/chapters?language=id')
      if (qfData && Array.isArray(qfData.chapters) && qfData.chapters.length >= 114) {
        return qfData.chapters
      }

      // Jika di lingkungan prelive/sandbox hanya mengembalikan 2 chapter contoh,
      // kita gabungkan dengan metadata 114 surah lengkap agar aplikasi tetap kaya data
      const qfMap = new Map((qfData.chapters || []).map((c: any) => [c.id, c]))

      return SURAH_LIST.map((meta) => {
        const fromQf = qfMap.get(meta.nomor)
        if (fromQf) return fromQf

        return {
          id: meta.nomor,
          revelation_place: meta.tempatTurun === 'Mekah' ? 'makkah' : 'madinah',
          revelation_order: meta.nomor,
          bismillah_pre: meta.nomor !== 9,
          name_simple: meta.namaLatin,
          name_complex: meta.namaLatin,
          name_arabic: meta.namaArab,
          verses_count: meta.jumlahAyat,
          pages: [1, 1],
          translated_name: {
            language_name: 'indonesian',
            name: meta.arti
          }
        }
      })
    } catch (err) {
      console.warn('Fallback ke daftar surah lokal:', err)
      return SURAH_LIST.map((meta) => ({
        id: meta.nomor,
        revelation_place: meta.tempatTurun === 'Mekah' ? 'makkah' : 'madinah',
        revelation_order: meta.nomor,
        bismillah_pre: meta.nomor !== 9,
        name_simple: meta.namaLatin,
        name_complex: meta.namaLatin,
        name_arabic: meta.namaArab,
        verses_count: meta.jumlahAyat,
        pages: [1, 1],
        translated_name: {
          language_name: 'indonesian',
          name: meta.arti
        }
      }))
    }
  })
})
