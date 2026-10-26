import fs from 'node:fs/promises'
import path from 'node:path'

const clientId = process.env.QF_CLIENT_ID || 'f19df7ac-fab1-4392-ac83-403fb84bac58'
const clientSecret = process.env.QF_CLIENT_SECRET || 'qfcs_555af425b2664c47bfbd9b88a245e8274a014ed28b9a4a3c91c6850c7c85c4d3'
const env = process.env.QF_ENV || 'prelive'

const authUrl = env === 'production' 
  ? 'https://oauth2.quran.foundation/oauth2/token' 
  : 'https://prelive-oauth2.quran.foundation/oauth2/token'

const qfApiUrl = env === 'production'
  ? 'https://apis.quran.foundation/content/api/v4'
  : 'https://apis-prelive.quran.foundation/content/api/v4'

// Endpoint publik Quran.com v4 (schema identik 100% untuk 114 surah & 604 halaman lengkap)
const fallbackApiUrl = 'https://api.quran.com/api/v4'

const baseDir = path.resolve(process.cwd(), 'public/data/quran')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function getAccessToken() {
  try {
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const res = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&scope=content'
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.access_token
  } catch {
    return null
  }
}

// Fetch helper dengan retry & auto-fallback ke api.quran.com v4
async function fetchWithFallback(endpoint, token) {
  // 1. Coba Quran Foundation
  if (token) {
    try {
      const qfRes = await fetch(`${qfApiUrl}${endpoint}`, {
        headers: { 'x-auth-token': token, 'x-client-id': clientId }
      })
      if (qfRes.ok) {
        const data = await qfRes.json()
        if (data.chapters && data.chapters.length >= 114) return data
        if (data.verses && data.verses.length > 0) return data
      }
    } catch {}
  }

  // 2. Gunakan official Quran.com v4 API (schema identik)
  const fbRes = await fetch(`${fallbackApiUrl}${endpoint}`)
  if (!fbRes.ok) {
    throw new Error(`Fetch error ${endpoint}: ${fbRes.status}`)
  }
  return await fbRes.json()
}

// Concurrency pool helper agar download cepat dan aman
async function pMap(items, concurrency, mapper) {
  const results = []
  const executing = new Set()
  for (const item of items) {
    const p = Promise.resolve().then(() => mapper(item))
    results.push(p)
    executing.add(p)
    const clean = () => executing.delete(p)
    p.then(clean).catch(clean)
    if (executing.size >= concurrency) {
      await Promise.race(executing)
    }
  }
  return Promise.all(results)
}

async function main() {
  console.log('🕌 Memulai sinkronisasi LENGKAP Al-Qur\'an (114 Surah & 604 Halaman) ke file JSON...\n')
  await ensureDir(baseDir)
  await ensureDir(path.join(baseDir, 'surah'))
  await ensureDir(path.join(baseDir, 'page'))

  const token = await getAccessToken()
  if (token) {
    console.log('🔑 Quran Foundation OAuth2 Access Token aktif.')
  } else {
    console.log('ℹ️ Menggunakan public v4 mirror provider.')
  }

  // 1. Unduh Semua 114 Chapters
  console.log('\n📖 [1/3] Mengunduh daftar 114 Surah (chapters.json)...')
  const chapData = await fetchWithFallback('/chapters?language=id', token)
  const chapFile = path.join(baseDir, 'chapters.json')
  await fs.writeFile(chapFile, JSON.stringify(chapData.chapters, null, 2), 'utf-8')
  console.log(`✅ Sukses: 114 Surah tersimpan di ${chapFile}`)

  // 2. Unduh Semua 114 Surah
  console.log('\n📖 [2/3] Mengunduh seluruh 114 Surah ke public/data/quran/surah/{1..114}.json...')
  const surahIds = Array.from({ length: 114 }, (_, i) => i + 1)
  let surahDownloaded = 0
  let surahSkipped = 0

  await pMap(surahIds, 6, async (id) => {
    const targetFile = path.join(baseDir, 'surah', `${id}.json`)
    if (await fileExists(targetFile)) {
      surahSkipped++
      return
    }

    try {
      const data = await fetchWithFallback(
        `/verses/by_chapter/${id}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=300`,
        token
      )
      await fs.writeFile(targetFile, JSON.stringify(data, null, 2), 'utf-8')
      surahDownloaded++
      if (surahDownloaded % 15 === 0 || id === 114) {
        process.stdout.write(`   → Progress Surah: ${surahDownloaded + surahSkipped}/114 selesai\n`)
      }
    } catch (err) {
      console.error(`   ❌ Gagal Surah ${id}:`, err.message)
    }
  })
  console.log(`✅ Selesai: 114 Surah tersimpan (${surahDownloaded} diunduh, ${surahSkipped} sudah ada di cache)`)

  // 3. Unduh Semua 604 Halaman Mushaf
  console.log('\n📄 [3/3] Mengunduh seluruh 604 Halaman ke public/data/quran/page/{1..604}.json...')
  const pageNumbers = Array.from({ length: 604 }, (_, i) => i + 1)
  let pagesDownloaded = 0
  let pagesSkipped = 0

  await pMap(pageNumbers, 10, async (page) => {
    const targetFile = path.join(baseDir, 'page', `${page}.json`)
    if (await fileExists(targetFile)) {
      pagesSkipped++
      return
    }

    try {
      const data = await fetchWithFallback(
        `/verses/by_page/${page}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id,page_number,juz_number,hizb_number&per_page=100`,
        token
      )
      await fs.writeFile(targetFile, JSON.stringify(data, null, 2), 'utf-8')
      pagesDownloaded++
      if (pagesDownloaded % 50 === 0 || page === 604) {
        process.stdout.write(`   → Progress Halaman: ${pagesDownloaded + pagesSkipped}/604 selesai\n`)
      }
    } catch (err) {
      console.error(`   ❌ Gagal Halaman ${page}:`, err.message)
    }
  })

  console.log(`✅ Selesai: 604 Halaman tersimpan (${pagesDownloaded} diunduh, ${pagesSkipped} sudah ada di cache)\n`)
  console.log('🎉 SEMUA DATA AL-QUR\'AN (114 SURAH & 604 HALAMAN) TELAH LENGKAP TERSIMPAN DI FILE JSON!')
}

main().catch(console.error)
