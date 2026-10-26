<template>
  <aside
    class="w-56 shrink-0 bg-white border-r border-slate-100 flex flex-col justify-between py-6 px-4 select-none h-full">
    <!-- Top Section: Brand & Nav Links -->
    <div class="space-y-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 px-3 group">
        <div class="w-7 h-7 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <!-- Crescent and Star Icon -->
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.25 0 4.33-.74 6-2-5-1-8.5-4.5-8.5-9.5S13 3 18 2c-1.67-1.26-3.75-2-6-2zm5.5 5.5l1.09 2.41 2.41 1.09-2.41 1.09-1.09 2.41-1.09-2.41-2.41-1.09 2.41-1.09 1.09-2.41z" />
          </svg>
        </div>
        <span class="font-bold text-base text-slate-800 tracking-tight">Khoirul Mustofa Mengaji</span>
      </NuxtLink>

      <!-- Group: MAIN -->
      <div>
        <span class="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-3">MAIN</span>
        <nav class="mt-2 space-y-1">
          <!-- Dashboard -->
          <NuxtLink to="/" :class="[
            'flex items-center gap-3 px-3 py-2 text-xs rounded-xl transition',
            route.path === '/'
              ? 'font-semibold text-blue-600 bg-blue-50/70 shadow-xs'
              : 'font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          ]">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </NuxtLink>



          <!-- Surah (Active) -->
          <NuxtLink to="/quran" :class="[
            'flex items-center gap-3 px-3 py-2 text-xs rounded-xl transition',
            route.path === '/quran'
              ? 'font-semibold text-blue-600 bg-blue-50/70 shadow-xs'
              : 'font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          ]">
            <svg class="w-4 h-4" :class="route.path === '/quran' ? 'text-blue-600' : 'text-slate-400'" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.25 5s3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Surah</span>
          </NuxtLink>

          <!-- API & Docs -->
          <NuxtLink to="/api-docs" :class="[
            'flex items-center gap-3 px-3 py-2 text-xs rounded-xl transition',
            route.path.startsWith('/api-docs')
              ? 'font-semibold text-blue-600 bg-blue-50/70 shadow-xs'
              : 'font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          ]">
            <svg class="w-4 h-4" :class="route.path.startsWith('/api-docs') ? 'text-blue-600' : 'text-slate-400'" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <div class="flex items-center justify-between flex-1">
              <span>API & Docs</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">REST</span>
            </div>
          </NuxtLink>

          <!-- Doa -->
          <NuxtLink to="/#doa"
            class="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Doa</span>
          </NuxtLink>

          <!-- Streaming -->
          <a href="#"
            class="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span>Streaming</span>
          </a>

          <!-- My Schedule -->
          <a href="#"
            class="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>My Schedule</span>
          </a>
        </nav>
      </div>


      <!-- Group: OTHERS -->
      <div>
        <span class="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-3">OTHERS</span>
        <nav class="mt-2 space-y-1">
          <a href="#"
            class="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </a>
          <a href="#"
            class="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Setting</span>
          </a>
        </nav>
      </div>
    </div>

    <!-- Bottom Sidebar Area: Logout & Copyright -->
    <div class="px-3 pt-4 border-t border-slate-100">
      <button class="flex items-center gap-2.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Log Out</span>
      </button>
      <p class="mt-4 text-[10px] text-slate-400">@2026 Khoirul Mustofa Mengaji</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
