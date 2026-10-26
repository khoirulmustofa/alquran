<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-700">
    <!-- Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div
            class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.25 0 4.33-.74 6-2-5-1-8.5-4.5-8.5-9.5S13 3 18 2c-1.67-1.26-3.75-2-6-2zm5.5 5.5l1.09 2.41 2.41 1.09-2.41 1.09-1.09 2.41-1.09-2.41-2.41-1.09 2.41-1.09 1.09-2.41z" />
            </svg>
          </div>
          <div>
            <span class="font-bold text-lg text-slate-900 tracking-tight block leading-none">Khoirul Mustofa
              Mengaji</span>
            <span class="text-[10px] text-slate-400 font-medium">Al-Qur'an & Ibadah Digital</span>
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <NuxtLink to="/" class="text-blue-600 font-semibold">Beranda</NuxtLink>
          <NuxtLink to="/quran" class="hover:text-blue-600 transition">Baca Al-Qur'an</NuxtLink>
          <a href="#fitur" class="hover:text-blue-600 transition">Fitur</a>
          <a href="#surah-populer" class="hover:text-blue-600 transition">Surah Pilihan</a>
        </nav>

        <!-- CTA Action -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/quran"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 transition-all cursor-pointer">
            <span>Buka Al-Qur'an</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-12 pb-20 overflow-hidden">
      <!-- Decorative radial gradient aura -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent blur-3xl pointer-events-none -z-10">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <!-- Pill Badge -->
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-6 shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Platform Al-Qur'an 30 Juz & 114 Surah Lengkap</span>
          </div>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-snug">
            Membaca & Mendengarkan <br class="hidden sm:inline" />
            <span
              class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Al-Qur'an
              Al-Karim</span>
            Lebih Khusyuk
          </h1>

          <p class="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Nikmati pengalaman tilawah digital terbaik dengan kaligrafi teks Arab yang jernih, transliterasi Latin,
            terjemahan resmi bahasa Indonesia, dan lantunan merdu murottal audio per ayat.
          </p>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <NuxtLink to="/quran"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.25 5s3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Mulai Baca Al-Qur'an</span>
            </NuxtLink>

            <a href="#surah-populer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all">
              <span>Pilih Surah Populer</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        <!-- App UI Showcase Card -->
        <div class="mt-14 max-w-5xl mx-auto">
          <div
            class="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-4 sm:p-6 overflow-hidden relative">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-rose-400"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span class="ml-2 text-xs font-semibold text-slate-500">Preview Antarmuka Khoirul Mustofa Mengaji</span>
              </div>
              <NuxtLink to="/quran" class="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
                <span>Buka Versi Penuh</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </NuxtLink>
            </div>

            <!-- Mini Viewer Snapshot -->
            <div class="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div class="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800">Daftar Surah Pilihan</span>
                  <span class="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">114
                    Surah</span>
                </div>
                <div class="space-y-2">
                  <div class="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-6 h-6 rounded-full bg-white text-blue-600 font-bold text-[10px] flex items-center justify-center border border-blue-300">
                        2</div>
                      <div>
                        <div class="text-xs font-bold text-blue-700">Al-Baqarah</div>
                        <div class="text-[10px] text-blue-500">Sapi Betina • 286 Ayat</div>
                      </div>
                    </div>
                    <span class="text-xs font-serif text-blue-700">البقرة</span>
                  </div>

                  <div class="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px] flex items-center justify-center">
                        1</div>
                      <div>
                        <div class="text-xs font-semibold text-slate-700">Al-Fatihah</div>
                        <div class="text-[10px] text-slate-400">Pembukaan • 7 Ayat</div>
                      </div>
                    </div>
                    <span class="text-xs font-serif text-slate-400">الفاتحة</span>
                  </div>

                  <div class="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px] flex items-center justify-center">
                        36</div>
                      <div>
                        <div class="text-xs font-semibold text-slate-700">Yasin</div>
                        <div class="text-[10px] text-slate-400">Yasin • 83 Ayat</div>
                      </div>
                    </div>
                    <span class="text-xs font-serif text-slate-400">يس</span>
                  </div>
                </div>
              </div>

              <!-- Reader Sample Area -->
              <div class="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
                <div
                  class="rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-4 flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-bold text-slate-800">Al-Baqarah (البقرة)</h3>
                    <p class="text-[11px] text-slate-500">Sapi Betina • 286 Ayat • Madaniyah</p>
                  </div>
                  <div
                    class="w-8 h-8 rounded-xl bg-white/70 backdrop-blur-sm border border-white flex items-center justify-center font-serif text-blue-800 font-bold">
                    ٢
                  </div>
                </div>

                <div class="text-center py-1">
                  <p class="bismillah-text text-2xl text-slate-800">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                </div>

                <div class="p-3 bg-slate-50/60 rounded-xl space-y-2 border border-slate-100">
                  <div class="flex items-center justify-between">
                    <span
                      class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center">١</span>
                    <p class="quran-text text-xl font-bold text-slate-800">الۤمۤ</p>
                  </div>
                  <p class="text-xs font-semibold text-blue-600">Alif lām mīm.</p>
                  <p class="text-xs text-slate-500">Alif lām mīm.</p>
                </div>

                <div class="flex justify-end pt-2">
                  <NuxtLink to="/quran"
                    class="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                    <span>Lanjutkan Membaca di Menu Quran</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Surah Populer Grid Section -->
    <section id="surah-populer" class="py-16 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Surah Pilihan yang Sering Dibaca
          </h2>
          <p class="mt-2 text-sm text-slate-500">
            Akses cepat ke surah-surah yang memiliki banyak keutamaan dalam keseharian seorang muslim.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="s in popularSurahs" :key="s.nomor" @click="navigateToSurah(s.nomor)"
            class="group p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between">
            <div class="flex items-start justify-between">
              <div
                class="w-9 h-9 rounded-xl bg-blue-100/70 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {{ s.nomor }}
              </div>
              <span class="font-serif text-xl text-slate-400 group-hover:text-blue-600 transition-colors">
                {{ s.namaArab }}
              </span>
            </div>

            <div class="mt-4">
              <h3 class="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {{ s.namaLatin }}
              </h3>
              <p class="text-xs text-slate-400 mt-0.5 truncate">
                {{ s.arti }} • {{ s.jumlahAyat }} Ayat
              </p>
            </div>

            <div
              class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Baca Surah</span>
              <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        <div class="mt-10 text-center">
          <NuxtLink to="/quran"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-semibold bg-white transition shadow-2xs">
            <span>Lihat Semua 114 Surah</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Fitur Unggulan Section -->
    <section id="fitur" class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Keunggulan</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Fitur Lengkap untuk Kenyamanan Ibadah
          </h2>
          <p class="mt-2 text-sm text-slate-500">
            Didesain khusus dengan mengutamakan keterbacaan, estetika islami, dan performa yang sangat ringan.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Fitur 1 -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.25 5s3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-800">Tipografi Arab Amiri Otentik</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              Font kaligrafi Arab Amiri dengan syakal lengkap dan harakat yang proporsional sehingga nyaman dibaca
              berlama-lama tanpa membuat mata lelah.
            </p>
          </div>

          <!-- Fitur 2 -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-800">Audio Murottal Jernih</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              Putar lantunan ayat per ayat langsung saat membaca untuk menyelaraskan bacaan tajwid Anda dengan qari
              terpercaya.
            </p>
          </div>

          <!-- Fitur 3 -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-slate-800">Pencarian Cepat & Bookmark</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              Cari surah berdasarkan nomor, nama Latin, terjemahan, atau nama Arab dalam hitungan milidetik dan simpan
              penanda ayat favorit Anda.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-auto bg-slate-900 text-white py-10 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.25 0 4.33-.74 6-2-5-1-8.5-4.5-8.5-9.5S13 3 18 2c-1.67-1.26-3.75-2-6-2zm5.5 5.5l1.09 2.41 2.41 1.09-2.41 1.09-1.09 2.41-1.09-2.41-2.41-1.09 2.41-1.09 1.09-2.41z" />
            </svg>
          </div>
          <span class="font-bold text-base tracking-tight">Khoirul Mustofa Mengaji</span>
        </div>

        <p class="text-xs text-slate-400 text-center md:text-left">
          Platform Al-Qur'an Digital untuk kemudahan dan kenyamanan ibadah umat muslim di seluruh dunia.
        </p>

        <p class="text-xs text-slate-500">
          © 2026 Khoirul Mustofa Mengaji. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SURAH_LIST } from '~/data/surahData'

const router = useRouter()

const popularSurahs = [
  SURAH_LIST.find(s => s.nomor === 1)!, // Al-Fatihah
  SURAH_LIST.find(s => s.nomor === 2)!, // Al-Baqarah
  SURAH_LIST.find(s => s.nomor === 18)!, // Al-Kahf
  SURAH_LIST.find(s => s.nomor === 36)!, // Yasin
  SURAH_LIST.find(s => s.nomor === 55)!, // Ar-Rahman
  SURAH_LIST.find(s => s.nomor === 56)!, // Al-Waqi'ah
  SURAH_LIST.find(s => s.nomor === 67)!, // Al-Mulk
  SURAH_LIST.find(s => s.nomor === 112)! // Al-Ikhlas
]

function navigateToSurah(nomor: number) {
  router.push(`/quran?surah=${nomor}`)
}
</script>
