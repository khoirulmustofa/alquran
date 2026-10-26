export interface SurahMeta {
  nomor: number
  namaLatin: string
  namaArab: string
  arti: string
  jumlahAyat: number
  tempatTurun: 'Mekah' | 'Madinah'
  deskripsi?: string
  nomorArab?: string
}

export interface AyatItem {
  nomorAyat: number
  teksArab: string
  teksLatin: string
  teksIndonesia: string
  audio?: string
}

export interface SurahDetail extends SurahMeta {
  ayat: AyatItem[]
  audioFull?: string
}

export const ARABIC_NUMERALS: Record<number, string> = {
  0: '٠', 1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩'
}

export function toArabicNumber(n: number): string {
  return String(n)
    .split('')
    .map(ch => ARABIC_NUMERALS[Number(ch)] ?? ch)
    .join('')
}

export const SURAH_LIST: SurahMeta[] = [
  { nomor: 1, namaLatin: 'Al-Fatihah', namaArab: 'الفاتحة', arti: 'Pembukaan', jumlahAyat: 7, tempatTurun: 'Mekah' },
  { nomor: 2, namaLatin: 'Al-Baqarah', namaArab: 'البقرة', arti: 'Sapi Betina', jumlahAyat: 286, tempatTurun: 'Madinah' },
  { nomor: 3, namaLatin: "Ali 'Imran", namaArab: 'آل عمران', arti: 'Keluarga Imran', jumlahAyat: 200, tempatTurun: 'Madinah' },
  { nomor: 4, namaLatin: "An-Nisa'", namaArab: 'النساء', arti: 'Wanita', jumlahAyat: 176, tempatTurun: 'Madinah' },
  { nomor: 5, namaLatin: "Al-Ma'idah", namaArab: 'المائدة', arti: 'Hidangan', jumlahAyat: 120, tempatTurun: 'Madinah' },
  { nomor: 6, namaLatin: "Al-An'am", namaArab: 'الأنعام', arti: 'Binatang Ternak', jumlahAyat: 165, tempatTurun: 'Mekah' },
  { nomor: 7, namaLatin: "Al-A'raf", namaArab: 'الأعراف', arti: 'Tempat Tertinggi', jumlahAyat: 206, tempatTurun: 'Mekah' },
  { nomor: 8, namaLatin: 'Al-Anfal', namaArab: 'الأنفال', arti: 'Harta Rampasan Perang', jumlahAyat: 75, tempatTurun: 'Madinah' },
  { nomor: 9, namaLatin: 'At-Taubah', namaArab: 'التوبة', arti: 'Pengampunan', jumlahAyat: 129, tempatTurun: 'Madinah' },
  { nomor: 10, namaLatin: 'Yunus', namaArab: 'يونس', arti: 'Yunus', jumlahAyat: 109, tempatTurun: 'Mekah' },
  { nomor: 11, namaLatin: 'Hud', namaArab: 'هود', arti: 'Hud', jumlahAyat: 123, tempatTurun: 'Mekah' },
  { nomor: 12, namaLatin: 'Yusuf', namaArab: 'يوسف', arti: 'Yusuf', jumlahAyat: 111, tempatTurun: 'Mekah' },
  { nomor: 13, namaLatin: "Ar-Ra'd", namaArab: 'الرعد', arti: 'Guruh', jumlahAyat: 43, tempatTurun: 'Madinah' },
  { nomor: 14, namaLatin: 'Ibrahim', namaArab: 'إبراهيم', arti: 'Ibrahim', jumlahAyat: 52, tempatTurun: 'Mekah' },
  { nomor: 15, namaLatin: 'Al-Hijr', namaArab: 'الحجر', arti: 'Bukit Pasir Hijr', jumlahAyat: 99, tempatTurun: 'Mekah' },
  { nomor: 16, namaLatin: 'An-Nahl', namaArab: 'النحل', arti: 'Lebah', jumlahAyat: 128, tempatTurun: 'Mekah' },
  { nomor: 17, namaLatin: 'Al-Isra', namaArab: 'الإسراء', arti: 'Perjalanan Malam', jumlahAyat: 111, tempatTurun: 'Mekah' },
  { nomor: 18, namaLatin: 'Al-Kahf', namaArab: 'الكهف', arti: 'Gua', jumlahAyat: 110, tempatTurun: 'Mekah' },
  { nomor: 19, namaLatin: 'Maryam', namaArab: 'مريم', arti: 'Maryam', jumlahAyat: 98, tempatTurun: 'Mekah' },
  { nomor: 20, namaLatin: 'Taha', namaArab: 'طه', arti: 'Taha', jumlahAyat: 135, tempatTurun: 'Mekah' },
  { nomor: 21, namaLatin: 'Al-Anbiya', namaArab: 'الأنبياء', arti: 'Para Nabi', jumlahAyat: 112, tempatTurun: 'Mekah' },
  { nomor: 22, namaLatin: 'Al-Hajj', namaArab: 'الحج', arti: 'Haji', jumlahAyat: 78, tempatTurun: 'Madinah' },
  { nomor: 23, namaLatin: "Al-Mu'minun", namaArab: 'المؤمنون', arti: 'Orang-Orang Mukmin', jumlahAyat: 118, tempatTurun: 'Mekah' },
  { nomor: 24, namaLatin: 'An-Nur', namaArab: 'النور', arti: 'Cahaya', jumlahAyat: 64, tempatTurun: 'Madinah' },
  { nomor: 25, namaLatin: 'Al-Furqan', namaArab: 'الفرقان', arti: 'Pembeda', jumlahAyat: 77, tempatTurun: 'Mekah' },
  { nomor: 26, namaLatin: "Asy-Syu'ara'", namaArab: 'الشعراء', arti: 'Para Penyair', jumlahAyat: 227, tempatTurun: 'Mekah' },
  { nomor: 27, namaLatin: 'An-Naml', namaArab: 'النمل', arti: 'Semut', jumlahAyat: 93, tempatTurun: 'Mekah' },
  { nomor: 28, namaLatin: 'Al-Qasas', namaArab: 'القصص', arti: 'Kisah-Kisah', jumlahAyat: 88, tempatTurun: 'Mekah' },
  { nomor: 29, namaLatin: "'Ankabut", namaArab: 'العنكبوت', arti: 'Laba-Laba', jumlahAyat: 69, tempatTurun: 'Mekah' },
  { nomor: 30, namaLatin: 'Ar-Rum', namaArab: 'الروم', arti: 'Bangsa Romawi', jumlahAyat: 60, tempatTurun: 'Mekah' },
  { nomor: 31, namaLatin: 'Luqman', namaArab: 'لقمان', arti: 'Luqman', jumlahAyat: 34, tempatTurun: 'Mekah' },
  { nomor: 32, namaLatin: 'As-Sajdah', namaArab: 'السجدة', arti: 'Sujud', jumlahAyat: 30, tempatTurun: 'Mekah' },
  { nomor: 33, namaLatin: 'Al-Ahzab', namaArab: 'الأحزاب', arti: 'Golongan yang Bersekutu', jumlahAyat: 73, tempatTurun: 'Madinah' },
  { nomor: 34, namaLatin: "Saba'", namaArab: 'سبأ', arti: 'Kaum Saba', jumlahAyat: 54, tempatTurun: 'Mekah' },
  { nomor: 35, namaLatin: 'Fatir', namaArab: 'فاطر', arti: 'Pencipta', jumlahAyat: 45, tempatTurun: 'Mekah' },
  { nomor: 36, namaLatin: 'Yasin', namaArab: 'يس', arti: 'Yasin', jumlahAyat: 83, tempatTurun: 'Mekah' },
  { nomor: 37, namaLatin: 'As-Saffat', namaArab: 'الصافات', arti: 'Barisan-Barisan', jumlahAyat: 182, tempatTurun: 'Mekah' },
  { nomor: 38, namaLatin: 'Sad', namaArab: 'ص', arti: 'Sad', jumlahAyat: 88, tempatTurun: 'Mekah' },
  { nomor: 39, namaLatin: 'Az-Zumar', namaArab: 'الزمر', arti: 'Rombongan-Rombongan', jumlahAyat: 75, tempatTurun: 'Mekah' },
  { nomor: 40, namaLatin: 'Ghafir', namaArab: 'غافر', arti: 'Maha Pengampun', jumlahAyat: 85, tempatTurun: 'Mekah' },
  { nomor: 41, namaLatin: 'Fussilat', namaArab: 'فصلت', arti: 'Dijelaskan', jumlahAyat: 54, tempatTurun: 'Mekah' },
  { nomor: 42, namaLatin: 'Asy-Syura', namaArab: 'الشورى', arti: 'Musyawarah', jumlahAyat: 53, tempatTurun: 'Mekah' },
  { nomor: 43, namaLatin: 'Az-Zukhruf', namaArab: 'الزخرف', arti: 'Perhiasan', jumlahAyat: 89, tempatTurun: 'Mekah' },
  { nomor: 44, namaLatin: 'Ad-Dukhan', namaArab: 'الدخان', arti: 'Kabut Asap', jumlahAyat: 59, tempatTurun: 'Mekah' },
  { nomor: 45, namaLatin: 'Al-Jasiyah', namaArab: 'الجاثية', arti: 'Berlutut', jumlahAyat: 37, tempatTurun: 'Mekah' },
  { nomor: 46, namaLatin: 'Al-Ahqaf', namaArab: 'الأحقاف', arti: 'Bukit-Bukit Pasir', jumlahAyat: 35, tempatTurun: 'Mekah' },
  { nomor: 47, namaLatin: 'Muhammad', namaArab: 'محمد', arti: 'Nabi Muhammad', jumlahAyat: 38, tempatTurun: 'Madinah' },
  { nomor: 48, namaLatin: 'Al-Fath', namaArab: 'الفتح', arti: 'Kemenangan', jumlahAyat: 29, tempatTurun: 'Madinah' },
  { nomor: 49, namaLatin: 'Al-Hujurat', namaArab: 'الحجرات', arti: 'Kamar-Kamar', jumlahAyat: 18, tempatTurun: 'Madinah' },
  { nomor: 50, namaLatin: 'Qaf', namaArab: 'ق', arti: 'Qaf', jumlahAyat: 45, tempatTurun: 'Mekah' },
  { nomor: 51, namaLatin: 'Az-Zariyat', namaArab: 'الذاريات', arti: 'Angin yang Menerbangkan', jumlahAyat: 60, tempatTurun: 'Mekah' },
  { nomor: 52, namaLatin: 'At-Tur', namaArab: 'الطور', arti: 'Bukit Tursina', jumlahAyat: 49, tempatTurun: 'Mekah' },
  { nomor: 53, namaLatin: 'An-Najm', namaArab: 'النجم', arti: 'Bintang', jumlahAyat: 62, tempatTurun: 'Mekah' },
  { nomor: 54, namaLatin: 'Al-Qamar', namaArab: 'القمر', arti: 'Bulan', jumlahAyat: 55, tempatTurun: 'Mekah' },
  { nomor: 55, namaLatin: 'Ar-Rahman', namaArab: 'الرحمن', arti: 'Maha Pengasih', jumlahAyat: 78, tempatTurun: 'Madinah' },
  { nomor: 56, namaLatin: "Al-Waqi'ah", namaArab: 'الواقعة', arti: 'Hari Kiamat', jumlahAyat: 96, tempatTurun: 'Mekah' },
  { nomor: 57, namaLatin: 'Al-Hadid', namaArab: 'الحديد', arti: 'Besi', jumlahAyat: 29, tempatTurun: 'Madinah' },
  { nomor: 58, namaLatin: 'Al-Mujadilah', namaArab: 'المجادلة', arti: 'Gugatan', jumlahAyat: 22, tempatTurun: 'Madinah' },
  { nomor: 59, namaLatin: 'Al-Hasyr', namaArab: 'الحشر', arti: 'Pengusiran', jumlahAyat: 24, tempatTurun: 'Madinah' },
  { nomor: 60, namaLatin: 'Al-Mumtahanah', namaArab: 'الممتحنة', arti: 'Wanita yang Diuji', jumlahAyat: 13, tempatTurun: 'Madinah' },
  { nomor: 61, namaLatin: 'As-Saff', namaArab: 'الصف', arti: 'Barisan', jumlahAyat: 14, tempatTurun: 'Madinah' },
  { nomor: 62, namaLatin: "Al-Jumu'ah", namaArab: 'الجمعة', arti: 'Hari Jumat', jumlahAyat: 11, tempatTurun: 'Madinah' },
  { nomor: 63, namaLatin: 'Al-Munafiqun', namaArab: 'المنافقون', arti: 'Orang-Orang Munafik', jumlahAyat: 11, tempatTurun: 'Madinah' },
  { nomor: 64, namaLatin: 'At-Taghabun', namaArab: 'التغابن', arti: 'Hari Ditampakkan Kesalahan', jumlahAyat: 18, tempatTurun: 'Madinah' },
  { nomor: 65, namaLatin: 'At-Talaq', namaArab: 'الطلاق', arti: 'Talak', jumlahAyat: 12, tempatTurun: 'Madinah' },
  { nomor: 66, namaLatin: 'At-Tahrim', namaArab: 'التحريم', arti: 'Mengharamkan', jumlahAyat: 12, tempatTurun: 'Madinah' },
  { nomor: 67, namaLatin: 'Al-Mulk', namaArab: 'الملك', arti: 'Kerajaan', jumlahAyat: 30, tempatTurun: 'Mekah' },
  { nomor: 68, namaLatin: 'Al-Qalam', namaArab: 'القلم', arti: 'Pena', jumlahAyat: 52, tempatTurun: 'Mekah' },
  { nomor: 69, namaLatin: 'Al-Haqqah', namaArab: 'الحاقة', arti: 'Hari Kiamat yang Pasti', jumlahAyat: 52, tempatTurun: 'Mekah' },
  { nomor: 70, namaLatin: "Al-Ma'arij", namaArab: 'المعارج', arti: 'Tempat Naik', jumlahAyat: 44, tempatTurun: 'Mekah' },
  { nomor: 71, namaLatin: 'Nuh', namaArab: 'نوح', arti: 'Nabi Nuh', jumlahAyat: 28, tempatTurun: 'Mekah' },
  { nomor: 72, namaLatin: 'Al-Jinn', namaArab: 'الجن', arti: 'Jin', jumlahAyat: 28, tempatTurun: 'Mekah' },
  { nomor: 73, namaLatin: 'Al-Muzzammil', namaArab: 'المزمل', arti: 'Orang yang Berselimut', jumlahAyat: 20, tempatTurun: 'Mekah' },
  { nomor: 74, namaLatin: 'Al-Muddassir', namaArab: 'المدثر', arti: 'Orang yang Berkemul', jumlahAyat: 56, tempatTurun: 'Mekah' },
  { nomor: 75, namaLatin: 'Al-Qiyamah', namaArab: 'القيامة', arti: 'Hari Kiamat', jumlahAyat: 40, tempatTurun: 'Mekah' },
  { nomor: 76, namaLatin: 'Al-Insan', namaArab: 'الإنسان', arti: 'Manusia', jumlahAyat: 31, tempatTurun: 'Madinah' },
  { nomor: 77, namaLatin: 'Al-Mursalat', namaArab: 'المرسلات', arti: 'Malaikat yang Diutus', jumlahAyat: 50, tempatTurun: 'Mekah' },
  { nomor: 78, namaLatin: "An-Naba'", namaArab: 'النبأ', arti: 'Berita Besar', jumlahAyat: 40, tempatTurun: 'Mekah' },
  { nomor: 79, namaLatin: "An-Nazi'at", namaArab: 'النازعات', arti: 'Malaikat yang Mencabut', jumlahAyat: 46, tempatTurun: 'Mekah' },
  { nomor: 80, namaLatin: "'Abasa", namaArab: 'عبس', arti: 'Bermuka Masam', jumlahAyat: 42, tempatTurun: 'Mekah' },
  { nomor: 81, namaLatin: 'At-Takwir', namaArab: 'التكوير', arti: 'Menggulung', jumlahAyat: 29, tempatTurun: 'Mekah' },
  { nomor: 82, namaLatin: 'Al-Infitar', namaArab: 'الانفطار', arti: 'Terbelah', jumlahAyat: 19, tempatTurun: 'Mekah' },
  { nomor: 83, namaLatin: 'Al-Mutaffifin', namaArab: 'المطففين', arti: 'Orang-Orang Curang', jumlahAyat: 36, tempatTurun: 'Mekah' },
  { nomor: 84, namaLatin: 'Al-Insyiqaq', namaArab: 'الانشقاق', arti: 'Terbelah', jumlahAyat: 25, tempatTurun: 'Mekah' },
  { nomor: 85, namaLatin: 'Al-Buruj', namaArab: 'البروج', arti: 'Gugusan Bintang', jumlahAyat: 22, tempatTurun: 'Mekah' },
  { nomor: 86, namaLatin: 'At-Tariq', namaArab: 'الطارق', arti: 'Yang Datang di Malam Hari', jumlahAyat: 17, tempatTurun: 'Mekah' },
  { nomor: 87, namaLatin: "Al-A'la", namaArab: 'الأعلى', arti: 'Maha Tinggi', jumlahAyat: 19, tempatTurun: 'Mekah' },
  { nomor: 88, namaLatin: 'Al-Ghasyiyah', namaArab: 'الغاشية', arti: 'Hari Pembalasan', jumlahAyat: 26, tempatTurun: 'Mekah' },
  { nomor: 89, namaLatin: 'Al-Fajr', namaArab: 'الفجر', arti: 'Fajar', jumlahAyat: 30, tempatTurun: 'Mekah' },
  { nomor: 90, namaLatin: 'Al-Balad', namaArab: 'البلد', arti: 'Negeri', jumlahAyat: 20, tempatTurun: 'Mekah' },
  { nomor: 91, namaLatin: 'Asy-Syams', namaArab: 'الشمس', arti: 'Matahari', jumlahAyat: 15, tempatTurun: 'Mekah' },
  { nomor: 92, namaLatin: 'Al-Lail', namaArab: 'الليل', arti: 'Malam', jumlahAyat: 21, tempatTurun: 'Mekah' },
  { nomor: 93, namaLatin: 'Ad-Duha', namaArab: 'الضحى', arti: 'Waktu Duha', jumlahAyat: 11, tempatTurun: 'Mekah' },
  { nomor: 94, namaLatin: 'Al-Insyirah', namaArab: 'الشرح', arti: 'Kelapangan', jumlahAyat: 8, tempatTurun: 'Mekah' },
  { nomor: 95, namaLatin: 'At-Tin', namaArab: 'التين', arti: 'Buah Tin', jumlahAyat: 8, tempatTurun: 'Mekah' },
  { nomor: 96, namaLatin: "Al-'Alaq", namaArab: 'العلق', arti: 'Segumpal Darah', jumlahAyat: 19, tempatTurun: 'Mekah' },
  { nomor: 97, namaLatin: 'Al-Qadr', namaArab: 'القدر', arti: 'Kemuliaan', jumlahAyat: 5, tempatTurun: 'Mekah' },
  { nomor: 98, namaLatin: 'Al-Bayyinah', namaArab: 'البينة', arti: 'Bukti Nyata', jumlahAyat: 8, tempatTurun: 'Madinah' },
  { nomor: 99, namaLatin: 'Az-Zalzalah', namaArab: 'الزلزلة', arti: 'Keguncangan', jumlahAyat: 8, tempatTurun: 'Madinah' },
  { nomor: 100, namaLatin: "Al-'Adiyat", namaArab: 'العاديات', arti: 'Kuda Perang Berlari Kencang', jumlahAyat: 11, tempatTurun: 'Mekah' },
  { nomor: 101, namaLatin: "Al-Qari'ah", namaArab: 'القارعة', arti: 'Hari Kiamat yang Mengetuk', jumlahAyat: 11, tempatTurun: 'Mekah' },
  { nomor: 102, namaLatin: 'At-Takasur', namaArab: 'التكاثر', arti: 'Bermegah-Megahan', jumlahAyat: 8, tempatTurun: 'Mekah' },
  { nomor: 103, namaLatin: "Al-'Asr", namaArab: 'العصر', arti: 'Masa / Waktu', jumlahAyat: 3, tempatTurun: 'Mekah' },
  { nomor: 104, namaLatin: 'Al-Humazah', namaArab: 'الهمزة', arti: 'Pengumpat', jumlahAyat: 9, tempatTurun: 'Mekah' },
  { nomor: 105, namaLatin: 'Al-Fil', namaArab: 'الفيل', arti: 'Gajah', jumlahAyat: 5, tempatTurun: 'Mekah' },
  { nomor: 106, namaLatin: 'Quraisy', namaArab: 'قريش', arti: 'Suku Quraisy', jumlahAyat: 4, tempatTurun: 'Mekah' },
  { nomor: 107, namaLatin: "Al-Ma'un", namaArab: 'الماعون', arti: 'Barang-Barang Berguna', jumlahAyat: 7, tempatTurun: 'Mekah' },
  { nomor: 108, namaLatin: 'Al-Kausar', namaArab: 'الكوثر', arti: 'Nikmat yang Berlimpah', jumlahAyat: 3, tempatTurun: 'Mekah' },
  { nomor: 109, namaLatin: 'Al-Kafirun', namaArab: 'الكافرون', arti: 'Orang-Orang Kafir', jumlahAyat: 6, tempatTurun: 'Mekah' },
  { nomor: 110, namaLatin: 'An-Nasr', namaArab: 'النصر', arti: 'Pertolongan', jumlahAyat: 3, tempatTurun: 'Madinah' },
  { nomor: 111, namaLatin: 'Al-Lahab', namaArab: 'المسد', arti: 'Gejolak Api', jumlahAyat: 5, tempatTurun: 'Mekah' },
  { nomor: 112, namaLatin: 'Al-Ikhlas', namaArab: 'الإخلاص', arti: 'Keesaan Allah', jumlahAyat: 4, tempatTurun: 'Mekah' },
  { nomor: 113, namaLatin: 'Al-Falaq', namaArab: 'الفلق', arti: 'Waktu Subuh', jumlahAyat: 5, tempatTurun: 'Mekah' },
  { nomor: 114, namaLatin: 'An-Nas', namaArab: 'الناس', arti: 'Manusia', jumlahAyat: 6, tempatTurun: 'Mekah' }
]

// Fallback initial detail for Surah Al-Baqarah (as shown in Stitch design)
export const INITIAL_AL_BAQARAH: SurahDetail = {
  nomor: 2,
  namaLatin: 'Al-Baqarah',
  namaArab: 'البقرة',
  arti: 'Sapi Betina',
  jumlahAyat: 286,
  tempatTurun: 'Madinah',
  nomorArab: '٢',
  ayat: [
    {
      nomorAyat: 1,
      teksArab: 'الۤمۤ',
      teksLatin: 'Alif lām mīm.',
      teksIndonesia: 'Alif lām mīm.'
    },
    {
      nomorAyat: 2,
      teksArab: 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
      teksLatin: 'Zālikal-kitābu lā raiba fīh(i), hudal lil-muttaqīn(a).',
      teksIndonesia: 'Kitab (Al-Qur\'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,'
    },
    {
      nomorAyat: 3,
      teksArab: 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ',
      teksLatin: "Al-lażīna yu'minūna bil-gaibi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn(a).",
      teksIndonesia: '(yaitu) mereka yang beriman kepada yang gaib, melaksanakan salat, dan menginfakkan sebagian rezeki yang Kami berikan kepada mereka,'
    },
    {
      nomorAyat: 4,
      teksArab: 'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ',
      teksLatin: "Wal-lażīna yu'minūna bimā unzila ilaika wa mā unzila min qablik(a), wabil-ākhirati hum yūqinūn(a).",
      teksIndonesia: 'Dan mereka yang beriman kepada (Al-Qur\'an) yang diturunkan kepadamu (Muhammad) dan (kitab-kitab) yang telah diturunkan sebelum engkau, dan mereka yakin akan adanya akhirat.'
    },
    {
      nomorAyat: 5,
      teksArab: 'أُو۟لَـٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ',
      teksLatin: "Ulā'ika 'alā hudam mir rabbihim wa ulā'ika humul-muflihūn(a).",
      teksIndonesia: 'Merekalah yang mendapat petunjuk dari Tuhannya, dan mereka itulah orang-orang yang beruntung.'
    }
  ]
}

// Fallback initial detail for Surah Al-Fatihah
export const INITIAL_AL_FATIHAH: SurahDetail = {
  nomor: 1,
  namaLatin: 'Al-Fatihah',
  namaArab: 'الفاتحة',
  arti: 'Pembukaan',
  jumlahAyat: 7,
  tempatTurun: 'Mekah',
  nomorArab: '١',
  ayat: [
    {
      nomorAyat: 1,
      teksArab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      teksLatin: 'Bismillāhir-raḥmānir-raḥīm(i).',
      teksIndonesia: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.'
    },
    {
      nomorAyat: 2,
      teksArab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      teksLatin: 'Al-ḥamdu lillāhi rabbil-\'ālamīn(a).',
      teksIndonesia: 'Segala puji bagi Allah, Tuhan seluruh alam,'
    },
    {
      nomorAyat: 3,
      teksArab: 'الرَّحْمَٰنِ الرَّحِيمِ',
      teksLatin: 'Ar-raḥmānir-raḥīm(i).',
      teksIndonesia: 'Yang Maha Pengasih, Maha Penyayang,'
    },
    {
      nomorAyat: 4,
      teksArab: 'مَالِكِ يَوْمِ الدِّينِ',
      teksLatin: 'Māliki yaumid-dīn(i).',
      teksIndonesia: 'Pemilik hari pembalasan.'
    },
    {
      nomorAyat: 5,
      teksArab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      teksLatin: 'Iyyāka na\'budu wa iyyāka nasta\'īn(u).',
      teksIndonesia: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.'
    },
    {
      nomorAyat: 6,
      teksArab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      teksLatin: 'Ihdinaṣ-ṣirāṭal-mustaqīm(a).',
      teksIndonesia: 'Tunjukilah kami jalan yang lurus,'
    },
    {
      nomorAyat: 7,
      teksArab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      teksLatin: 'Ṣirāṭal-lażīna an\'amta \'alaihim gairil-magḍūbi \'alaihim wa laḍ-ḍāllīn(a).',
      teksIndonesia: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.'
    }
  ]
}
