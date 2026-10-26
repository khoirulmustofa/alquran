import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getCachedOrFetchJson, fetchQfContent } from '~~/server/utils/quranFoundation'
import { INITIAL_AL_BAQARAH, INITIAL_AL_FATIHAH } from '~~/app/data/surahData'

export default defineEventHandler(async (event) => {
  const pageParam = getRouterParam(event, 'page')
  const pageNumber = Number(pageParam)

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
    throw createError({ statusCode: 400, message: 'Nomor Halaman tidak valid (1-604)' })
  }

  const cacheFileName = `page/${pageNumber}.json`

  return await getCachedOrFetchJson(cacheFileName, async () => {
    // 1. Coba ambil dari Quran Foundation API resmi
    try {
      const qfRes = await fetchQfContent<any>(
        `/verses/by_page/${pageNumber}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=100`
      )

      if (qfRes && Array.isArray(qfRes.verses) && qfRes.verses.length > 0) {
        return {
          source: 'quran_foundation',
          page_number: pageNumber,
          total_verses: qfRes.verses.length,
          verses: qfRes.verses
        }
      }
    } catch (qfErr) {
      console.warn(`Quran Foundation API prelive belum mencakup Halaman ${pageNumber}:`, qfErr)
    }

    // 2. Coba ambil dari Quran.com v4 mirror (schema identik 100%)
    try {
      const mirrorRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_page/${pageNumber}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=100`
      )
      if (mirrorRes.ok) {
        const mirrorJson = await mirrorRes.json()
        if (mirrorJson && Array.isArray(mirrorJson.verses) && mirrorJson.verses.length > 0) {
          return {
            source: 'quran_v4_mirror',
            page_number: pageNumber,
            total_verses: mirrorJson.verses.length,
            verses: mirrorJson.verses
          }
        }
      }
    } catch (mErr) {
      console.warn(`Mirror fetch error untuk halaman ${pageNumber}:`, mErr)
    }

    // 3. Fallback untuk Halaman 1 & 2 dari data lokal jika offline
    if (pageNumber === 1) {
      return {
        source: 'local_fallback',
        page_number: 1,
        total_verses: INITIAL_AL_FATIHAH.ayat.length,
        verses: INITIAL_AL_FATIHAH.ayat.map(a => ({
          id: a.nomorAyat,
          verse_number: a.nomorAyat,
          verse_key: `1:${a.nomorAyat}`,
          text_uthmani: a.teksArab,
          teks_latin: a.teksLatin,
          chapter_id: 1,
          page_number: 1,
          juz_number: 1,
          translations: [{ id: a.nomorAyat, resource_id: 33, text: a.teksIndonesia }]
        }))
      }
    }

    if (pageNumber === 2) {
      return {
        source: 'local_fallback',
        page_number: 2,
        total_verses: INITIAL_AL_BAQARAH.ayat.length,
        verses: INITIAL_AL_BAQARAH.ayat.map(a => ({
          id: a.nomorAyat,
          verse_number: a.nomorAyat,
          verse_key: `2:${a.nomorAyat}`,
          text_uthmani: a.teksArab,
          teks_latin: a.teksLatin,
          chapter_id: 2,
          page_number: 2,
          juz_number: 1,
          translations: [{ id: a.nomorAyat, resource_id: 33, text: a.teksIndonesia }]
        }))
      }
    }

    return {
      source: 'local_fallback',
      page_number: pageNumber,
      total_verses: 0,
      verses: []
    }
  })
})
