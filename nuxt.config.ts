import tailwindcss from '@tailwindcss/vite'
import Aura from '@primevue/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || (process.env.GITHUB_PAGES === 'true' ? '/alquran/' : '/'),
    head: {
      title: 'Khoirul Mustofa Mengaji - Al-Qur\'an Digital & Ibadah',
      meta: [
        { name: 'description', content: 'Baca Al-Qur\'an digital interaktif dengan teks Arab, transliterasi, terjemahan Indonesia, dan audio murottal.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  }
})
