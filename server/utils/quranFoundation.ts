import fs from 'node:fs/promises'
import path from 'node:path'

interface TokenCache {
  accessToken: string
  expiresAt: number
}

let cachedToken: TokenCache | null = null

const ENV_CONFIG = {
  prelive: {
    authUrl: 'https://prelive-oauth2.quran.foundation/oauth2/token',
    apiUrl: 'https://apis-prelive.quran.foundation'
  },
  production: {
    authUrl: 'https://oauth2.quran.foundation/oauth2/token',
    apiUrl: 'https://apis.quran.foundation'
  }
}

export function getQfConfig() {
  const env = (process.env.QF_ENV || 'prelive') as 'prelive' | 'production'
  const config = ENV_CONFIG[env] || ENV_CONFIG.prelive
  const clientId = process.env.QF_CLIENT_ID || 'f19df7ac-fab1-4392-ac83-403fb84bac58'
  const clientSecret = process.env.QF_CLIENT_SECRET || 'qfcs_555af425b2664c47bfbd9b88a245e8274a014ed28b9a4a3c91c6850c7c85c4d3'

  return {
    env,
    authUrl: config.authUrl,
    apiUrl: config.apiUrl,
    clientId,
    clientSecret
  }
}

/**
 * Mendapatkan Access Token JWT dari OAuth2 Quran Foundation
 * dengan auto-refresh dan caching di memori.
 */
export async function getQfAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.accessToken
  }

  const { authUrl, clientId, clientSecret } = getQfConfig()
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&scope=content'
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gagal mendapatkan token Quran Foundation: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const expiresInMs = (data.expires_in || 3600) * 1000
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + expiresInMs
  }

  return cachedToken.accessToken
}

/**
 * File-based Cache Helper:
 * Menyimpan data API ke file JSON di direktori public/data/quran/
 * Jika file sudah ada, baca langsung dari disk (0ms). Jika belum, panggil fetchFn dan simpan.
 */
export async function getCachedOrFetchJson<T>(
  relativeFilePath: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const basePath = path.resolve(process.cwd(), 'public/data/quran')
  const fullPath = path.join(basePath, relativeFilePath)

  try {
    const fileContent = await fs.readFile(fullPath, 'utf-8')
    return JSON.parse(fileContent) as T
  } catch {
    // File belum ada di cache, lakukan fetch ke API
    const data = await fetchFn()

    // Simpan ke file JSON secara async
    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (writeErr) {
      console.warn(`Gagal menulis file cache ${fullPath}:`, writeErr)
    }

    return data
  }
}

/**
 * Memanggil endpoint Content API Quran Foundation dengan token otomatis
 */
export async function fetchQfContent<T>(endpoint: string): Promise<T> {
  const token = await getQfAccessToken()
  const { apiUrl, clientId } = getQfConfig()

  const fullUrl = `${apiUrl}/content/api/v4${endpoint}`
  const response = await fetch(fullUrl, {
    headers: {
      'x-auth-token': token,
      'x-client-id': clientId
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Quran Foundation Content API Error: ${response.status} - ${errorText}`)
  }

  return response.json() as Promise<T>
}
