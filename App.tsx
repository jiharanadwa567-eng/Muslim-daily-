
import React, { useState, useRef, useEffect } from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/features/MainMenu';
import QuranView from './components/features/QuranView';
import TajwidView from './components/features/TajwidView';
import SholatView from './components/features/SholatView';
import DoaView from './components/features/DoaView';
import KiblatView from './components/features/KiblatView';
import SettingsView from './components/features/SettingsView';
import GlobalPlayer from './components/GlobalPlayer';
import { ViewState, Surah, DuaItem } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('SPLASH');
  
  // -- State Settings --
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifEnabled, setNotifEnabled] = useState<boolean>(true);

  // -- State Navigasi Hierarkis --
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string | null>(null);
  const [selectedDua, setSelectedDua] = useState<DuaItem | null>(null);
  const [selectedTajwidCategory, setSelectedTajwidCategory] = useState<string | null>(null);

  // -- State History Navigasi (untuk Settings) --
  const [previousView, setPreviousView] = useState<ViewState | null>(null);

  // -- GLOBAL AUDIO STATE --
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeAudioSurah, setActiveAudioSurah] = useState<Surah | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  // -- AUDIO LOGIC --
  const handlePlaySurah = (surah: Surah) => {
    if (!audioRef.current) return;

    // Jika surah yang sama diklik
    if (activeAudioSurah?.number === surah.number) {
        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        } else {
            audioRef.current.play();
            setIsAudioPlaying(true);
        }
        return;
    }

    // Jika surah baru
    const surahPad = surah.number.toString().padStart(3, '0');
    const audioUrl = `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surahPad}.mp3`;
    
    setActiveAudioSurah(surah);
    setIsAudioPlaying(true);
    
    audioRef.current.src = audioUrl;
    audioRef.current.play().catch(e => {
        console.error("Audio play failed", e);
        setIsAudioPlaying(false);
    });
  };

  const toggleGlobalPlay = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
        audioRef.current.pause();
    } else {
        audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const closeGlobalPlayer = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setActiveAudioSurah(null);
    setAudioProgress(0);
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setAudioCurrentTime(current);
        if (duration > 0) {
            setAudioProgress((current / duration) * 100);
        }
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

  // Helper to map view state to Header Title
  const getTitle = (v: ViewState) => {
    switch (v) {
      case 'QURAN_TEXT': return 'ALQURAN TERJEMAH';
      case 'QURAN_MP3': return 'ALQURAN MP3';
      case 'TAJWID': return 'PEMBELAJARAN TAJWID';
      case 'SHOLAT': return 'Jadwal Sholat';
      case 'DOA': return 'DO\'A-DO\'A SEHARI-HARI';
      case 'KIBLAT': return 'ARAH KIBLAT';
      case 'SETTINGS': return 'PENGATURAN';
      default: return ''; 
    }
  };

  // Navigasi ke Fitur Utama
  const handleNavigate = (newView: ViewState) => {
    // Khusus Settings: Simpan view sebelumnya & JANGAN reset state internal
    if (newView === 'SETTINGS') {
        setPreviousView(view);
        setView('SETTINGS');
        return;
    }

    // Navigasi normal: Reset state detail
    setSelectedSurah(null);
    setSelectedDuaCategory(null);
    setSelectedDua(null);
    setSelectedTajwidCategory(null);
    setView(newView);
  };

  const goHome = () => handleNavigate('MENU');
  const goSettings = () => handleNavigate('SETTINGS');

  // Logika Tombol Kembali (Back Stack)
  const handleBack = () => {
    // 0. Jika sedang di Settings -> Kembali ke View Sebelumnya
    if (view === 'SETTINGS') {
        if (previousView) {
            setView(previousView);
        } else {
            setView('MENU');
        }
        return;
    }

    // 1. Jika sedang membuka Detail Doa -> Kembali ke List Doa
    if (selectedDua) {
      setSelectedDua(null);
      return;
    }
    // 2. Jika sedang membuka Kategori Doa -> Kembali ke Kategori
    if (selectedDuaCategory) {
      setSelectedDuaCategory(null);
      return;
    }
    // 3. Jika sedang membaca Surat (Quran) -> Kembali ke Daftar Surat
    if (selectedSurah) {
      setSelectedSurah(null);
      return;
    }
    // 4. Jika sedang membaca Detail Tajwid -> Kembali ke Kategori Tajwid
    if (selectedTajwidCategory) {
      setSelectedTajwidCategory(null);
      return;
    }

    // 5. Jika sedang di Level Fitur (selain Menu) -> Kembali ke Menu Utama
    if (view !== 'MENU' && view !== 'LOGIN' && view !== 'SPLASH') {
      setView('MENU');
      return;
    }
  };

  if (view === 'SPLASH') {
    return <SplashScreen onFinish={() => setView('LOGIN')} />;
  }

  if (view === 'LOGIN') {
    return <LoginScreen onLogin={() => setView('MENU')} />;
  }

  // Common Layout Props
  const layoutProps = {
    title: view === 'MENU' ? undefined : getTitle(view), 
    showBack: view !== 'MENU', 
    onBack: handleBack,        
    showHome: view !== 'MENU',
    onHome: goHome,
    showSettings: true, 
    onSettings: goSettings,
    darkMode: darkMode,
    audioPlayer: activeAudioSurah ? (
        <GlobalPlayer 
            surah={activeAudioSurah}
            isPlaying={isAudioPlaying}
            onTogglePlay={toggleGlobalPlay}
            onClose={closeGlobalPlayer}
            progress={audioProgress}
            currentTime={audioCurrentTime}
        />
    ) : null
  };

  return (
    <Layout {...layoutProps}>
      {/* Hidden Global Audio Element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      {view === 'MENU' && <MainMenu onNavigate={handleNavigate} />}
      
      {view === 'QURAN_TEXT' && (
        <QuranView 
          mode="TEXT" 
          selectedSurah={selectedSurah} 
          onSelectSurah={setSelectedSurah}
          activeAudioSurah={activeAudioSurah}
          isAudioPlaying={isAudioPlaying}
          onPlaySurah={handlePlaySurah}
        />
      )}
      
      {view === 'QURAN_MP3' && (
        <QuranView 
          mode="MP3" 
          selectedSurah={selectedSurah} 
          onSelectSurah={setSelectedSurah} 
          activeAudioSurah={activeAudioSurah}
          isAudioPlaying={isAudioPlaying}
          onPlaySurah={handlePlaySurah}
        />
      )}
      
      {view === 'TAJWID' && (
        <TajwidView 
          selectedCategory={selectedTajwidCategory}
          onSelectCategory={setSelectedTajwidCategory}
        />
      )}
      {view === 'SHOLAT' && <SholatView />}
      
      {view === 'DOA' && (
        <DoaView 
          selectedCategory={selectedDuaCategory}
          onSelectCategory={setSelectedDuaCategory}
          selectedDua={selectedDua}
          onSelectDua={setSelectedDua}
        />
      )}
      
      {view === 'KIBLAT' && <KiblatView />}

      {view === 'SETTINGS' && (
        <SettingsView 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          notifEnabled={notifEnabled}
          setNotifEnabled={setNotifEnabled}
        />
      )}
    </Layout>
  );
};

export default App;
