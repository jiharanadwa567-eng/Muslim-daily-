
export interface Surah {
  number: number;
  name: string;
  transliteration: string;
  translation: string;
  totalAyah: number;
}

export interface Ayah {
  number: {
    inSurah: number;
  };
  text: {
    arab: string;
    translation: string;
  };
  audio?: string;
}

export interface PrayerTime {
  name: string;
  time: string;
}

export interface TajwidCategory {
  id: string;
  title: string;
  description: string;
}

export interface TajwidRule {
  id: number;
  categoryId: string;
  name: string;
  rule: string;
  example: string;
}

export interface DuaCategory {
  id: string;
  title: string;
  description?: string;
}

export interface DuaItem {
  id: number;
  categoryId: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source?: string;
}

export interface Verse {
  arabic: string;
  translation: string;
  reference: string;
}

export type ViewState = 
  | 'SPLASH' 
  | 'LOGIN'
  | 'MENU' 
  | 'QURAN_TEXT' 
  | 'QURAN_MP3' 
  | 'TAJWID' 
  | 'SHOLAT' 
  | 'DOA' 
  | 'KIBLAT'
  | 'ZAKAT'
  | 'SETTINGS';
