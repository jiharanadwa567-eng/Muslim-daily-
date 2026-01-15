
import { Surah, PrayerTime, TajwidRule, TajwidCategory, DuaCategory, DuaItem } from './types';

// Definisi Interface untuk Ayat Harian
export interface Verse {
  arabic: string;
  translation: string;
  reference: string;
}

// KOLEKSI AYAT HARI INI (Dinamis)
export const DAILY_VERSES: Verse[] = [
  { 
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", 
    translation: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.", 
    reference: "QS. Al-Insyirah: 5" 
  },
  { 
    arabic: "وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ", 
    translation: "Berbekallah, dan sesungguhnya sebaik-baik bekal adalah takwa.", 
    reference: "QS. Al-Baqarah: 197" 
  },
  { 
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", 
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat.", 
    reference: "QS. Al-Baqarah: 201" 
  },
  { 
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", 
    translation: "Ingatlah, hanya dengan mengingati Allah-lah hati menjadi tenteram.", 
    reference: "QS. Ar-Ra'd: 28" 
  },
  { 
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", 
    translation: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.", 
    reference: "QS. Al-Baqarah: 286" 
  },
  { 
    arabic: "إِنَّ مَعَ الْعَسْرِ يُسْرًا", 
    translation: "Sesungguhnya sesudah kesulitan itu ada kemudahan.", 
    reference: "QS. Al-Insyirah: 6" 
  },
  { 
    arabic: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ", 
    translation: "Dan sembahlah Tuhanmu sampai datang kepadamu kematian.", 
    reference: "QS. Al-Hijr: 99" 
  }
];

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
  { number: 64, name: "التغابن", transliteration: "At-Taghabun", translation: "Hari Ditampakkan Kesalahan", totalAyah: 18 },
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
  { number: 88, name: "الغاشية", transliteration: "Al-Ghasyiyah", translation: "Hari Pembalasan", totalAyah: 26 },
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
  // --- KRONOLOGIS SEHARI-HARI ---
  
  // 1. BANGUN TIDUR
  {
    id: 1,
    categoryId: 'harian',
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَا اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wailaihin nusyur",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (membangunkan dari tidur) dan hanya kepada-Nya kami dikembalikan.",
    source: "HR. Bukhari no. 6312, Muslim no. 2711"
  },
  
  // 2. KE KAMAR MANDI / WC
  {
    id: 10,
    categoryId: 'harian',
    title: "Doa Masuk Kamar Mandi / WC",
    arabic: "اَللّٰهُمَّ اِنِّىْ اَعُوْذُبِكَ مِنَ الْخُبُثِ وَالْخَبَآئِثِ",
    latin: "Allahumma inni a'udzubika minal khubutsi wal khabaa'its",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan syaitan laki-laki dan perempuan.",
    source: "HR. Bukhari no. 142, Muslim no. 375"
  },
  {
    id: 11,
    categoryId: 'harian',
    title: "Doa Keluar Kamar Mandi / WC",
    arabic: "غُفْرَانَكَ",
    latin: "Ghufranaka",
    translation: "Aku memohon ampunan-Mu.",
    source: "HR. Abu Daud no. 30, Tirmidzi no. 7"
  },
  
  // 3. BERPAKAIAN
  {
    id: 12,
    categoryId: 'harian',
    title: "Doa Memakai Pakaian",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alhamdulillahilladzi kasaani hadza (ats-tsauba) wa razaqanihi min ghairi haulin minni wa laa quwwatin",
    translation: "Segala puji bagi Allah yang telah memakaikan (pakaian) ini kepadaku dan mengaruniakannya kepadaku tanpa daya dan kekuatan dariku.",
    source: "HR. Abu Daud no. 4023 (Hasan)"
  },
  {
    id: 13,
    categoryId: 'harian',
    title: "Doa Memakai Pakaian Baru",
    arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    latin: "Allahumma lakal hamdu anta kasautaniih, as-aluka min khairihi wa khairi maa shuni'a lah, wa a'udzu bika min syarrihi wa syarri maa shuni'a lah.",
    translation: "Ya Allah, bagi-Mu segala puji, Engkau yang telah memakaikannya kepadaku. Aku memohon kepada-Mu kebaikannya dan kebaikan tujuan dibuatnya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan tujuan dibuatnya.",
    source: "HR. Abu Daud no. 4020, Tirmidzi no. 1767"
  },
  {
    id: 15,
    categoryId: 'harian',
    title: "Doa Melihat Orang Lain Pakai Baju Baru",
    arabic: "تُبْلِي وَيُخْلِفُ اللهُ تَعَالَى",
    latin: "Tublii wa yukhlifullaahu ta'aalaa",
    translation: "Semoga kamu dapat memakainya sampai lusuh dan Allah menggantinya dengan yang lebih baik.",
    source: "HR. Abu Daud no. 4020 (Shahih)"
  },

  // 4. KELUAR RUMAH
  {
    id: 20,
    categoryId: 'harian',
    title: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
    latin: "Bismillahi, tawakkaltu 'alallah, laa haula wa laa quwwata illaa billaah",
    translation: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.",
    source: "HR. Abu Daud no. 5095, Tirmidzi no. 3426"
  },
  
  // 5. MENUJU & DI MASJID
  {
    id: 22,
    categoryId: 'harian',
    title: "Doa Pergi ke Masjid",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا",
    latin: "Allahummaj'al fii qalbii nuura, wa fii lisaani nuura, wa fii sam'ii nuura, wa fii basharii nuura...",
    translation: "Ya Allah, jadikanlah cahaya di hatiku, cahaya di lidahku, cahaya di pendengaranku, cahaya di penglihatanku...",
    source: "HR. Muslim no. 763"
  },
  {
    id: 23,
    categoryId: 'harian',
    title: "Doa Masuk Masjid",
    arabic: "أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "A'udzu billahil 'azhiim, wa biwajhihil kariim, wa sulthaanihil qadiim, minasy syaithaanir rajiim. Allahummaftah lii abwaaba rahmatik.",
    translation: "Aku berlindung kepada Allah Yang Maha Agung, dengan Wajah-Nya Yang Mulia, dan Kekuasaan-Nya yang abadi, dari setan yang terkutuk. Ya Allah, bukalah untukku pintu-pintu rahmat-Mu.",
    source: "HR. Abu Daud no. 465, Muslim no. 713"
  },
  {
    id: 25,
    categoryId: 'harian',
    title: "Doa Mendengar Adzan",
    arabic: "اَللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلاَةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ",
    latin: "Allahumma rabba haadzihid da'watit taammah, wash-shalaatil qaa-imah, aati Muhammadanil wasiilata wal fadhilah, wab'atshu maqaamam mahmuudanil ladzi wa'adtah.",
    translation: "Ya Allah, Tuhan pemilik panggilan yang sempurna ini dan shalat yang akan didirikan, berikanlah kepada Muhammad wasilah dan keutamaan, dan bangkitkanlah beliau di kedudukan terpuji yang telah Engkau janjikan.",
    source: "HR. Bukhari no. 614"
  },
  {
    id: 26,
    categoryId: 'harian',
    title: "Doa Antara Adzan dan Iqamah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    latin: "Allahumma inni as-alukal 'aafiyah fid dunya wal aakhirah",
    translation: "Ya Allah, aku memohon keselamatan di dunia dan akhirat.",
    source: "HR. Tirmidzi no. 3594"
  },
  {
    id: 24,
    categoryId: 'harian',
    title: "Doa Keluar Masjid",
    arabic: "بِسْمِ اللهِ وَالصَّلَاةُ وَالصَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Bismillah wash-shalaatu was-salaamu 'ala rasuulillah. Allahumma inni as-aluka min fadlik.",
    translation: "Dengan nama Allah, shalawat dan salam atas Rasulullah. Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.",
    source: "HR. Muslim no. 713"
  },

  // 6. MAKAN DAN MINUM
  {
    id: 30,
    categoryId: 'harian',
    title: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللهِ",
    latin: "Bismillah",
    translation: "Dengan menyebut nama Allah.",
    source: "HR. Bukhari no. 5376, Muslim no. 2022"
  },
  {
    id: 31,
    categoryId: 'harian',
    title: "Doa Lupa Membaca Bismillah (Makan)",
    arabic: "بِسْمِ اللهِ فِي أَوَّلِهِ وَآخِرِهِ",
    latin: "Bismillahi fii awwalihi wa aakhirihi",
    translation: "Dengan menyebut nama Allah pada awal dan akhirnya.",
    source: "HR. Tirmidzi no. 1858 (Shahih)"
  },
  {
    id: 32,
    categoryId: 'harian',
    title: "Doa Sesudah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latin: "Alhamdulillahilladzi ath'amanii hadza wa razaqaniihi min ghairi haulin minni wa laa quwwatin",
    translation: "Segala puji bagi Allah yang telah memberiku makanan ini, dan menjadikannya rezeki bagiku tanpa daya dan kekuatan dariku.",
    source: "HR. Tirmidzi no. 3458 (Hasan)"
  },
  {
    id: 34,
    categoryId: 'harian',
    title: "Doa Setelah Minum Susu",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ",
    latin: "Allahumma baarik lanaa fiihi wa zidnaa minhu",
    translation: "Ya Allah, berkahilah kami padanya dan tambahkanlah untuk kami darinya.",
    source: "HR. Tirmidzi no. 3455 (Hasan)"
  },
  {
    id: 35,
    categoryId: 'harian',
    title: "Doa Apabila Diberi Minuman",
    arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي",
    latin: "Allahumma ath'im man ath'amanii, wasqi man saqaanii",
    translation: "Ya Allah, berilah makan orang yang memberiku makan, dan berilah minum orang yang memberiku minum.",
    source: "HR. Muslim no. 2055"
  },
  {
    id: 33,
    categoryId: 'harian',
    title: "Doa Tamu Kepada Tuan Rumah (Makanan)",
    arabic: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزقتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
    latin: "Allahumma baarik lahum fiimaa razaqtahum, waghfir lahum warhamhum",
    translation: "Ya Allah, berkahilah mereka dalam rezeki yang telah Engkau berikan kepada mereka, ampunilah mereka dan rahmatilah mereka.",
    source: "HR. Muslim no. 2042"
  },
  {
    id: 36,
    categoryId: 'harian',
    title: "Doa Berbuka Puasa",
    arabic: "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ",
    latin: "Dzahabazh zhama-u, wabtallatil 'uruuqu, wa tsabatal ajru insyaa Allah",
    translation: "Telah hilang dahaga, telah basah urat-urat, dan telah tetapkan pahala, insya Allah.",
    source: "HR. Abu Daud no. 2357 (Hasan)"
  },

  // 7. AKTIVITAS SIANG HARI & SOSIAL
  {
    id: 47,
    categoryId: 'harian',
    title: "Doa Masuk Pasar",
    arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaah wahdahu laa syariika lah, lahul mulku wa lahul hamdu, yuhyii wa yumiit, wa huwa hayyun laa yamuut, biyanidihil khair, wa huwa 'alaa kulli syai-in qadiir",
    translation: "Tidak ada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji. Dia menghidupkan dan mematikan, dan Dia Maha Hidup tidak mati. Di tangan-Nya segala kebaikan, dan Dia Maha Kuasa atas segala sesuatu.",
    source: "HR. Tirmidzi no. 3428 (Hasan)"
  },
  {
    id: 46,
    categoryId: 'harian',
    title: "Doa Kafaratul Majelis",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    latin: "Subhaanakallahumma wa bihamdika, asyhadu an laa ilaaha illaa anta, astavgfiruka wa atuubu ilaik",
    translation: "Maha Suci Engkau Ya Allah, dan dengan memuji-Mu, aku bersaksi bahwa tidak ada Tuhan selain Engkau, aku memohon ampun kepada-Mu dan aku bertaubat kepada-Mu.",
    source: "HR. Tirmidzi no. 3433 (Shahih)"
  },
  {
    id: 40,
    categoryId: 'harian',
    title: "Doa Bersin",
    arabic: "الْحَمْدُ لِلَّهِ",
    latin: "Alhamdulillah",
    translation: "Segala puji bagi Allah.",
    source: "HR. Bukhari no. 6224"
  },
  {
    id: 41,
    categoryId: 'harian',
    title: "Doa Mendengar Orang Bersin (Tasymit)",
    arabic: "يَرْحَمُكَ اللهُ",
    latin: "Yarhamukallah",
    translation: "Semoga Allah merahmatimu.",
    source: "HR. Bukhari no. 6224"
  },
  {
    id: 42,
    categoryId: 'harian',
    title: "Balasan Bagi yang Mendoakan Bersin",
    arabic: "يَهْدِيكُمُ اللهُ وَيُصْلِحُ بَالَكُمْ",
    latin: "Yahdiikumullaahu wa yushlihu baalakum",
    translation: "Semoga Allah memberimu petunjuk dan memperbaiki keadaanmu.",
    source: "HR. Bukhari no. 6224"
  },
  {
    id: 44,
    categoryId: 'harian',
    title: "Doa Ketika Marah",
    arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    latin: "A'udzu billahi minasy syaithaanir rajiim",
    translation: "Aku berlindung kepada Allah dari godaan setan yang terkutuk.",
    source: "HR. Bukhari no. 3282, Muslim no. 2610"
  },
  {
    id: 55,
    categoryId: 'harian',
    title: "Doa Ketika Mengalami Musibah",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
    latin: "Innaa lillahi wa innaa ilaihi raaji'uun, Allahummajurnii fii mushiibatii wa akhlif lii khairan minhaa",
    translation: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah, berilah aku pahala dalam musibahku ini dan gantikanlah untukku dengan yang lebih baik darinya.",
    source: "HR. Muslim no. 918"
  },
  {
    id: 45,
    categoryId: 'harian',
    title: "Doa Melihat Orang yang Tertimpa Musibah",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ، وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا",
    latin: "Alhamdulillahilladzi 'aafaanii mimmab talaaka bihi, wa fadhdhalanii 'alaa katsiirin mimman khalaqa tafdhiilaa",
    translation: "Segala puji bagi Allah yang telah menyelamatkanku dari musibah yang menimpamu, dan melebihkanku di atas banyak orang yang Dia ciptakan.",
    source: "HR. Tirmidzi no. 3431 (Hasan)"
  },
  {
    id: 48,
    categoryId: 'harian',
    title: "Doa Membayar Hutang (Kepada Pemberi)",
    arabic: "بَارَكَ اللهُ لَكَ فِي أَهْلِكَ وَمَالِكَ",
    latin: "Baarakallaahu laka fii ahlika wa maalika",
    translation: "Semoga Allah memberkahimu dalam keluargamu dan hartamu.",
    source: "HR. An-Nasa'i (Shahih)"
  },
  {
    id: 49,
    categoryId: 'harian',
    title: "Doa Agar Terlunasi Hutang",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    latin: "Allahummak finii bihalaalika 'an haraamika, wa aghninii bifadhlika 'amman siwaaka",
    translation: "Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal dari yang haram, dan kayakanlah aku dengan karunia-Mu dari siapa pun selain Engkau.",
    source: "HR. Tirmidzi no. 3563 (Hasan)"
  },
  {
    id: 43,
    categoryId: 'harian',
    title: "Doa Mendoakan Pengantin",
    arabic: "بَارَكَ اللهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    latin: "Baarakallaahu laka, wa baaraka 'alaika, wa jama'a bainakumaa fii khair",
    translation: "Semoga Allah memberkahimu, dan menetapkan keberkahan atasmu, dan mengumpulkan kalian berdua dalam kebaikan.",
    source: "HR. Abu Daud no. 2130, Tirmidzi no. 1091 (Shahih)"
  },
  {
    id: 89,
    categoryId: 'harian',
    title: "Doa Kepada Orang yang Berbuat Baik",
    arabic: "جَزَاكَ اللهُ خَيْرًا",
    latin: "Jazaakallaahu khairan",
    translation: "Semoga Allah membalasmu dengan kebaikan.",
    source: "HR. Tirmidzi no. 2035 (Shahih)"
  },

  // 8. FENOMENA ALAM & KEADAAN KHUSUS
  {
    id: 52,
    categoryId: 'harian',
    title: "Doa Ketika Hujan Turun",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allahumma shayyiban naafi'aa",
    translation: "Ya Allah, (jadikanlah ini) hujan yang bermanfaat.",
    source: "HR. Bukhari no. 1032"
  },
  {
    id: 53,
    categoryId: 'harian',
    title: "Doa Setelah Hujan Turun",
    arabic: "مُطِرْنَا بِفَضْلِ اللهِ وَرَحْمَتِهِ",
    latin: "Muthirnaa bifadhlillahi wa rahmatih",
    translation: "Kami diberi hujan karena karunia Allah dan rahmat-Nya.",
    source: "HR. Bukhari no. 846, Muslim no. 71"
  },
  {
    id: 50,
    categoryId: 'harian',
    title: "Doa Ketika Angin Kencang",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أرسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ",
    latin: "Allahumma inni as-aluka khairahaa, wa khaira maa fiihaa, wa khaira maa ursilat bih, wa a'udzu bika min syarrihaa, wa syarri maa fiihaa, wa syarri maa ursilat bih",
    translation: "Ya Allah, aku memohon kepada-Mu kebaikannya, kebaikan apa yang ada di dalamnya, dan kebaikan apa yang dibawanya. Dan aku berlindung kepada-Mu dari keburukannya, keburukan apa yang ada di dalamnya, dan keburukan apa yang dibawanya.",
    source: "HR. Muslim no. 899"
  },
  {
    id: 51,
    categoryId: 'harian',
    title: "Doa Mendengar Petir",
    arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
    latin: "Subhaanalladzii yusabbihur ra'du bihamdihi wal malaa-ikatu min khiifatih",
    translation: "Maha Suci Allah yang petir bertasbih dengan memuji-Nya, dan para malaikat bertasbih karena takut kepada-Nya.",
    source: "Muwatha' Malik (Shahih)"
  },
  {
    id: 54,
    categoryId: 'harian',
    title: "Doa Melihat Bulan Sabit (Awal Bulan)",
    arabic: "اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى, رَبُّنَا وَرَبُّكَ اللهُ",
    latin: "Allahu Akbar, Allahumma ahillahu 'alaina bil amni wal iimaan, was salaamati wal islaam, wat taufiiqi limaa tuhibbu rabbanaa wa tardhaa, rabbunaa wa rabbukallah",
    translation: "Allah Maha Besar. Ya Allah, terbitkanlah bulan ini kepada kami dengan keamanan, keimanan, keselamatan, keislaman, dan taufik pada apa yang Engkau cintai dan Engkau ridhai. Tuhan kami dan Tuhanmu (wahai bulan) adalah Allah.",
    source: "HR. Tirmidzi no. 3451 (Shahih)"
  },

  // 9. PERJALANAN (Dalam konteks harian)
  {
    id: 79,
    categoryId: 'harian',
    title: "Doa Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    latin: "Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    translation: "Maha Suci Allah yang telah menundukkan kendaraan ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kepada Tuhan kami-lah kami akan kembali.",
    source: "HR. Muslim no. 1342"
  },
  {
    id: 80,
    categoryId: 'harian',
    title: "Doa Safar (Perjalanan Jauh)",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
    latin: "Allahumma innaa nas-aluka fii safarinaa haadzal birra wat taqwaa, wa minal 'amali maa tardhaa, Allahumma hawwin 'alainaa safaranaa haadzaa wathwi 'annaa bu'dah...",
    translation: "Ya Allah, sesungguhnya kami memohon kepada-Mu dalam perjalanan ini kebaikan dan ketakwaan, dan amal yang Engkau ridhai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah jaraknya...",
    source: "HR. Muslim no. 1342"
  },
  {
    id: 81,
    categoryId: 'harian',
    title: "Doa Masuk Suatu Negeri / Kampung",
    arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ... أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا",
    latin: "Allahumma rabbas samaawaatis sab'i wa maa azhlalna... as-aluka khaira haadzihil qaryah wa khaira ahlihaa...",
    translation: "Ya Allah, Tuhan tujuh langit dan apa yang dinaunginya... Aku memohon kepada-Mu kebaikan negeri ini dan kebaikan penduduknya...",
    source: "HR. Hakim (Shahih)"
  },
  {
    id: 82,
    categoryId: 'harian',
    title: "Doa Singgah di Suatu Tempat (Agar Aman)",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'udzu bikalimaatillahit taammaati min syarri maa khalaq",
    translation: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.",
    source: "HR. Muslim no. 2708"
  },
  {
    id: 83,
    categoryId: 'harian',
    title: "Doa Pulang dari Safar",
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    latin: "Aayibuuna taa-ibuuna 'aabiduuna lirabbinaa haamiduun",
    translation: "Kami kembali, bertaubat, beribadah, dan memuji Tuhan kami.",
    source: "HR. Muslim no. 1342"
  },

  // 10. SAKIT & JENAZAH
  {
    id: 60,
    categoryId: 'harian',
    title: "Doa Menjenguk Orang Sakit",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ",
    latin: "Laa ba'sa thahuurun insyaa Allah",
    translation: "Tidak mengapa, semoga sakitmu ini membersihkan dosamu, insya Allah.",
    source: "HR. Bukhari no. 3616"
  },
  {
    id: 61,
    categoryId: 'harian',
    title: "Doa Orang Sakit yang Tidak Ada Harapan Sembuh",
    arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الْأَعْلَى",
    latin: "Allahummaghfir lii warhamnii wa alhiqnii bir rafiiqil a'laa",
    translation: "Ya Allah, ampunilah aku, rahmatilah aku, dan pertemukanlah aku dengan Teman Tertinggi (para nabi dan shiddiqin).",
    source: "HR. Bukhari no. 5674, Muslim no. 2444"
  },
  {
    id: 62,
    categoryId: 'harian',
    title: "Doa Ta'ziah (Bela Sungkawa)",
    arabic: "إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ",
    latin: "Inna lillahi maa akhadza, wa lahu maa a'thaa, wa kullu syai-in 'indahu bi-ajalin musamman, faltashbir wal tahtasib",
    translation: "Sesungguhnya milik Allah apa yang Dia ambil, dan milik-Nya apa yang Dia beri. Segala sesuatu di sisi-Nya memiliki waktu yang telah ditentukan. Maka bersabarlah dan haraplah pahala.",
    source: "HR. Bukhari no. 1284, Muslim no. 923"
  },
  {
    id: 63,
    categoryId: 'harian',
    title: "Doa Ziarah Kubur",
    arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
    latin: "Assalaamu 'alaikum ahlad diyaari minal mu'miniina wal muslimiin, wa innaa insyaa Allahu bikum laahiquun, nas-alullaha lanaa wa lakumul 'aafiyah",
    translation: "Semoga keselamatan tercurah kepada kalian wahai penghuni kubur dari kalangan orang-orang mukmin dan muslim. Sesungguhnya kami, insya Allah, akan menyusul kalian. Kami memohon keselamatan kepada Allah untuk kami dan kalian.",
    source: "HR. Muslim no. 975"
  },

  // 11. UMUM & PERLINDUNGAN
  {
    id: 70,
    categoryId: 'harian',
    title: "Doa Memohon Ilmu yang Bermanfaat",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    latin: "Allahumma inni as-aluka 'ilman naafi'aa, wa rizqan thayyibaa, wa 'amalan mutaqabbalaa",
    translation: "Ya Allah, sungguh aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.",
    source: "HR. Ibnu Majah (Shahih)"
  },
  {
    id: 71,
    categoryId: 'harian',
    title: "Doa Sapu Jagat (Kebaikan Dunia Akhirat)",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid dunyaa hasanah, wa fil aakhirati hasanah, wa qinaa 'adzaaban naar",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka.",
    source: "HR. Bukhari no. 4522, Muslim no. 2690"
  },
  {
    id: 72,
    categoryId: 'harian',
    title: "Doa Memohon Petunjuk (Hidayah)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى، وَالتُّقَى، وَالْعَفَافَ، وَالْغِنَى",
    latin: "Allahumma inni as-alukal hudaa, wat tuqaa, wal 'afaafa, wal ghinaa",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu petunjuk, ketakwaan, terjaga dari yang haram, dan kekayaan (kecukupan hati).",
    source: "HR. Muslim no. 2721"
  },
  {
    id: 73,
    categoryId: 'harian',
    title: "Doa Berlindung dari Kesulitan dan Malas",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    latin: "Allahumma inni a'udzu bika minal hammi wal hazan, wal 'ajzi wal kasal, wal bukhli wal jubn, wa dhala'id dain wa ghalabatir rijaal",
    translation: "Ya Allah, aku berlindung kepada-Mu dari kegelisahan dan kesedihan, dari kelemahan dan kemalasan, dari kekikiran dan pengecut, dari lilitan hutang dan penindasan orang.",
    source: "HR. Bukhari no. 6369"
  },
  {
    id: 74,
    categoryId: 'harian',
    title: "Doa Agar Teguh Hati",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    latin: "Yaa muqallibal quluub, tsabbit qalbii 'alaa diinik",
    translation: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
    source: "HR. Tirmidzi no. 3522 (Shahih)"
  },
  {
    id: 75,
    categoryId: 'harian',
    title: "Doa Mohon Ampunan (Sayyidul Istighfar)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka, wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu, a'udzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya, wa abuu-u laka bidzanbii faghfir lii, fa-innahu laa yaghfirudz dzunuuba illaa anta",
    translation: "Ya Allah, Engkau adalah Rabbku, tidak ada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku kepada-Mu, maka ampunilah aku. Sesungguhnya tidak ada yang dapat mengampuni dosa-dosa selain Engkau.",
    source: "HR. Bukhari no. 6306"
  },
  {
    id: 76,
    categoryId: 'harian',
    title: "Doa Memohon Kebaikan Anak Istri",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    latin: "Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a'yunin waj'alnaa lilmuttaqiina imaamaa",
    translation: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa.",
    source: "QS. Al-Furqan: 74"
  },
  {
    id: 84,
    categoryId: 'harian',
    title: "Doa Merasa Takut pada Sesuatu",
    arabic: "لَا إِلَهَ إِلَّا اللهُ",
    latin: "Laa ilaaha illallaah",
    translation: "Tiada Tuhan selain Allah.",
    source: "HR. Bukhari no. 3346"
  },
  {
    id: 85,
    categoryId: 'harian',
    title: "Doa Apabila Perkara Menjadi Sulit",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    latin: "Allahumma laa sahla illaa maa ja'altahu sahlan, wa anta taj'alul hazna idzaa syi'ta sahlan",
    translation: "Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkau menjadikan kesedihan (kesulitan) jika Engkau kehendaki menjadi mudah.",
    source: "HR. Ibnu Hibban (Shahih)"
  },
  {
    id: 86,
    categoryId: 'harian',
    title: "Doa Ketika Ragu dalam Beriman",
    arabic: "آمَنْتُ بِاللهِ وَرُسُلِهِ",
    latin: "Aamantu billahi wa rusulih",
    translation: "Aku beriman kepada Allah dan rasul-rasul-Nya.",
    source: "HR. Muslim no. 134"
  },
  {
    id: 87,
    categoryId: 'harian',
    title: "Doa Mengusir Setan dan Bisikannya",
    arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    latin: "A'udzu billahi minasy syaithaanir rajiim",
    translation: "Aku berlindung kepada Allah dari setan yang terkutuk.",
    source: "HR. Muslim no. 2203"
  },
  {
    id: 90,
    categoryId: 'harian',
    title: "Doa Menghilangkan Gangguan Syirik",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    latin: "Allahumma inni a'udzu bika an usyrika bika wa anaa a'lam, wa astaghfiruka limaa laa a'lam",
    translation: "Ya Allah, aku berlindung kepada-Mu dari menyekutukan-Mu padahal aku mengetahuinya, dan aku memohon ampun kepada-Mu dari apa yang tidak aku ketahui.",
    source: "HR. Ahmad (Shahih)"
  },
  {
    id: 88,
    categoryId: 'harian',
    title: "Doa Ketika Melihat Sesuatu yang Menakjubkan (Agar tidak 'Ain)",
    arabic: "مَاشَاءَ اللهُ لَا قُوَّةَ إِلَّا بِاللهِ",
    latin: "Maa syaa-allaah laa quwwata illaa billaah",
    translation: "Atas kehendak Allah, tidak ada kekuatan kecuali dengan pertolongan Allah.",
    source: "Lihat HR. Abu Daud no. 4020 (Penjelasan ulama)"
  },
  {
    id: 77,
    categoryId: 'harian',
    title: "Doa Mendengar Ayam Berkokok",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma inni as-aluka min fadlik",
    translation: "Ya Allah, aku memohon kepada-Mu dari karunia-Mu. (Karena ia melihat malaikat)",
    source: "HR. Bukhari no. 3303, Muslim no. 2729"
  },
  {
    id: 78,
    categoryId: 'harian',
    title: "Doa Mendengar Anjing Menggonggong",
    arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    latin: "A'udzu billahi minasy syaithaanir rajiim",
    translation: "Aku berlindung kepada Allah dari setan yang terkutuk. (Karena ia melihat setan)",
    source: "HR. Abu Daud no. 5103"
  },

  // 12. PULANG KE RUMAH
  {
    id: 21,
    categoryId: 'harian',
    title: "Doa Masuk Rumah",
    arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    latin: "Bismillahi walajnaa, wa bismillahi kharajnaa, wa 'alaa rabbinaa tawakkalnaa",
    translation: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Tuhan kami, kami bertawakkal.",
    source: "HR. Abu Daud no. 5096 (Shahih)"
  },

  // 13. MENJELANG TIDUR (MALAM)
  {
    id: 14,
    categoryId: 'harian',
    title: "Doa Melepas Pakaian",
    arabic: "بِسْمِ اللهِ",
    latin: "Bismillah",
    translation: "Dengan nama Allah.",
    source: "HR. Thabrani (Shahih)"
  },
  {
    id: 2,
    categoryId: 'harian',
    title: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّهُمَّ اَمُوْتُ وَ اَحْيَا",
    latin: "Bismika Allahumma amuut wa ahyaa",
    translation: "Dengan nama-Mu ya Allah aku mati dan aku hidup.",
    source: "HR. Bukhari no. 6324"
  },
  {
    id: 3,
    categoryId: 'harian',
    title: "Dzikir Tidur Miring Kanan",
    arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَهْبَةً وَرَغْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
    latin: "Allahumma aslamtu nafsii ilaika, wa fawwadhtu amrii ilaika, wa alja'tu zhahrii ilaika, rahbatan wa raghbatan ilaika, laa malja-a wa laa manjaa minka illaa ilaika, aamantu bikitaabikal ladzii anzalta, wa binabiyyikal ladzii arsalta.",
    translation: "Ya Allah, aku berserah diri kepada-Mu, aku serahkan urusanku kepada-Mu, aku sandarkan punggungku kepada-Mu, dengan rasa takut dan harap kepada-Mu. Tidak ada tempat berlindung dan menyelamatkan diri dari (ancaman)-Mu kecuali kepada-Mu. Aku beriman kepada kitab-Mu yang Engkau turunkan dan kepada Nabi-Mu yang Engkau utus.",
    source: "HR. Bukhari no. 247, Muslim no. 2710"
  },
  {
    id: 6,
    categoryId: 'harian',
    title: "Dzikir Membalikkan Badan di Malam Hari",
    arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaah wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai-in qadiir",
    translation: "Tidak ada Tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu.",
    source: "HR. Bukhari no. 1154"
  },
  {
    id: 4,
    categoryId: 'harian',
    title: "Doa Saat Susah Tidur / Terkejut Malam",
    arabic: "لَا إِلَهَ إِلَّا اللهُ الْوَاحِدُ الْقَهَّارُ، رَبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الْعَزِيزُ الْغَفَّارُ",
    latin: "Laa ilaaha illallaahul waahidul qahhaar, rabbus samaawaati wal ardhi wa maa bainahumal 'aziizul ghaffaar.",
    translation: "Tiada Tuhan yang berhak disembah selain Allah Yang Maha Esa, Yang Maha Perkasa, Tuhan langit dan bumi dan apa yang ada di antara keduanya, Yang Maha Perkasa, Yang Maha Pengampun.",
    source: "HR. Hakim (Shahih)"
  },
  {
    id: 5,
    categoryId: 'harian',
    title: "Doa Jika Mengalami Mimpi Buruk",
    arabic: "أَعُوذُ بِاللهِ مِنْ عَمَلِ الشَّيْطَانِ وَسَيِّئَاتِ الْأَحْلَامِ",
    latin: "A'udzu billahi min 'amalisy syaithaani wa sayyi-aatil ahlaam.",
    translation: "Aku berlindung kepada Allah dari perbuatan setan dan buruknya mimpi. (Disunnahkan meludah ke kiri 3x)",
    source: "HR. Muslim no. 2261"
  },

  // --- KATEGORI LAIN (SESUAI TAB FILTER) ---
  
  // Sholat (ID Started from 200)
  {
    id: 200,
    categoryId: 'sholat',
    title: "Doa Iftitah",
    arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
    latin: "Allahumma baa'id bainii wa baina khathaayaaya kamaa baa'adta bainal masyriqi wal maghrib. Allahumma naqqinii minal khathaayaa kamaa yunaqqats tsaubul abyadhu minad danas. Allahummaghsil khathaayaaya bil maa-i wats tsalji wal barad.",
    translation: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahanku sebagaimana baju putih dibersihkan dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju, dan embun. (HR. Bukhari & Muslim)",
    source: "HR. Bukhari no. 744, Muslim no. 598"
  },
  {
    id: 201,
    categoryId: 'sholat',
    title: "Doa Ruku'",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    latin: "Subhaana rabbiyal 'azhiim",
    translation: "Maha Suci Tuhanku Yang Maha Agung.",
    source: "HR. Muslim no. 772"
  },
  {
    id: 202,
    categoryId: 'sholat',
    title: "Doa I'tidal",
    arabic: "رَبَّنَا وَلَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
    latin: "Rabbana walakal hamdu hamdan katsiiron thoyyiban mubaarokan fiih",
    translation: "Ya Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, dan diberkahi di dalamnya.",
    source: "HR. Bukhari no. 799"
  },
  {
    id: 203,
    categoryId: 'sholat',
    title: "Doa Sujud",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    latin: "Subhaana rabbiyal a'laa",
    translation: "Maha Suci Tuhanku Yang Maha Tinggi.",
    source: "HR. Muslim no. 772"
  },
  {
    id: 204,
    categoryId: 'sholat',
    title: "Doa Duduk Diantara Dua Sujud",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    latin: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii",
    translation: "Ya Allah, ampunilah aku, rahmatilah aku, cukupkanlah aku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku.",
    source: "HR. Abu Dawood no. 850, Tirmidzi no. 284"
  },
  {
    id: 205,
    categoryId: 'sholat',
    title: "Tashahhud Awal",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    latin: "At-tahiyyaatu lillaahi wash-sholawaatu wath-thoyyibaat. Assalaamu 'alaika ayyuhan-nabiyyu wa rohmatullaahi wa barokaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish-shoolihiin. Asyhadu an laa ilaaha illallaah wa asyhadu anna Muhammadan 'abduhu wa rosuuluh.",
    translation: "Segala penghormatan, shalawat, dan kebaikan hanya milik Allah. Semoga salam sejahtera tercurah kepadamu wahai Nabi, beserta rahmat Allah dan keberkahan-Nya. Semoga salam sejahtera tercurah kepada kami dan hamba-hamba Allah yang shaleh. Aku bersaksi bahwa tidak ada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.",
    source: "HR. Bukhari no. 6265, Muslim no. 402"
  },
  {
    id: 206,
    categoryId: 'sholat',
    title: "Shalawat Nabi (Tashahhud Akhir)",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِIDٌ مَجِيدٌ",
    latin: "Allahumma sholli 'ala Muhammad wa 'ala aali Muhammad, kamaa shollaita 'ala Ibrohim wa 'ala aali Ibrohim, innaka hamiidun majiid. Allahumma baarik 'ala Muhammad wa 'ala aali Muhammad, kamaa baarokta 'ala Ibrohim wa 'ala aali Ibrohim, innaka hamiidun majiid.",
    translation: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
    source: "HR. Bukhari no. 3370, Muslim no. 406"
  },
  {
    id: 207,
    categoryId: 'sholat',
    title: "Doa Perlindungan Sebelum Salam",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ",
    latin: "Allahumma inni a'udzu bika min 'adzabi jahannam, wa min 'adzabil qobri, wa min fitnatil mahyaa wal mamaat, wa min syarri fitnatil masiihid dajjaal.",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari siksa neraka Jahanam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari kejahatan fitnah Al-Masih Ad-Dajjal.",
    source: "HR. Bukhari no. 1377, Muslim no. 588"
  },

  // Pagi Petang (ID Started from 300)
  {
    id: 300,
    categoryId: 'pagi_petang',
    title: "Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyum...",
    translation: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya)... (Dibaca Pagi dan Petang)",
    source: "HR. Hakim (Shahih)"
  },
  {
    id: 301,
    categoryId: 'pagi_petang',
    title: "Al-Ikhlas, Al-Falaq, An-Nas (3x)",
    arabic: "(Qul Huwallahu Ahad...) (Qul A'udzu birabbil falaq...) (Qul A'udzu birakbin nas...)",
    latin: "Dibaca masing-masing 3 kali",
    translation: "Barangsiapa membacanya 3x di pagi dan petang hari, maka itu akan mencukupinya dari segala sesuatu.",
    source: "HR. Abu Daud no. 5082, Tirmidzi no. 3575"
  },
  {
    id: 302,
    categoryId: 'pagi_petang',
    title: "Sayyidul Istighfar",
    arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ لَكَ بِذَنْبِيْ فَاغْفِرْ لِيْ، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ",
    latin: "Allahumma anta rabbii laa ilaaha illa anta khalaqtanii wa anaa 'abduka...",
    translation: "Ya Allah, Engkau adalah Rabbku, tidak ada Ilah yang berhak disembah kecuali Engkau, Engkaulah yang menciptakanku. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku kepada-Mu, maka ampunilah aku...",
    source: "HR. Bukhari no. 6306"
  },
  {
    id: 303,
    categoryId: 'pagi_petang',
    title: "Dzikir Pagi Khusus",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    latin: "Allahumma bika ashbahnaa, wa bika amsaynaa, wa bika nahyaa, wa bika namuutu, wa ilaykan nusyuur",
    translation: "Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat-Mu kami memasuki waktu petang. Dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (bagi semua makhluk).",
    source: "HR. Tirmidzi no. 3391 (Hasan Sahih)"
  },
  {
    id: 304,
    categoryId: 'pagi_petang',
    title: "Dzikir Petang Khusus",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    latin: "Allahumma bika amsaynaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu, wa ilaykal mashiir",
    translation: "Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat-Mu kami memasuki waktu pagi. Dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu tempat kembali (bagi semua makhluk).",
    source: "HR. Tirmidzi no. 3391 (Hasan Sahih)"
  },
  {
    id: 305,
    categoryId: 'pagi_petang',
    title: "Radhitu Billah (3x)",
    arabic: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallaahu 'alayhi wa sallama nabiyyaa",
    translation: "Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan Muhammad shallallahu 'alaihi wa sallam sebagai Nabi. (Dibaca 3x)",
    source: "HR. Abu Daud no. 5072, Tirmidzi no. 3389"
  },
  {
    id: 306,
    categoryId: 'pagi_petang',
    title: "Ya Hayyu Ya Qayyum",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    latin: "Yaa Hayyu Yaa Qayyum, birahmatika astaghiitsu, ashlih lii sya'nii kullahu, wa laa takilnii ilaa nafsii tharfata 'ain",
    translation: "Wahai Rabb Yang Maha Hidup, wahai Rabb Yang Berdiri Sendiri, dengan rahmat-Mu aku meminta pertolongan, perbaikilah segala urusanku, dan jangan diserahkan kepadaku meskipun sekejap mata.",
    source: "HR. Hakim (Shahih)"
  },
  {
    id: 307,
    categoryId: 'pagi_petang',
    title: "Bismillahilladzi (3x)",
    arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    latin: "Bismillahilladzi laa yadhurru ma'asmihi syai-un fil ardhi wa laa fis samaa' wa huwas samii'ul 'aliim",
    translation: "Dengan nama Allah yang bila disebut, segala sesuatu di bumi dan langit tidak akan berbahaya, Dia-lah Yang Maha Mendengar lagi Maha Mengetahui. (Dibaca 3x)",
    source: "HR. Abu Daud no. 5088, Tirmidzi no. 3388"
  },
  {
    id: 308,
    categoryId: 'pagi_petang',
    title: "Tasbih & Tahmid (100x)",
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    latin: "Subhaanallaahi wa bihamdih",
    translation: "Maha Suci Allah dan segala puji bagi-Nya. (Dibaca 100x Pagi dan Petang)",
    source: "HR. Muslim no. 2692"
  },
  {
    id: 309,
    categoryId: 'pagi_petang',
    title: "La ilaha illallah (10x / 100x)",
    arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu, wa huwa 'alaa kulli syai-in qadiir",
    translation: "Tidak ada Ilah yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji. Dia-lah yang berkuasa atas segala sesuatu.",
    source: "HR. Bukhari no. 3293, Muslim no. 2691"
  },
  {
    id: 310,
    categoryId: 'pagi_petang',
    title: "A'udzu Bikalimatillah (Khusus Petang)",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'uudzu bikalimaatillaahit taammaati min syarri maa khalaq",
    translation: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya. (Dibaca 3x pada waktu petang)",
    source: "HR. Muslim no. 2709"
  },

  // Perjalanan (ID Started from 400 - note: sebagian sudah ada di harian untuk umum, ini untuk kategori khusus)
  {
    id: 400,
    categoryId: 'perjalanan',
    title: "Doa Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِىْ سَخَّرَلَنَا هَذَا وَمَاكُنَّا لَهُ مُقْرِنِيْنَ وَاِنَّا اِلَى رَبِّنَا لَمُنْقَلِبُوْنَ",
    latin: "Subhaanalladzii sakkhara lanaa hadza wama kunna lahu muqriniin wa-inna ilaa rabbina lamunqalibuun",
    translation: "Maha Suci Tuhan yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
    source: "HR. Muslim no. 1342"
  }
];
