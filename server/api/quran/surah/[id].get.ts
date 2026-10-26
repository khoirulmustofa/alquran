import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getCachedOrFetchJson, fetchQfContent } from '~~/server/utils/quranFoundation'
import { INITIAL_AL_BAQARAH, INITIAL_AL_FATIHAH } from '~~/app/data/surahData'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const chapterId = Number(idParam)

  if (isNaN(chapterId) || chapterId < 1 || chapterId > 114) {
    throw createError({ statusCode: 400, message: 'ID Surah tidak valid (1-114)' })
  }

  const cacheFileName = `surah/${chapterId}.json`

  return await getCachedOrFetchJson(cacheFileName, async () => {
    // 1. Coba ambil dari Quran Foundation API resmi
    try {
      const qfRes = await fetchQfContent<any>(
        `/verses/by_chapter/${chapterId}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=300`
      )

      if (qfRes && Array.isArray(qfRes.verses) && qfRes.verses.length > 0) {
        return {
          source: 'quran_foundation',
          chapter_id: chapterId,
          total_verses: qfRes.verses.length,
          verses: qfRes.verses
        }
      }
    } catch (qfErr) {
      console.warn(`Quran Foundation API belum mencakup Surah ${chapterId} di prelive:`, qfErr)
    }

    // 2. Coba ambil dari Quran.com v4 mirror (schema identik 100%)
    try {
      const mirrorRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=300`
      )
      if (mirrorRes.ok) {
        const mirrorJson = await mirrorRes.json()
        if (mirrorJson && Array.isArray(mirrorJson.verses) && mirrorJson.verses.length > 0) {
          return {
            source: 'quran_v4_mirror',
            chapter_id: chapterId,
            total_verses: mirrorJson.verses.length,
            verses: mirrorJson.verses
          }
        }
      }
    } catch (mErr) {
      console.warn(`Mirror fetch error untuk surah ${chapterId}:`, mErr)
    }

    // 3. Fallback ke EQuran API v2 (Kemenag)
    try {
      const equranRes = await fetch(`https://equran.nos.wjv-1.neo.id/api/v2/surat/${chapterId}`)
      if (equranRes.ok) {
        const json = await equranRes.json()
        if (json && json.data && Array.isArray(json.data.ayat)) {
          const verses = json.data.ayat.map((item: any) => ({
            id: item.nomorAyat,
            verse_number: item.nomorAyat,
            verse_key: `${chapterId}:${item.nomorAyat}`,
            text_uthmani: item.teksArab,
            teks_latin: item.teksLatin,
            chapter_id: chapterId,
            page_number: 1,
            juz_number: 1,
            translations: [
              {
                id: item.nomorAyat,
                resource_id: 33,
                text: item.teksIndonesia
              }
            ],
            audio: {
              url: item.audio?.['05'] || item.audio?.['01'] || ''
            }
          }))

          return {
            source: 'kemenag_equran',
            chapter_id: chapterId,
            total_verses: verses.length,
            verses
          }
        }
      }
    } catch (eqErr) {
      console.warn('Fallback ke initial static surah data:', eqErr)
    }

    // 4. Fallback ke initial dataset
    const staticData = chapterId === 1 ? INITIAL_AL_FATIHAH : INITIAL_AL_BAQARAH
    return {
      source: 'local_fallback',
      chapter_id: chapterId,
      total_verses: staticData.ayat.length,
      verses: staticData.ayat.map(a => ({
        id: a.nomorAyat,
        verse_number: a.nomorAyat,
        verse_key: `${chapterId}:${a.nomorAyat}`,
        text_uthmani: a.teksArab,
        teks_latin: a.teksLatin,
        chapter_id: chapterId,
        page_number: 1,
        juz_number: 1,
        translations: [{ id: a.nomorAyat, resource_id: 33, text: a.teksIndonesia }],
        audio: { url: a.audio || '' }
      }))
    }
  })
})
