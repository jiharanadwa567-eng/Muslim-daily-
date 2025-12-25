
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
import TanyaAiView from './components/features/TanyaAiView';
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
      case 'TANYA_AI': return 'Tanya AI (Gemini)';
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
  }, [view, selectedSurah, selectedDua, selectedDuaCategory, selectedTajwidCategory]);

  if (view === 'SPLASH') {
    return <SplashScreen onFinish={() => setView('LOGIN')} />;
  }

  if (view === 'LOGIN') {
    return <LoginScreen onLogin={() => setView('MENU')} />;
  }

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
      <audio 
        ref={audioRef}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      <div key={view} className="animate-page-in h-full flex flex-col">
          {view === 'MENU' && <MainMenu onNavigate={handleNavigate} userName={userName} />}
          
          {view === 'QURAN_TEXT' && (
            <QuranView 
              mode="TEXT" 
              selectedSurah={selectedSurah} 
              onSelectSurah={(s) => {
                  setSelectedSurah(s);
                  if (s) window.history.pushState({ internal: true }, '');
              }}
              activeAudioSurah={activeAudioSurah}
              isAudioPlaying={isAudioPlaying}
              onPlaySurah={handlePlaySurah}
            />
          )}
          
          {view === 'QURAN_MP3' && (
            <QuranView 
              mode="MP3" 
              selectedSurah={selectedSurah} 
              onSelectSurah={(s) => {
                  setSelectedSurah(s);
                  if (s) window.history.pushState({ internal: true }, '');
              }} 
              activeAudioSurah={activeAudioSurah}
              isAudioPlaying={isAudioPlaying}
              onPlaySurah={handlePlaySurah}
            />
          )}
          
          {view === 'TAJWID' && (
            <TajwidView 
              selectedCategory={selectedTajwidCategory}
              onSelectCategory={(c) => {
                  setSelectedTajwidCategory(c);
                  if (c) window.history.pushState({ internal: true }, '');
              }}
            />
          )}
          {view === 'SHOLAT' && <SholatView />}
          
          {view === 'DOA' && (
            <DoaView 
              selectedCategory={selectedDuaCategory}
              onSelectCategory={(c) => {
                  setSelectedDuaCategory(c);
                  if (c) window.history.pushState({ internal: true }, '');
              }}
              selectedDua={selectedDua}
              onSelectDua={(d) => {
                  setSelectedDua(d);
                  if (d) window.history.pushState({ internal: true }, '');
              }}
            />
          )}
          
          {view === 'KIBLAT' && <KiblatView />}
          {view === 'TANYA_AI' && <TanyaAiView />}

          {view === 'SETTINGS' && (
            <SettingsView 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              notifEnabled={notifEnabled}
              setNotifEnabled={setNotifEnabled}
              userName={userName}
              setUserName={setUserName}
            />
          )}
      </div>
    </Layout>
  );
};

export default App;
