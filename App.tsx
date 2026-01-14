
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
import ZakatView from './components/features/ZakatView';
import SettingsView from './components/features/SettingsView';
import GlobalPlayer from './components/GlobalPlayer';
import { ViewState, Surah, DuaItem } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('SPLASH');
  
  // -- State Settings --
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifEnabled, setNotifEnabled] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('muslim_daily_user_name') || 'Saudaraku';
  });

  // Simpan nama ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('muslim_daily_user_name', userName);
  }, [userName]);

  // -- State Navigasi Hierarkis --
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string | null>(null);
  const [selectedDua, setSelectedDua] = useState<DuaItem | null>(null);
  const [selectedTajwidCategory, setSelectedTajwidCategory] = useState<string | null>(null);

  // -- State History Navigasi --
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
      case 'QURAN_TEXT': return 'Al-Qur\'an Terjemah';
      case 'QURAN_MP3': return 'Murottal Al-Qur\'an';
      case 'TAJWID': return 'Ilmu Tajwid';
      case 'SHOLAT': return 'Jadwal Sholat';
      case 'DOA': return 'Kumpulan Doa';
      case 'KIBLAT': return 'Arah Kiblat';
      case 'ZAKAT': return 'Kalkulator Zakat';
      case 'SETTINGS': return 'Pengaturan';
      default: return ''; 
    }
  };

  // Navigasi ke Fitur Utama
  const handleNavigate = (newView: ViewState) => {
    if (newView === 'SETTINGS') {
        setPreviousView(view);
    } else {
        setSelectedSurah(null);
        setSelectedDuaCategory(null);
        setSelectedDua(null);
        setSelectedTajwidCategory(null);
    }
    setView(newView);
    // Sync browser history
    if (window.history.state?.internal) {
        window.history.replaceState({ internal: true, view: newView }, '');
    } else {
        window.history.pushState({ internal: true, view: newView }, '');
    }
  };

  const goHome = () => handleNavigate('MENU');
  const goSettings = () => handleNavigate('SETTINGS');

  // Logika Tombol Kembali (Back Stack)
  const handleBack = () => {
    if (view === 'SETTINGS') {
        setView(previousView || 'MENU');
        return;
    }

    if (selectedDua) {
      setSelectedDua(null);
      return;
    }
    if (selectedDuaCategory) {
      setSelectedDuaCategory(null);
      return;
    }
    if (selectedSurah) {
      setSelectedSurah(null);
      return;
    }
    if (selectedTajwidCategory) {
      setSelectedTajwidCategory(null);
      return;
    }

    if (view !== 'MENU' && view !== 'LOGIN' && view !== 'SPLASH') {
      setView('MENU');
      return;
    }
  };

  // -- HARDWARE BACK BUTTON HANDLER --
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (selectedDua || selectedSurah || selectedDuaCategory || selectedTajwidCategory || (view !== 'MENU' && view !== 'LOGIN')) {
        event.preventDefault();
        handleBack();
        window.history.pushState({ internal: true }, '');
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [view, selectedDua, selectedSurah, selectedDuaCategory, selectedTajwidCategory]);

  // Render Component Content
  const renderContent = () => {
    switch (view) {
      case 'MENU':
        return <MainMenu onNavigate={handleNavigate} userName={userName} />;
      case 'QURAN_TEXT':
        return (
          <QuranView 
            mode="TEXT" 
            selectedSurah={selectedSurah} 
            onSelectSurah={setSelectedSurah}
            activeAudioSurah={activeAudioSurah}
            isAudioPlaying={isAudioPlaying}
            onPlaySurah={handlePlaySurah}
          />
        );
      case 'QURAN_MP3':
        return (
          <QuranView 
            mode="MP3" 
            selectedSurah={selectedSurah} 
            onSelectSurah={setSelectedSurah}
            activeAudioSurah={activeAudioSurah}
            isAudioPlaying={isAudioPlaying}
            onPlaySurah={handlePlaySurah}
          />
        );
      case 'TAJWID':
        return <TajwidView selectedCategory={selectedTajwidCategory} onSelectCategory={setSelectedTajwidCategory} />;
      case 'SHOLAT':
        return <SholatView />;
      case 'DOA':
        return (
          <DoaView 
            selectedCategory={selectedDuaCategory} 
            onSelectCategory={setSelectedDuaCategory}
            selectedDua={selectedDua}
            onSelectDua={setSelectedDua}
          />
        );
      case 'KIBLAT':
        return <KiblatView />;
      case 'ZAKAT':
        return <ZakatView />;
      case 'SETTINGS':
        return (
          <SettingsView 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            notifEnabled={notifEnabled}
            setNotifEnabled={setNotifEnabled}
            userName={userName}
            setUserName={setUserName}
          />
        );
      default:
        return null;
    }
  };

  if (view === 'SPLASH') return <SplashScreen onFinish={() => setView('LOGIN')} />;
  if (view === 'LOGIN') return <LoginScreen onLogin={() => setView('MENU')} />;

  return (
    <Layout 
      title={getTitle(view)}
      showBack={view !== 'MENU'}
      onBack={handleBack}
      showHome={view !== 'MENU'}
      onHome={goHome}
      showSettings={view === 'MENU'}
      onSettings={goSettings}
      darkMode={darkMode}
      audioPlayer={
        activeAudioSurah ? (
          <GlobalPlayer 
            surah={activeAudioSurah} 
            isPlaying={isAudioPlaying} 
            onTogglePlay={toggleGlobalPlay}
            onClose={closeGlobalPlayer}
            progress={audioProgress}
            currentTime={audioCurrentTime}
          />
        ) : null
      }
    >
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleAudioTimeUpdate} 
        onEnded={handleAudioEnded}
        className="hidden" 
      />
      {renderContent()}
    </Layout>
  );
};

export default App;
