<template>
  <header class="h-16 shrink-0 px-6 md:px-8 flex items-center justify-between border-b border-slate-100 bg-white">
    <!-- Title & Subtitle + Mobile Toggle -->
    <div class="flex items-center gap-3">
      <button
        v-if="showMobileToggle"
        @click="$emit('toggle-sidebar')"
        class="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
        aria-label="Toggle Menu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <div>
        <h1 class="text-base md:text-lg font-bold text-slate-800 leading-tight">
          {{ title }}
        </h1>
        <p class="text-[11px] md:text-xs text-slate-400">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Notification & Profile -->
    <div class="flex items-center gap-3">
      <!-- Notification Bell -->
      <button
        aria-label="Notifications"
        class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 relative transition cursor-pointer"
        title="Pemberitahuan Waktu Sholat & Kajian"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
        <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
      </button>

      <!-- User Avatar -->
      <div class="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shadow-2xs cursor-pointer select-none">
        <span class="text-xs font-semibold text-slate-600">AH</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    showMobileToggle?: boolean
  }>(),
  {
    title: 'Surah',
    subtitle: 'Select and read here the surah you want to find!',
    showMobileToggle: false
  }
)

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()
</script>
