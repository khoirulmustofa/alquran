<template>
  <div class="bg-[#d5dbe3] min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans antialiased text-slate-700">
    <!-- Outer window shell representing the modern desktop app standard -->
    <div class="w-full max-w-[1280px] h-[92vh] min-h-[680px] max-h-[960px] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-slate-200/80 relative">
      
      <!-- Mobile Sidebar Overlay & Drawer -->
      <div
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
        @click="isMobileSidebarOpen = false"
      >
        <div class="w-64 h-full bg-white shadow-xl" @click.stop>
          <AppSidebar />
        </div>
      </div>

      <!-- Desktop Left vertical navigation sidebar -->
      <div class="hidden md:block">
        <AppSidebar />
      </div>

      <!-- Main Content Shell -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#fbfcfd]">
        <!-- TopBar Header -->
        <AppTopBar
          title="Al-Qur'an Public REST API & Tester"
          subtitle="Akses API publik Al-Qur'an gratis, berkecepatan tinggi, tanpa token, dan langsung dari github.io"
          :show-mobile-toggle="true"
          @toggle-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
        />

        <!-- Content Area: 2-Column Layout (Endpoints List + Interactive Console) -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden relative min-w-0">
          
          <!-- Column 1: Endpoint Directory (Matching 72 width of Quran reader) -->
          <section class="w-full lg:w-72 shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/40">
            <!-- Header -->
            <div class="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">REST Endpoints</h3>
                <p class="text-xs text-slate-500">Pilih endpoint untuk menguji</p>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                v1.0
              </span>
            </div>

            <!-- Endpoint List -->
            <div class="flex-1 overflow-y-auto p-3 space-y-2">
              <button
                v-for="ep in endpoints"
                :key="ep.id"
                @click="selectEndpoint(ep)"
                :class="[
                  'w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5',
                  selectedEndpoint.id === ep.id
                    ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-white/70 hover:bg-white border-slate-100 hover:border-slate-200'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                    {{ ep.method }}
                  </span>
                  <span class="text-[10px] text-slate-400">{{ ep.tag }}</span>
                </div>
                <div class="font-mono text-xs font-semibold text-slate-800 truncate">
                  {{ ep.path }}
                </div>
                <div class="text-[11px] text-slate-500 line-clamp-1">
                  {{ ep.title }}
                </div>
              </button>

              <!-- Quick Info Card -->
              <div class="mt-4 p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm space-y-2">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="text-xs font-bold tracking-tight">CORS Enabled</span>
                </div>
                <p class="text-[11px] text-blue-100 leading-relaxed">
                  GitHub Pages menyajikan header <code class="bg-blue-700/60 px-1 py-0.5 rounded text-[10px]">Access-Control-Allow-Origin: *</code>. Siap diintegrasikan ke React, Vue, Flutter, dan backend Anda.
                </p>
                <div class="pt-1 flex items-center justify-between text-[10px] text-blue-200">
                  <span>114 Surah</span>
                  <span>•</span>
                  <span>604 Halaman</span>
                  <span>•</span>
                  <span>0ms Cold Start</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Column 2: Interactive Tester & Documentation -->
          <main class="flex-1 flex flex-col overflow-y-auto bg-white p-4 sm:p-6 md:p-8 space-y-6 min-w-0" data-purpose="api-tester-console">
            
            <!-- Endpoint Header & Live URL Bar -->
            <div class="space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">
                    {{ selectedEndpoint.method }}
                  </span>
                  <h2 class="text-base sm:text-lg font-bold text-slate-800">
                    {{ selectedEndpoint.title }}
                  </h2>
                </div>
                <div class="flex items-center gap-2">
                  <a
                    :href="calculatedFullUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5"
                    title="Buka langsung di tab baru"
                  >
                    <span>Buka URL</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    @click="copyToClipboard(calculatedFullUrl, 'url')"
                    class="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{{ copyStatus.url ? 'Tersalin!' : 'Salin URL' }}</span>
                  </button>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ selectedEndpoint.description }}
              </p>

              <!-- Interactive URL Bar & Request Trigger -->
              <div class="p-2 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div class="flex-1 flex items-center gap-2 px-2 overflow-hidden font-mono text-xs text-slate-700">
                  <span class="text-slate-400 select-none">URL:</span>
                  <span class="truncate font-semibold">{{ calculatedFullUrl }}</span>
                </div>
                <button
                  @click="executeRequest"
                  :disabled="isLoading"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <svg v-if="isLoading" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span>{{ isLoading ? 'Mengirim...' : 'Kirim Request' }}</span>
                </button>
              </div>
            </div>

            <!-- Parameters Section (if any) -->
            <div v-if="selectedEndpoint.params && selectedEndpoint.params.length" class="space-y-2">
              <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Parameter Permintaan</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="param in selectedEndpoint.params" :key="param.name" class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-slate-800 font-mono">{{ param.name }}</label>
                    <span class="text-[10px] text-rose-500 font-medium">required</span>
                  </div>
                  
                  <!-- Surah Select Dropdown -->
                  <div v-if="param.name === 'id'" class="flex items-center gap-2">
                    <select
                      v-model="paramValues['id']"
                      class="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option v-for="c in chaptersList" :key="c.id" :value="c.id">
                        {{ c.id }}. {{ c.name_simple }} ({{ c.name_arabic }}) - {{ c.verses_count }} ayat
                      </option>
                    </select>
                  </div>

                  <!-- Page Number Input -->
                  <div v-else-if="param.name === 'page'" class="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="604"
                      v-model.number="paramValues['page']"
                      class="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <span class="text-xs text-slate-400">/ 604</span>
                  </div>

                  <p class="text-[10px] text-slate-500">{{ param.description }}</p>
                </div>
              </div>
            </div>

            <!-- Response Panel -->
            <div class="space-y-3 min-w-0">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                  <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Response Inspector</h3>
                  <div v-if="responseMeta" class="flex flex-wrap items-center gap-1.5">
                    <span
                      :class="[
                        'text-[10px] font-bold px-2 py-0.5 rounded-full',
                        responseMeta.status === 200 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      ]"
                    >
                      {{ responseMeta.status }} {{ responseMeta.statusText }}
                    </span>
                    <span class="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {{ responseMeta.time }} ms
                    </span>
                    <span class="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {{ responseMeta.size }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <!-- Expand/Collapse Height Toggle to prevent scroll traps -->
                  <button
                    v-if="responseRaw"
                    @click="isJsonExpanded = !isJsonExpanded"
                    class="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                    :title="isJsonExpanded ? 'Kecilkan ke mode ringkas' : 'Perluas tampilan respons JSON'"
                  >
                    <svg v-if="!isJsonExpanded" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9L4 4m0 0v4m0-4h4m6 5l5-5m0 0h-4m4 0v4m-5 6l5 5m0 0v-4m0 4h-4m-6-5l-5 5m0 0h4m-4 0v-4" />
                    </svg>
                    <span>{{ isJsonExpanded ? 'Mode Ringkas' : 'Perluas JSON' }}</span>
                  </button>

                  <button
                    v-if="responseRaw"
                    @click="copyToClipboard(responseRaw, 'json')"
                    class="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{{ copyStatus.json ? 'Tersalin!' : 'Salin JSON' }}</span>
                  </button>
                </div>
              </div>

              <!-- JSON Display Console -->
              <div class="relative rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 overflow-hidden font-mono text-xs shadow-inner min-w-0">
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/60 text-[11px] text-slate-400">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span class="ml-2 font-mono text-slate-300">application/json</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span v-if="jsonLineCount" class="text-slate-500">{{ jsonLineCount }} baris</span>
                    <span>UTF-8</span>
                  </div>
                </div>
                
                <div
                  :class="[
                    'p-4 overflow-y-auto overflow-x-auto leading-relaxed select-text font-mono transition-all duration-200 overscroll-contain min-w-0',
                    isJsonExpanded ? 'max-h-[620px]' : 'max-h-80'
                  ]"
                >
                  <pre v-if="responseRaw" class="text-emerald-400 text-[11px] leading-5 whitespace-pre break-normal min-w-0">{{ responseRaw }}</pre>
                  <div v-else class="text-slate-500 py-10 text-center italic">
                    Klik tombol "Kirim Request" di atas untuk menjalankan pengujian live endpoint.
                  </div>
                </div>
              </div>
            </div>

            <!-- Multi-Language Code Snippets Section -->
            <div class="space-y-3 pt-2 border-t border-slate-100 min-w-0">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Integrasi Kode</h3>
                <div class="flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
                  <button
                    v-for="lang in codeLanguages"
                    :key="lang.id"
                    @click="activeCodeLang = lang.id"
                    :class="[
                      'px-2.5 py-1 rounded-md transition cursor-pointer',
                      activeCodeLang === lang.id ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    ]"
                  >
                    {{ lang.label }}
                  </button>
                </div>
              </div>

              <!-- Snippet Box -->
              <div class="relative rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 overflow-hidden font-mono text-xs min-w-0">
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/60 text-[11px] text-slate-400">
                  <span>{{ currentSnippetHeader }}</span>
                  <button
                    @click="copyToClipboard(currentSnippetCode, 'code')"
                    class="hover:text-white transition flex items-center gap-1 cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{{ copyStatus.code ? 'Tersalin!' : 'Salin Kode' }}</span>
                  </button>
                </div>
                <div class="p-4 overflow-x-auto text-blue-300 text-[11px] leading-5 min-w-0">
                  <pre class="whitespace-pre">{{ currentSnippetCode }}</pre>
                </div>
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isMobileSidebarOpen = ref(false)
const isLoading = ref(false)
const isJsonExpanded = ref(false)
const responseRaw = ref<string>('')
const responseMeta = ref<{ status: number; statusText: string; time: number; size: string } | null>(null)

const jsonLineCount = computed(() => {
  if (!responseRaw.value) return 0
  return responseRaw.value.split('\n').length
})

const copyStatus = ref<{ url: boolean; json: boolean; code: boolean }>({
  url: false,
  json: false,
  code: false
})

interface Endpoint {
  id: string
  method: 'GET'
  tag: string
  path: string
  title: string
  description: string
  params?: { name: string; description: string; defaultVal: any }[]
}

const endpoints: Endpoint[] = [
  {
    id: 'chapters',
    method: 'GET',
    tag: 'Surah',
    path: '/data/quran/chapters.json',
    title: 'Daftar 114 Surah Al-Qur\'an',
    description: 'Mengembalikan daftar lengkap 114 surah beserta nama Arab, nama latin, jumlah ayat, urutan wahyu, dan tempat turunnya.'
  },
  {
    id: 'surah',
    method: 'GET',
    tag: 'Ayat',
    path: '/data/quran/surah/{id}.json',
    title: 'Detail Ayat Berdasarkan Surah',
    description: 'Mengembalikan seluruh ayat dalam satu surah lengkap dengan teks Rasm Uthmani dan terjemahan bahasa Indonesia.',
    params: [
      { name: 'id', description: 'Nomor Surah (1 - 114). Contoh: 36 untuk Surah Ya Sin.', defaultVal: 36 }
    ]
  },
  {
    id: 'page',
    method: 'GET',
    tag: 'Mushaf',
    path: '/data/quran/page/{page}.json',
    title: 'Detail Ayat Berdasarkan Halaman',
    description: 'Mengembalikan ayat-ayat yang ada di halaman tertentu sesuai standar Mushaf Madinah (halaman 1 - 604).',
    params: [
      { name: 'page', description: 'Nomor Halaman Mushaf (1 - 604). Contoh: 1 untuk Al-Fatihah.', defaultVal: 1 }
    ]
  },
  {
    id: 'openapi',
    method: 'GET',
    tag: 'Spec',
    path: '/api/openapi.json',
    title: 'OpenAPI 3.0 Specification',
    description: 'Spesifikasi OpenAPI 3.0 standar untuk diimpor ke Postman, Swagger UI, Insomnia, atau SDK generators.'
  },
  {
    id: 'catalog',
    method: 'GET',
    tag: 'Discovery',
    path: '/api/index.json',
    title: 'API Root Catalog',
    description: 'Metadata ringkasan daftar seluruh endpoint, lisensi, dan dokumentasi API.'
  }
]

const selectedEndpoint = ref<Endpoint>(endpoints[0])
const paramValues = ref<Record<string, any>>({
  id: 36,
  page: 1
})

const chaptersList = ref<{ id: number; name_simple: string; name_arabic: string; verses_count: number }[]>([])

// Determine base URL dynamically (works locally and on github.io)
const baseUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin + (window.location.pathname.startsWith('/alquran') ? '/alquran' : '')
  }
  return 'https://khoirulmustofa.github.io/alquran'
})

const calculatedRelativePath = computed(() => {
  let path = selectedEndpoint.value.path
  if (selectedEndpoint.value.params) {
    for (const p of selectedEndpoint.value.params) {
      const val = paramValues.value[p.name] || p.defaultVal
      path = path.replace(`{${p.name}}`, String(val))
    }
  }
  return path
})

const calculatedFullUrl = computed(() => {
  return `${baseUrl.value}${calculatedRelativePath.value}`
})

const selectEndpoint = (ep: Endpoint) => {
  selectedEndpoint.value = ep
  if (ep.params) {
    for (const p of ep.params) {
      if (!paramValues.value[p.name]) {
        paramValues.value[p.name] = p.defaultVal
      }
    }
  }
  executeRequest()
}

const executeRequest = async () => {
  isLoading.value = true
  const startTime = performance.now()
  try {
    const res = await fetch(calculatedFullUrl.value)
    const endTime = performance.now()
    const text = await res.text()
    
    // Format JSON with 2 spaces indent
    try {
      const parsed = JSON.parse(text)
      responseRaw.value = JSON.stringify(parsed, null, 2)
    } catch {
      responseRaw.value = text
    }

    const byteLen = new Blob([text]).size
    const sizeStr = byteLen > 1024 ? `${(byteLen / 1024).toFixed(1)} KB` : `${byteLen} B`

    responseMeta.value = {
      status: res.status,
      statusText: res.statusText || (res.status === 200 ? 'OK' : ''),
      time: Math.round(endTime - startTime),
      size: sizeStr
    }
  } catch (err: any) {
    const endTime = performance.now()
    responseRaw.value = JSON.stringify({ error: 'Network / Fetch Error', details: err?.message || String(err) }, null, 2)
    responseMeta.value = {
      status: 0,
      statusText: 'Fetch Error',
      time: Math.round(endTime - startTime),
      size: '0 B'
    }
  } finally {
    isLoading.value = false
  }
}

const copyToClipboard = async (text: string, type: 'url' | 'json' | 'code') => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(text)
    copyStatus.value[type] = true
    setTimeout(() => {
      copyStatus.value[type] = false
    }, 2000)
  }
}

// Code Integration Snippets
const codeLanguages = [
  { id: 'curl', label: 'cURL' },
  { id: 'js', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'php', label: 'PHP' }
]
const activeCodeLang = ref('curl')

const currentSnippetHeader = computed(() => {
  switch (activeCodeLang.value) {
    case 'curl': return 'Terminal / Bash cURL'
    case 'js': return 'Browser / Node.js (fetch)'
    case 'python': return 'Python 3 (requests)'
    case 'php': return 'PHP 7+ / 8+'
    default: return ''
  }
})

const currentSnippetCode = computed(() => {
  const url = calculatedFullUrl.value
  switch (activeCodeLang.value) {
    case 'curl':
      return `curl -s -X GET "${url}"`
    case 'js':
      return `// JavaScript (Modern Fetch API)\nconst res = await fetch("${url}");\nconst data = await res.json();\nconsole.log(data);`
    case 'python':
      return `# Python 3\nimport requests\n\nresponse = requests.get("${url}")\ndata = response.json()\nprint(data)`
    case 'php':
      return `<?php\n// PHP 7+ / 8+\n$json = file_get_contents("${url}");\n$data = json_decode($json, true);\nprint_r($data);`
    default:
      return ''
  }
})

onMounted(async () => {
  // Fetch chapters catalog for dropdown options
  try {
    const res = await fetch(`${baseUrl.value}/data/quran/chapters.json`)
    if (res.ok) {
      chaptersList.value = await res.json()
    }
  } catch (err) {
    console.error('Failed to load chapters catalog', err)
  }
  // Auto execute initial request
  executeRequest()
})
</script>
