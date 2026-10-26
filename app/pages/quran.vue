<template>
  <div class="bg-[#d5dbe3] min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans antialiased text-slate-700">
    <!-- Outer window shell representing the modern desktop app in the reference design -->
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

      <!-- MainContentShell -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#fbfcfd]">
        <!-- TopBar Header -->
        <AppTopBar
          :title="quranStore.viewMode === 'surah' ? 'Surah' : 'Mushaf Per Halaman'"
          :subtitle="quranStore.viewMode === 'surah' ? 'Select and read here the surah you want to find!' : `Membaca Halaman ${quranStore.currentPage} dari 604 Halaman Mushaf Standar Madinah`"
          :show-mobile-toggle="true"
          @toggle-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
        />

        <!-- MiddleAndReaderSplit -->
        <div class="flex-1 flex overflow-hidden relative">
          
          <!-- Surah / Page List Column (Sub-Sidebar) -->
          <section
            :class="[
              'w-72 shrink-0 border-r border-slate-100 flex flex-col bg-white transition-all duration-200 z-20',
              isMobileSelectorOpen ? 'absolute inset-0 w-full sm:w-80 shadow-lg md:relative md:w-72' : 'hidden md:flex'
            ]"
            data-purpose="surah-list"
          >
            <!-- Mode Switcher Tabs (Per Surah vs Per Halaman) -->
            <div class="p-3 border-b border-slate-100 bg-slate-50/50">
              <div class="flex rounded-xl bg-slate-200/70 p-1 text-xs font-semibold">
                <button
                  @click="quranStore.setViewMode('surah')"
                  :class="[
                    'flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer',
                    quranStore.viewMode === 'surah'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  ]"
                >
                  Per Surah
                </button>
                <button
                  @click="quranStore.setViewMode('page')"
                  :class="[
                    'flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer',
                    quranStore.viewMode === 'page'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  ]"
                >
                  Per Halaman
                </button>
              </div>
            </div>

            <!-- MODE 1: SEARCH & LIST PER SURAH -->
            <template v-if="quranStore.viewMode === 'surah'">
              <!-- Search Box -->
              <div class="p-3 border-b border-slate-100 flex items-center gap-2">
                <div class="relative flex-1">
                  <input
                    v-model="quranStore.searchQuery"
                    class="w-full bg-[#f8fafc] text-xs text-slate-700 pl-8 pr-7 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 transition"
                    placeholder="Search surah..."
                    type="text"
                  />
                  <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <button
                    v-if="quranStore.searchQuery"
                    @click="quranStore.searchQuery = ''"
                    class="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <!-- Close mobile drawer button -->
                <button
                  v-if="isMobileSelectorOpen"
                  @click="isMobileSelectorOpen = false"
                  class="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Surah Cards List (Scrollable) -->
              <div class="flex-1 overflow-y-auto p-2.5 space-y-1">
                <button
                  v-for="surah in quranStore.filteredSurahList"
                  :key="surah.nomor"
                  @click="handleSelectSurah(surah.nomor)"
                  :class="[
                    'w-full text-left p-2.5 rounded-2xl flex items-center gap-3 transition group cursor-pointer',
                    quranStore.selectedSurah?.nomor === surah.nomor
                      ? 'bg-blue-50/70 border border-blue-200/60 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  ]"
                >
                  <!-- Islamic Star Badge -->
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition',
                      quranStore.selectedSurah?.nomor === surah.nomor
                        ? 'border border-blue-400 text-blue-600 bg-white shadow-xs font-bold'
                        : 'border border-blue-200/80 text-blue-500 bg-blue-50/30'
                    ]"
                  >
                    {{ surah.nomor }}
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between">
                      <h4
                        :class="[
                          'text-xs truncate',
                          quranStore.selectedSurah?.nomor === surah.nomor
                            ? 'font-bold text-blue-600'
                            : 'font-semibold text-slate-800'
                        ]"
                      >
                        {{ surah.namaLatin }}
                      </h4>
                      <span class="font-serif text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
                        {{ surah.namaArab }}
                      </span>
                    </div>
                    <p
                      :class="[
                        'text-[11px] truncate mt-0.5',
                        quranStore.selectedSurah?.nomor === surah.nomor
                          ? 'text-blue-500'
                          : 'text-slate-400'
                      ]"
                    >
                      {{ surah.arti }} - {{ surah.jumlahAyat }} Ayat
                    </p>
                  </div>
                </button>

                <!-- Empty state -->
                <div v-if="quranStore.filteredSurahList.length === 0" class="p-6 text-center text-xs text-slate-400">
                  Surah tidak ditemukan untuk "{{ quranStore.searchQuery }}"
                </div>
              </div>
            </template>

            <!-- MODE 2: JUMP & LIST PER HALAMAN (1 - 604) -->
            <template v-else>
              <!-- Jump to Page Input -->
              <div class="p-3 border-b border-slate-100">
                <div class="flex items-center gap-1.5">
                  <input
                    v-model.number="jumpPageInput"
                    @keyup.enter="handleJumpPage"
                    type="number"
                    min="1"
                    max="604"
                    placeholder="Lompat ke hal (1-604)..."
                    class="w-full bg-[#f8fafc] text-xs text-slate-700 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <button
                    @click="handleJumpPage"
                    class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-2xs"
                  >
                    Go
                  </button>
                </div>
              </div>

              <!-- Page List (Scrollable) -->
              <div class="flex-1 overflow-y-auto p-2.5 space-y-1">
                <button
                  v-for="p in 604"
                  :key="p"
                  @click="handleSelectPage(p)"
                  :class="[
                    'w-full text-left p-2.5 rounded-2xl flex items-center justify-between transition cursor-pointer',
                    quranStore.currentPage === p
                      ? 'bg-blue-50/70 border border-blue-200/60 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  ]"
                >
                  <div class="flex items-center gap-2.5">
                    <div
                      :class="[
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition',
                        quranStore.currentPage === p
                          ? 'border border-blue-400 text-blue-600 bg-white shadow-xs font-bold'
                          : 'border border-slate-200 text-slate-500 bg-slate-50'
                      ]"
                    >
                      {{ p }}
                    </div>
                    <div>
                      <h4
                        :class="[
                          'text-xs',
                          quranStore.currentPage === p ? 'font-bold text-blue-600' : 'font-semibold text-slate-800'
                        ]"
                      >
                        Halaman {{ p }}
                      </h4>
                      <p class="text-[10px] text-slate-400">
                        Juz {{ getEstimatedJuz(p) }}
                      </p>
                    </div>
                  </div>

                  <span class="text-xs font-mono text-slate-400">
                    {{ toArabicNumber(p) }}
                  </span>
                </button>
              </div>
            </template>
          </section>

          <!-- Main Reading Viewer Area -->
          <main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-7 relative select-text" data-purpose="surah-reader">
            
            <!-- Mobile Selector Trigger -->
            <div class="flex md:hidden items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span class="text-xs font-semibold text-blue-900">
                <template v-if="quranStore.viewMode === 'surah'">
                  Surah: {{ quranStore.selectedSurah?.namaLatin }}
                </template>
                <template v-else>
                  Halaman {{ quranStore.currentPage }} (Juz {{ quranStore.currentPageInfo.juz }})
                </template>
              </span>
              <button
                @click="isMobileSelectorOpen = true"
                class="px-2.5 py-1 bg-white text-blue-600 font-semibold text-xs rounded-lg shadow-2xs border border-blue-200 cursor-pointer"
              >
                Ganti {{ quranStore.viewMode === 'surah' ? 'Surah' : 'Halaman' }}
              </button>
            </div>

            <!-- VIEW 1: BACA PER SURAH -->
            <template v-if="quranStore.viewMode === 'surah'">
              <!-- Top Surah Banner Card -->
              <section class="w-full rounded-2xl bg-gradient-to-r from-[#eef2ff] via-[#e0e7ff] to-[#93c5fd] p-5 flex items-center justify-between shadow-xs relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-400/20 to-transparent pointer-events-none"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-2">
                    <h2 class="text-base md:text-lg font-bold text-slate-800">
                      {{ quranStore.selectedSurah?.namaLatin || 'Al-Baqarah' }}
                    </h2>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-white/70 text-blue-700 font-medium">
                      {{ quranStore.selectedSurah?.tempatTurun }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-600 mt-1 font-medium">
                    {{ quranStore.selectedSurah?.arti }} - {{ quranStore.selectedSurah?.jumlahAyat }} Ayat
                  </p>
                </div>

                <div class="relative z-10 flex items-center gap-3">
                  <!-- Surah Calligraphic Badge / Ornate Emblem -->
                  <div class="w-10 h-10 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/70 flex items-center justify-center shadow-2xs">
                    <span class="font-serif text-blue-800 text-lg font-bold">
                      {{ quranStore.selectedSurah?.nomorArab || toArabicNumber(quranStore.selectedSurah?.nomor || 2) }}
                    </span>
                  </div>
                </div>
              </section>

              <!-- Bismillah Calligraphy Heading (Exclude Surah 9 At-Taubah) -->
              <div
                v-if="quranStore.selectedSurah?.nomor !== 9"
                class="py-2 text-center"
                data-purpose="bismillah-calligraphy"
              >
                <h3 class="bismillah-text text-3xl md:text-4xl text-slate-800 font-normal tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h3>
              </div>

              <!-- Loading Spinner -->
              <div v-if="quranStore.isLoading" class="py-12 flex flex-col items-center justify-center gap-3">
                <div class="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
                <span class="text-xs text-slate-500 font-medium">Memuat ayat Al-Qur'an...</span>
              </div>

              <!-- Ayat Section -->
              <div v-else class="space-y-8 divide-y divide-slate-100">
                <article
                  v-for="verse in quranStore.selectedSurah?.ayat"
                  :key="verse.nomorAyat"
                  class="pt-6 first:pt-0 group/verse"
                  data-purpose="verse-item"
                >
                  <!-- Arabic Text & Ayat Number -->
                  <div class="flex items-start justify-end gap-3 mb-4">
                    <div class="w-6 h-6 rounded-full border border-blue-300 text-blue-500 text-[10px] flex items-center justify-center font-medium bg-blue-50/30 shrink-0 mt-2">
                      {{ toArabicNumber(verse.nomorAyat) }}
                    </div>
                    <p class="quran-text text-2xl md:text-3xl text-slate-800 font-semibold leading-relaxed text-right">
                      {{ verse.teksArab }}
                    </p>
                  </div>

                  <!-- Transliteration & Translation -->
                  <div class="space-y-1.5 text-left pr-2">
                    <p class="text-xs font-semibold text-blue-600 tracking-wide">
                      {{ verse.teksLatin }}
                    </p>
                    <p class="text-xs text-slate-600 leading-relaxed font-normal">
                      {{ verse.teksIndonesia }}
                    </p>
                  </div>

                  <!-- Verse Interactive Actions -->
                  <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-50 text-slate-400 text-xs">
                    <div class="flex items-center gap-3">
                      <!-- Play Audio Ayat -->
                      <button
                        v-if="verse.audio"
                        @click="quranStore.playAyatAudio(verse.audio, verse.nomorAyat)"
                        :class="[
                          'flex items-center gap-1.5 px-2 py-1 rounded-lg transition cursor-pointer',
                          quranStore.currentPlayingAyat === verse.nomorAyat && quranStore.isPlaying
                            ? 'text-blue-600 bg-blue-50 font-semibold'
                            : 'hover:text-blue-600 hover:bg-slate-100'
                        ]"
                        title="Dengarkan Audio Ayat"
                      >
                        <svg v-if="quranStore.currentPlayingAyat === verse.nomorAyat && quranStore.isPlaying" class="w-3.5 h-3.5 fill-current animate-pulse" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                        <svg v-else class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span class="text-[11px]">{{ quranStore.currentPlayingAyat === verse.nomorAyat && quranStore.isPlaying ? 'Jeda' : 'Audio' }}</span>
                      </button>

                      <!-- Bookmark Ayat -->
                      <button
                        @click="handleBookmark(verse)"
                        :class="[
                          'flex items-center gap-1 px-2 py-1 rounded-lg transition cursor-pointer',
                          quranStore.isBookmarked(quranStore.selectedSurah?.nomor || 0, verse.nomorAyat)
                            ? 'text-amber-500 bg-amber-50 font-semibold'
                            : 'hover:text-amber-500 hover:bg-slate-100'
                        ]"
                        title="Tandai Ayat"
                      >
                        <svg class="w-3.5 h-3.5" :fill="quranStore.isBookmarked(quranStore.selectedSurah?.nomor || 0, verse.nomorAyat) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                        <span class="text-[11px]">Tandai</span>
                      </button>

                      <!-- Copy Ayat -->
                      <button
                        @click="copyVerse(verse)"
                        class="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                        title="Salin Teks Ayat"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-[11px]">{{ copiedVerseNumber === verse.nomorAyat ? 'Tersalin!' : 'Salin' }}</span>
                      </button>
                    </div>

                    <span class="text-[10px] text-slate-400 font-mono">
                      {{ quranStore.selectedSurah?.nomor }}:{{ verse.nomorAyat }}
                    </span>
                  </div>
                </article>
              </div>
            </template>

            <!-- VIEW 2: BACA PER HALAMAN (MUSHAF 1 - 604) -->
            <template v-else>
              <!-- Top Page Banner Card -->
              <section class="w-full rounded-2xl bg-gradient-to-r from-[#eef2ff] via-[#e0e7ff] to-[#93c5fd] p-5 flex items-center justify-between shadow-xs relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-400/20 to-transparent pointer-events-none"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-2">
                    <h2 class="text-base md:text-lg font-bold text-slate-800">
                      Halaman {{ quranStore.currentPage }}
                    </h2>
                    <span class="text-xs px-2.5 py-0.5 rounded-full bg-white/70 text-blue-700 font-semibold">
                      Juz {{ quranStore.currentPageInfo.juz }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-600 mt-1 font-medium">
                    Surah: {{ quranStore.currentPageInfo.surahNames.join(', ') || 'Al-Qur\'an' }}
                  </p>
                </div>

                <div class="relative z-10 flex items-center gap-3">
                  <!-- Page Emblem -->
                  <div class="w-10 h-10 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/70 flex items-center justify-center shadow-2xs">
                    <span class="font-serif text-blue-800 text-lg font-bold">
                      {{ toArabicNumber(quranStore.currentPage) }}
                    </span>
                  </div>
                </div>
              </section>

              <!-- Loading Spinner -->
              <div v-if="quranStore.isLoading" class="py-12 flex flex-col items-center justify-center gap-3">
                <div class="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
                <span class="text-xs text-slate-500 font-medium">Memuat ayat halaman {{ quranStore.currentPage }}...</span>
              </div>

              <!-- Page Verses Section -->
              <div v-else class="space-y-8 divide-y divide-slate-100">
                <div v-if="quranStore.pageVerses.length === 0" class="py-12 text-center text-xs text-slate-400">
                  Data halaman ini belum dimuat. Silakan periksa koneksi atau jalankan sinkronisasi.
                </div>

                <article
                  v-for="verse in quranStore.pageVerses"
                  :key="verse.verseKey"
                  class="pt-6 first:pt-0 group/verse"
                  data-purpose="verse-item"
                >
                  <!-- Arabic Text & Ayat Number -->
                  <div class="flex items-start justify-end gap-3 mb-4">
                    <div class="w-6 h-6 rounded-full border border-blue-300 text-blue-500 text-[10px] flex items-center justify-center font-medium bg-blue-50/30 shrink-0 mt-2">
                      {{ toArabicNumber(verse.nomorAyat) }}
                    </div>
                    <p class="quran-text text-2xl md:text-3xl text-slate-800 font-semibold leading-relaxed text-right">
                      {{ verse.teksArab }}
                    </p>
                  </div>

                  <!-- Transliteration & Translation -->
                  <div class="space-y-1.5 text-left pr-2">
                    <p v-if="verse.teksLatin" class="text-xs font-semibold text-blue-600 tracking-wide">
                      {{ verse.teksLatin }}
                    </p>
                    <p class="text-xs text-slate-600 leading-relaxed font-normal">
                      {{ verse.teksIndonesia }}
                    </p>
                  </div>

                  <!-- Actions -->
                  <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-50 text-slate-400 text-xs">
                    <div class="flex items-center gap-3">
                      <button
                        @click="handleBookmark({ nomorAyat: verse.nomorAyat, teksArab: verse.teksArab, chapterId: verse.chapterId })"
                        :class="[
                          'flex items-center gap-1 px-2 py-1 rounded-lg transition cursor-pointer',
                          quranStore.isBookmarked(verse.chapterId, verse.nomorAyat)
                            ? 'text-amber-500 bg-amber-50 font-semibold'
                            : 'hover:text-amber-500 hover:bg-slate-100'
                        ]"
                      >
                        <svg class="w-3.5 h-3.5" :fill="quranStore.isBookmarked(verse.chapterId, verse.nomorAyat) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                        <span class="text-[11px]">Tandai</span>
                      </button>

                      <button
                        @click="copyVerse({ nomorAyat: verse.nomorAyat, teksArab: verse.teksArab, teksLatin: verse.teksLatin || '', teksIndonesia: verse.teksIndonesia })"
                        class="flex items-center gap-1 px-2 py-1 rounded-lg hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-[11px]">{{ copiedVerseNumber === verse.nomorAyat ? 'Tersalin!' : 'Salin' }}</span>
                      </button>
                    </div>

                    <span class="text-[10px] text-slate-400 font-mono">
                      QS. {{ verse.verseKey }}
                    </span>
                  </div>
                </article>
              </div>

              <!-- Pagination Footer for Page Mode -->
              <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  @click="quranStore.prevPage"
                  :disabled="quranStore.currentPage <= 1"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                  <span>Halaman Sebelumnya</span>
                </button>

                <span class="text-xs text-slate-500 font-medium">
                  Halaman {{ quranStore.currentPage }} dari 604
                </span>

                <button
                  @click="quranStore.nextPage"
                  :disabled="quranStore.currentPage >= 604"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <span>Halaman Berikutnya</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </template>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuranStore } from '~/stores/quran'
import { toArabicNumber, type AyatItem } from '~/data/surahData'

const route = useRoute()
const quranStore = useQuranStore()

const isMobileSidebarOpen = ref(false)
const isMobileSelectorOpen = ref(false)
const copiedVerseNumber = ref<number | null>(null)
const jumpPageInput = ref<number | null>(null)

function handleSelectSurah(nomor: number) {
  quranStore.selectSurah(nomor)
  isMobileSelectorOpen.value = false
}

function handleSelectPage(page: number) {
  quranStore.selectPage(page)
  isMobileSelectorOpen.value = false
}

function handleJumpPage() {
  if (jumpPageInput.value && jumpPageInput.value >= 1 && jumpPageInput.value <= 604) {
    quranStore.selectPage(jumpPageInput.value)
    jumpPageInput.value = null
    isMobileSelectorOpen.value = false
  }
}

function handleBookmark(verse: { nomorAyat: number, teksArab: string, chapterId?: number }) {
  quranStore.toggleBookmark(verse)
}

function copyVerse(verse: { nomorAyat: number, teksArab: string, teksLatin?: string, teksIndonesia: string }) {
  const content = `${verse.teksArab}\n\n${verse.teksLatin ? verse.teksLatin + '\n\n' : ''}Artinya: "${verse.teksIndonesia}"`
  navigator.clipboard.writeText(content).then(() => {
    copiedVerseNumber.value = verse.nomorAyat
    setTimeout(() => {
      copiedVerseNumber.value = null
    }, 2000)
  })
}

// Perhitungan perkiraan juz berdasarkan nomor halaman mushaf standar Madinah
function getEstimatedJuz(page: number): number {
  if (page <= 21) return 1
  return Math.min(30, Math.floor((page - 2) / 20) + 1)
}

onMounted(() => {
  quranStore.initBookmarks()
  quranStore.initChapters()

  // Check URL query params for initial route
  const modeParam = route.query.mode as string
  if (modeParam === 'page') {
    quranStore.setViewMode('page')
    const pageNum = Number(route.query.page)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 604) {
      quranStore.selectPage(pageNum)
      return
    }
    quranStore.selectPage(1)
    return
  }

  const surahParam = route.query.surah
  if (surahParam) {
    const num = Number(surahParam)
    if (!isNaN(num) && num >= 1 && num <= 114) {
      quranStore.selectSurah(num)
      return
    }
  }

  // Default initial load: Al-Baqarah
  if (!quranStore.selectedSurah || quranStore.selectedSurah.nomor !== 2) {
    quranStore.selectSurah(2)
  }
})
</script>
