# 📖 Khoirul Mustofa Mengaji — Al-Qur'an Digital & Ibadah

Aplikasi web Al-Qur'an digital modern berkinerja tinggi dengan antarmuka yang bersih, tenang, dan elegan. Dibangun menggunakan teknologi modern **Nuxt 4**, **Vue 3**, **PrimeVue 4.5**, **Pinia**, dan **Tailwind CSS 4**, serta terintegrasi langsung dengan **Quran Foundation Content API (v4)** dan sistem *offline-ready file caching*.

---

## ✨ Fitur Unggulan

- 📖 **Mode Pembacaan Ganda**:
  - **Mode Per Surah**: Akses 114 surah lengkap dengan fitur pencarian real-time (nomor, nama Latin, nama Arab, atau arti).
  - **Mode Per Halaman**: Menampilkan 604 halaman mushaf standar Madinah lengkap dengan indikator Juz, nama surah, dan navigasi pagination cepat (*Halaman Sebelumnya / Berikutnya*).
- 💾 **100% Offline-Ready & Instant Local JSON Caching**:
  - Seluruh dataset 114 Surah dan 604 Halaman telah disinkronkan dan tersimpan secara fisik di `public/data/quran/`.
  - Akses data instan (**0ms**) tanpa membebani kuota API token dan tetap dapat diakses saat offline.
- 🎨 **Tipografi Arab Otentik & Estetika Visual Modern**:
  - Font Arab *Amiri* dengan syakal lengkap, harakat proporsional, nomor ayat berornamen islami, transliterasi Latin, dan terjemahan resmi Kementerian Agama RI.
  - Mengadopsi desain antarmuka modern dengan tata letak desktop app multi-kolom yang responsif di berbagai perangkat.
- 🎧 **Audio Murottal Interaktif**:
  - Dengarkan lantunan tilawah merdu per ayat langsung di halaman baca untuk memperdalam kefasihan tajwid.
- 🔖 **Penanda Ayat & Salin Teks**:
  - Simpan ayat favorit Anda ke daftar bookmark lokal (tersimpan di browser).
  - Fitur salin teks ayat lengkap (Arab, Latin, dan arti) dengan satu kali klik.

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API)
- **UI Component Suite**: [PrimeVue 4.5](https://primevue.org/) dengan *Aura Theme Preset*
- **State Management**: [Pinia](https://pinia.vuejs.org/) (`@pinia/nuxt`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Data Provider**: [Quran Foundation API v4](https://api-docs.quran.foundation/) & Quran.com Content API
- **Icons & Fonts**: PrimeIcons, Google Fonts (*Amiri* & *Inter*)

---

## 📁 Struktur Direktori

```text
alquran/
├── app/
│   ├── assets/css/main.css         # Konfigurasi Tailwind 4 & font Amiri Al-Qur'an
│   ├── components/
│   │   ├── AppSidebar.vue          # Sidebar navigasi aplikasi
│   │   └── AppTopBar.vue           # Header navigasi & profil
│   ├── data/
│   │   └── surahData.ts            # Direktori metadata 114 surah & fallback
│   ├── pages/
│   │   ├── index.vue               # Landing page modern & showcase surah populer
│   │   └── quran.vue               # Tampilan dalam pembaca surah & halaman mushaf
│   ├── stores/
│   │   └── quran.ts                # Pinia store (audio, bookmark, state surah/halaman)
│   └── types/
│       └── quran.ts                # TypeScript interfaces resmi Quran Foundation v4
├── public/
│   └── data/quran/                 # Database lokal file JSON (offline-ready)
│       ├── chapters.json           # Metadata 114 surah
│       ├── surah/                  # 114 file JSON ayat per surah (1.json .. 114.json)
│       └── page/                   # 604 file JSON halaman mushaf (1.json .. 604.json)
├── server/
│   ├── api/quran/                  # Nitro server routes (chapters, surah, page)
│   └── utils/quranFoundation.ts    # OAuth2 token manager & file-caching logic
├── scripts/
│   └── sync-quran.mjs              # Script otomatisasi download dataset ke file JSON
└── nuxt.config.ts                  # Konfigurasi Nuxt 4, PrimeVue, & Tailwind CSS 4
```

---

## 🚀 Memulai (Quick Start)

### 1. Prasyarat
- Node.js versi 18.x atau lebih baru
- npm, pnpm, atau yarn

### 2. Instalasi Dependensi
```bash
# Clone repositori
git clone https://github.com/khoirulmustofa/alquran.git
cd alquran

# Install dependensi
npm install
```

### 3. Konfigurasi Lingkungan (Opsional)
Salin file `.env.example` menjadi `.env` jika Anda ingin menggunakan kredensial pengembang Quran Foundation Anda sendiri:
```bash
cp .env.example .env
```
Isi konfigurasi di `.env`:
```env
QF_CLIENT_ID=your_client_id
QF_CLIENT_SECRET=your_client_secret
QF_ENV=prelive # atau 'production'
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000) untuk mengakses Landing Page, atau [http://localhost:3000/quran](http://localhost:3000/quran) untuk langsung ke Menu Al-Qur'an.

### 5. Membangun untuk Produksi
```bash
npm run build
node .output/server/index.mjs
```

---

## 🔄 Sinkronisasi Dataset ke File JSON

Aplikasi ini sudah menyertakan seluruh 114 file surah dan 604 file halaman mushaf. Jika Anda ingin memperbarui atau mengunduh ulang seluruh dataset ke file JSON secara mandiri, jalankan:
```bash
node scripts/sync-quran.mjs
```

---

## 📄 Lisensi & Hak Cipta

Dilisensikan di bawah [MIT License](LICENSE).  
Hak Cipta © 2026 **Khoirul Mustofa Mengaji**. Dibuat dengan dedikasi untuk kemudahan ibadah dan tilawah umat muslim di seluruh dunia.
