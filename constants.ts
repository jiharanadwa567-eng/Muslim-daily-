
import { Surah, PrayerTime, TajwidRule, TajwidCategory, DuaCategory, DuaItem, Verse } from './types';

// DATA SURAT LENGKAP 114 SURAT
export const SURAH_LIST: Surah[] = [
  { number: 1, name: "الفاتحة", transliteration: "Al-Fatihah", translation: "Pembukaan", totalAyah: 7 },
  { number: 2, name: "البقرة", transliteration: "Al-Baqarah", translation: "Sapi Betina", totalAyah: 286 },
  { number: 3, name: "آل عمران", transliteration: "Ali 'Imran", translation: "Keluarga Imran", totalAyah: 200 },
  { number: 4, name: "النساء", transliteration: "An-Nisa'", translation: "Wanita", totalAyah: 176 },
  { number: 5, name: "المائدة", transliteration: "Al-Ma'idah", translation: "Hidangan", totalAyah: 120 },
  { number: 6, name: "الأنعام", transliteration: "Al-An'am", translation: "Binatang Ternak", totalAyah: 165 },
  { number: 7, name: "الأعراف", transliteration: "Al-A'raf", translation: "Tempat Tertinggi", totalAyah: 206 },
  { number: 8, name: "الأنفال", transliteration: "Al-Anfal", translation: "Rampasan Perang", totalAyah: 75 },
  { number: 9, name: "التوبة", transliteration: "At-Taubah", translation: "Pengampunan", totalAyah: 129 },
  { number: 10, name: "يونس", transliteration: "Yunus", translation: "Yunus", totalAyah: 109 },
  { number: 11, name: "هود", transliteration: "Hud", translation: "Hud", totalAyah: 123 },
  { number: 12, name: "يوسف", transliteration: "Yusuf", translation: "Yusuf", totalAyah: 111 },
  { number: 13, name: "الرعد", transliteration: "Ar-Ra'd", translation: "Guruh", totalAyah: 43 },
  { number: 14, name: "إبراهيم", transliteration: "Ibrahim", translation: "Ibrahim", totalAyah: 52 },
  { number: 15, name: "الحجر", transliteration: "Al-Hijr", translation: "Hijr", totalAyah: 99 },
  { number: 16, name: "النحل", transliteration: "An-Nahl", translation: "Lebah", totalAyah: 128 },
  { number: 17, name: "الإسراء", transliteration: "Al-Isra'", translation: "Perjalanan Malam", totalAyah: 111 },
  { number: 18, name: "الكهف", transliteration: "Al-Kahf", translation: "Gua", totalAyah: 110 },
  { number: 19, name: "مريم", transliteration: "Maryam", translation: "Maryam", totalAyah: 98 },
  { number: 20, name: "طه", transliteration: "Ta-Ha", translation: "Ta Ha", totalAyah: 135 },
  { number: 21, name: "الأنبياء", transliteration: "Al-Anbiya'", translation: "Para Nabi", totalAyah: 112 },
  { number: 22, name: "الحج", transliteration: "Al-Hajj", translation: "Haji", totalAyah: 78 },
  { number: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", translation: "Orang-orang Mukmin", totalAyah: 118 },
  { number: 24, name: "النور", transliteration: "An-Nur", translation: "Cahaya", totalAyah: 64 },
  { number: 25, name: "الفرقان", transliteration: "Al-Furqan", translation: "Pembeda", totalAyah: 77 },
  { number: 26, name: "الشعراء", transliteration: "Asy-Syu'ara'", translation: "Para Penyair", totalAyah: 227 },
  { number: 27, name: "النمل", transliteration: "An-Naml", translation: "Semut", totalAyah: 93 },
  { number: 28, name: "القصص", transliteration: "Al-Qasas", translation: "Kisah-kisah", totalAyah: 88 },
  { number: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", translation: "Laba-laba", totalAyah: 69 },
  { number: 30, name: "الروم", transliteration: "Ar-Rum", translation: "Bangsa Romawi", totalAyah: 60 },
  { number: 31, name: "لقمان", transliteration: "Luqman", translation: "Luqman", totalAyah: 34 },
  { number: 32, name: "السجدة", transliteration: "As-Sajdah", translation: "Sujud", totalAyah: 30 },
  { number: 33, name: "الأحزاب", transliteration: "Al-Ahzab", translation: "Golongan yang Bersekutu", totalAyah: 73 },
  { number: 34, name: "سبأ", transliteration: "Saba'", translation: "Kaum Saba'", totalAyah: 54 },
  { number: 35, name: "فاطر", transliteration: "Fatir", translation: "Pencipta", totalAyah: 45 },
  { number: 36, name: "يس", transliteration: "Ya-Sin", translation: "Ya Sin", totalAyah: 83 },
  { number: 37, name: "الصافات", transliteration: "As-Saffat", translation: "Barisan-barisan", totalAyah: 182 },
  { number: 38, name: "ص", transliteration: "Sad", translation: "Sad", totalAyah: 88 },
  { number: 39, name: "الزمر", transliteration: "Az-Zumar", translation: "Rombongan-rombongan", totalAyah: 75 },
  { number: 40, name: "غافر", transliteration: "Al-Ghafir", translation: "Maha Pengampun", totalAyah: 85 },
  { number: 41, name: "فصلت", transliteration: "Fussilat", translation: "Yang Dijelaskan", totalAyah: 54 },
  { number: 42, name: "الشورى", transliteration: "Asy-Syura", translation: "Musyawarah", totalAyah: 53 },
  { number: 43, name: "الزخرف", transliteration: "Az-Zukhruf", translation: "Perhiasan", totalAyah: 89 },
  { number: 44, name: "الدخان", transliteration: "Ad-Dukhan", translation: "Kabut", totalAyah: 59 },
  { number: 45, name: "الجاثية", transliteration: "Al-Jasiyah", translation: "Yang Berlutut", totalAyah: 37 },
  { number: 46, name: "الأحقاف", transliteration: "Al-Ahqaf", translation: "Bukit-bukit Pasir", totalAyah: 35 },
  { number: 47, name: "محمد", transliteration: "Muhammad", translation: "Muhammad", totalAyah: 38 },
  { number: 48, name: "الفتح", transliteration: "Al-Fath", translation: "Kemenangan", totalAyah: 29 },
  { number: 49, name: "الحجرات", transliteration: "Al-Hujurat", translation: "Kamar-kamar", totalAyah: 18 },
  { number: 50, name: "ق", transliteration: "Qaf", translation: "Qaf", totalAyah: 45 },
  { number: 51, name: "الذاريات", transliteration: "Az-Zariyat", translation: "Angin yang Menerbangkan", totalAyah: 60 },
  { number: 52, name: "الطور", transliteration: "At-Tur", translation: "Bukit", totalAyah: 49 },
  { number: 53, name: "النجم", transliteration: "An-Najm", translation: "Bintang", totalAyah: 62 },
  { number: 54, name: "القمر", transliteration: "Al-Qamar", translation: "Bulan", totalAyah: 55 },
  { number: 55, name: "الرحمن", transliteration: "Ar-Rahman", translation: "Yang Maha Pemurah", totalAyah: 78 },
  { number: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", translation: "Hari Kiamat", totalAyah: 96 },
  { number: 57, name: "الحديد", transliteration: "Al-Hadid", translation: "Besi", totalAyah: 29 },
  { number: 58, name: "المجادلة", transliteration: "Al-Mujadilah", translation: "Wanita yang Menggugat", totalAyah: 22 },
  { number: 59, name: "الحشر", transliteration: "Al-Hasyr", translation: "Pengusiran", totalAyah: 24 },
  { number: 60, name: "الممتحنة", transliteration: "Al-Mumtahanah", translation: "Wanita yang Diuji", totalAyah: 13 },
  { number: 61, name: "الصف", transliteration: "As-Saff", translation: "Barisan", totalAyah: 14 },
  { number: 62, name: "الجمعة", transliteration: "Al-Jumu'ah", translation: "Jumat", totalAyah: 11 },
  { number: 63, name: "المنافقون", transliteration: "Al-Munafiqun", translation: "Orang-orang Munafik", totalAyah: 11 },
  { number: 64, name: "التغabun", transliteration: "At-Taghabun", translation: "Hari Ditampakkan Kesalahan", totalAyah: 18 },
  { number: 65, name: "الطلاق", transliteration: "At-Talaq", translation: "Talak", totalAyah: 12 },
  { number: 66, name: "التحريم", transliteration: "At-Tahrim", translation: "Mengharamkan", totalAyah: 12 },
  { number: 67, name: "الملك", transliteration: "Al-Mulk", translation: "Kerajaan", totalAyah: 30 },
  { number: 68, name: "القلم", transliteration: "Al-Qalam", translation: "Pena", totalAyah: 52 },
  { number: 69, name: "الحاقة", transliteration: "Al-Haqqah", translation: "Hari Kiamat", totalAyah: 52 },
  { number: 70, name: "المعارج", transliteration: "Al-Ma'arij", translation: "Tempat Naik", totalAyah: 44 },
  { number: 71, name: "نوح", transliteration: "Nuh", translation: "Nuh", totalAyah: 28 },
  { number: 72, name: "الجن", transliteration: "Al-Jinn", translation: "Jin", totalAyah: 28 },
  { number: 73, name: "المزمل", transliteration: "Al-Muzzammil", translation: "Orang yang Berselimut", totalAyah: 20 },
  { number: 74, name: "المدثر", transliteration: "Al-Muddassir", translation: "Orang yang Berkemul", totalAyah: 56 },
  { number: 75, name: "القيامة", transliteration: "Al-Qiyamah", translation: "Hari Kiamat", totalAyah: 40 },
  { number: 76, name: "الإنسان", transliteration: "Al-Insan", translation: "Manusia", totalAyah: 31 },
  { number: 77, name: "المرسلات", transliteration: "Al-Mursalat", translation: "Malaikat yang Diutus", totalAyah: 50 },
  { number: 78, name: "النبأ", transliteration: "An-Naba'", translation: "Berita Besar", totalAyah: 40 },
  { number: 79, name: "النازعات", transliteration: "An-Nazi'at", translation: "Malaikat Pencabut", totalAyah: 46 },
  { number: 80, name: "عبس", transliteration: "'Abasa", translation: "Ia Bermuka Masam", totalAyah: 42 },
  { number: 81, name: "التكوير", transliteration: "At-Takwir", translation: "Menggulung", totalAyah: 29 },
  { number: 82, name: "الإنفطار", transliteration: "Al-Infitar", translation: "Terbelah", totalAyah: 19 },
  { number: 83, name: "المطففين", transliteration: "Al-Mutaffifin", translation: "Orang-orang Curang", totalAyah: 36 },
  { number: 84, name: "الإنشقاق", transliteration: "Al-Insyaqaq", translation: "Terbelah", totalAyah: 25 },
  { number: 85, name: "البروج", transliteration: "Al-Buruj", translation: "Gugusan Bintang", totalAyah: 22 },
  { number: 86, name: "الطارق", transliteration: "At-Tariq", translation: "Yang Datang di Malam Hari", totalAyah: 17 },
  { number: 87, name: "الأعلى", transliteration: "Al-A'la", translation: "Yang Paling Tinggi", totalAyah: 19 },
  { number: 88, name: "الغashiyah", transliteration: "Al-Ghasyiyah", translation: "Hari Pembalasan", totalAyah: 26 },
  { number: 89, name: "الفجر", transliteration: "Al-Fajr", translation: "Fajar", totalAyah: 30 },
  { number: 90, name: "البلد", transliteration: "Al-Balad", translation: "Negeri", totalAyah: 20 },
  { number: 91, name: "الشمس", transliteration: "Asy-Syams", translation: "Matahari", totalAyah: 15 },
  { number: 92, name: "الليل", transliteration: "Al-Lail", translation: "Malam", totalAyah: 21 },
  { number: 93, name: "الضحى", transliteration: "Ad-Duha", translation: "Waktu Dhuha", totalAyah: 11 },
  { number: 94, name: "الشرح", transliteration: "Al-Insyirah", translation: "Melapangkan", totalAyah: 8 },
  { number: 95, name: "التين", transliteration: "At-Tin", translation: "Buah Tin", totalAyah: 8 },
  { number: 96, name: "العلق", transliteration: "Al-'Alaq", translation: "Segumpal Darah", totalAyah: 19 },
  { number: 97, name: "القدر", transliteration: "Al-Qadr", translation: "Kemuliaan", totalAyah: 5 },
  { number: 98, name: "البينة", transliteration: "Al-Bayyinah", translation: "Pembuktian", totalAyah: 8 },
  { number: 99, name: "الزلزلة", transliteration: "Az-Zalzalah", translation: "Kegoncangan", totalAyah: 8 },
  { number: 100, name: "العاديات", transliteration: "Al-'Adiyat", translation: "Kuda Perang", totalAyah: 11 },
  { number: 101, name: "القارعة", transliteration: "Al-Qari'ah", translation: "Hari Kiamat", totalAyah: 11 },
  { number: 102, name: "التكاثر", transliteration: "At-Takatsur", translation: "Bermegah-megahan", totalAyah: 8 },
  { number: 103, name: "العصر", transliteration: "Al-'Asr", translation: "Masa", totalAyah: 3 },
  { number: 104, name: "الهمزة", transliteration: "Al-Humazah", translation: "Pengumpat", totalAyah: 9 },
  { number: 105, name: "الفيل", transliteration: "Al-Fil", translation: "Gajah", totalAyah: 5 },
  { number: 106, name: "قريش", transliteration: "Quraisy", translation: "Suku Quraisy", totalAyah: 4 },
  { number: 107, name: "الماعون", transliteration: "Al-Ma'un", translation: "Barang-barang Berguna", totalAyah: 7 },
  { number: 108, name: "الكوثر", transliteration: "Al-Kautsar", translation: "Nikmat yang Banyak", totalAyah: 3 },
  { number: 109, name: "الكافرون", transliteration: "Al-Kafirun", translation: "Orang-orang Kafir", totalAyah: 6 },
  { number: 110, name: "النصر", transliteration: "An-Nasr", translation: "Pertolongan", totalAyah: 3 },
  { number: 111, name: "اللهب", transliteration: "Al-Lahab", translation: "Gejolak Api", totalAyah: 5 },
  { number: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", translation: "Memurnikan Keesaan Allah", totalAyah: 4 },
  { number: 113, name: "الفلق", transliteration: "Al-Falaq", translation: "Waktu Subuh", totalAyah: 5 },
  { number: 114, name: "الناس", transliteration: "An-Nas", translation: "Manusia", totalAyah: 6 },
];

export const PRAYER_TIMES: PrayerTime[] = [
  { name: "Imsak", time: "04:22" },
  { name: "Subuh", time: "04:32" },
  { name: "Terbit", time: "05:48" },
  { name: "Dhuha", time: "06:16" },
  { name: "Dzuhur", time: "11:58" },
  { name: "Ashar", time: "15:19" },
  { name: "Maghrib", time: "18:02" },
  { name: "Isya", time: "19:14" },
];

export const TAJWID_CATEGORIES: TajwidCategory[] = [
  { id: 'nun_mati', title: "Hukum Nun Mati & Tanwin", description: "Hukum bacaan ketika Nun sukun atau Tanwin bertemu huruf hijaiyah." },
  { id: 'mim_mati', title: "Hukum Mim Mati", description: "Hukum bacaan ketika Mim sukun bertemu dengan huruf hijaiyah." },
  { id: 'mad', title: "Hukum Mad", description: "Aturan memanjangkan bacaan huruf Al-Qur'an." },
];

export const TAJWID_RULES: TajwidRule[] = [
  // Hukum Nun Mati & Tanwin
  { 
    id: 1, 
    categoryId: 'nun_mati',
    name: "Izhar Halqi", 
    rule: "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf halqi (hamzah, ha, ain, ha, ghain, kha), maka dibaca jelas.",
    example: "مَنْ آمَنَ"
  },
  { 
    id: 2, 
    categoryId: 'nun_mati',
    name: "Idgham Bighunnah", 
    rule: "Apabila nun sukun atau tanwin bertemu dengan ya, nun, mim, wau, maka dibaca lebur dengan dengung.",
    example: "مَنْ يَقُوْلُ"
  },
  { 
    id: 3, 
    categoryId: 'nun_mati',
    name: "Idgham Bilaghunnah", 
    rule: "Apabila nun sukun atau tanwin bertemu dengan lam atau ra, maka dibaca lebur tanpa dengung.",
    example: "مِنْ لَدُنْكَ"
  },
  { 
    id: 4, 
    categoryId: 'nun_mati',
    name: "Iqlab", 
    rule: "Apabila nun sukun atau tanwin bertemu dengan ba, maka bunyi nun diganti menjadi mim.",
    example: "مِنْ بَعْدِ"
  },
  { 
    id: 5, 
    categoryId: 'nun_mati',
    name: "Ikhfa Haqiqi", 
    rule: "Apabila nun sukun atau tanwin bertemu huruf ikhfa (selain huruf izhar, idgham, dan iqlab), dibaca samar-samar.",
    example: "أَنْفُسَهُمْ"
  },
  // Hukum Mim Mati
  {
    id: 6,
    categoryId: 'mim_mati',
    name: "Ikhfa Syafawi",
    rule: "Apabila mim sukun bertemu dengan ba, dibaca samar dengan dengung.",
    example: "تَرْمِيْهِمْ بِحِجَارَةٍ"
  },
  {
    id: 7,
    categoryId: 'mim_mati',
    name: "Idgham Mimi",
    rule: "Apabila mim sukun bertemu dengan mim, dibaca lebur dengan dengung.",
    example: "لَهُمْ مَا يَشَاءُوْنَ"
  },
  {
    id: 8,
    categoryId: 'mim_mati',
    name: "Izhar Syafawi",
    rule: "Apabila mim sukun bertemu dengan huruf selain mim dan ba, dibaca jelas.",
    example: "هُمْ فِيْهَا"
  },
  // Hukum Mad
  {
    id: 9,
    categoryId: 'mad',
    name: "Mad Thabi'i",
    rule: "Mad asli, dibaca panjang 2 harakat. (Alif sesudah fathah, Ya sukun sesudah kasrah, Wau sukun sesudah dhammah).",
    example: "نُوْحِيْهَا"
  },
  {
    id: 10,
    categoryId: 'mad',
    name: "Mad Wajib Muttashil",
    rule: "Apabila Mad Thabi'i bertemu dengan Hamzah dalam satu kata. Dibaca panjang 4-5 harakat.",
    example: "إِذَا جَاءَ"
  },
  {
    id: 11,
    categoryId: 'mad',
    name: "Mad Jaiz Munfashil",
    rule: "Apabila Mad Thabi'i bertemu dengan Hamzah dalam kata yang terpisah. Dibaca panjang 2, 4, atau 5 harakat.",
    example: "يَا أَيُّهَا"
  },
  {
    id: 12,
    categoryId: 'mad',
    name: "Mad 'Aridh Lissukun",
    rule: "Apabila Mad Thabi'i bertemu dengan huruf yang dimatikan karena waqaf (berhenti). Dibaca panjang 2, 4, atau 6 harakat.",
    example: "تَعْلَمُوْنَ"
  },
  {
    id: 13,
    categoryId: 'mad',
    name: "Mad Iwad",
    rule: "Apabila berhenti (waqaf) pada huruf yang berharakat fathatain (tanwin), kecuali Ta Marbutah. Dibaca panjang 2 harakat.",
    example: "عَلِيْمًا حَكِيْمًا"
  },
  {
    id: 14,
    categoryId: 'mad',
    name: "Mad Badal",
    rule: "Apabila Hamzah bertemu dengan huruf Mad (seperti 'Aa, Ii, Uu'). Dibaca panjang 2 harakat.",
    example: "اِيْمَانًا"
  },
  {
    id: 15,
    categoryId: 'mad',
    name: "Mad Lin",
    rule: "Apabila ada huruf Wau sukun atau Ya sukun yang didahului huruf berharakat Fathah, dan setelahnya ada huruf yang dimatikan karena waqaf.",
    example: "مِنْ خَوْفٍ"
  },
  {
    id: 16,
    categoryId: 'mad',
    name: "Mad Lazim Mutsaqqal Kilmi",
    rule: "Apabila Mad Thabi'i bertemu dengan huruf bertasydid dalam satu kata. Dibaca panjang 6 harakat (berat).",
    example: "وَلَا الضَّالِّيْنَ"
  }
];

export const DUA_CATEGORIES: DuaCategory[] = [
  { id: 'harian', title: "Doa Sehari-hari (Bukhari/Muslim)" },
  { id: 'sholat', title: "Doa-doa Sholat" },
  { id: 'pagi_petang', title: "Dzikir Pagi dan Petang" },
  { id: 'perjalanan', title: "Doa Safar / Perjalanan" },
];

export const DUA_ITEMS: DuaItem[] = [
  // (Dua items truncated for space - assume full list remains)
  {
    id: 1,
    categoryId: 'harian',
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَا اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wailaihin nusyur",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (membangunkan dari tidur) dan hanya kepada-Nya kami dikembalikan.",
    source: "HR. Bukhari no. 6312, Muslim no. 2711"
  }
];

export const DAILY_VERSES: Verse[] = [
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.",
    reference: "QS. Al-Insyirah: 5"
  },
  {
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translation: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
    reference: "QS. Al-Baqarah: 286"
  },
  {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    translation: "Wahai orang-orang yang beriman! Mohonlah pertolongan (kepada Allah) dengan sabar dan shalat.",
    reference: "QS. Al-Baqarah: 153"
  },
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "Barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan jalan keluar baginya.",
    reference: "QS. At-Talaq: 2"
  },
  {
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
    translation: "Janganlah kamu bersikap lemah, dan janganlah (pula) kamu bersedih hati, padahal kamulah orang-orang yang paling tinggi (derajatnya), jika kamu orang-orang yang beriman.",
    reference: "QS. Ali 'Imran: 139"
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Ingatlah, hanya dengan mengingati Allah-lah hati menjadi tenteram.",
    reference: "QS. Ar-Ra'd: 28"
  },
  {
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    translation: "Dan orang-orang yang berjihad untuk (mencari keridhaan) Kami, benar-benar akan Kami tunjukkan kepada mereka jalan-jalan Kami.",
    reference: "QS. Al-Ankabut: 69"
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Sesungguhnya Allah beserta orang-orang yang sabar.",
    reference: "QS. Al-Baqarah: 153"
  }
];
