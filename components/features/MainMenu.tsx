
import React, { useMemo } from 'react';
import { BookOpen, Headphones, GraduationCap, Clock, HeartHandshake, Compass, Settings, Sparkles } from 'lucide-react';
import { ViewState } from '../../types';
import { DAILY_VERSES } from '../../constants';

interface MainMenuProps {
  onNavigate: (view: ViewState) => void;
  userName: string;
}

const MenuButton: React.FC<{
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  onClick: () => void;
}> = ({ title, icon, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-[#EFFACD] rounded-2xl p-3 flex flex-col items-center justify-center gap-2 aspect-square shadow-xl transform transition-all active:scale-95 active:rotate-1 group w-full"
  >
    <div className="text-[#3B5998] group-hover:scale-110 transition-transform bg-white/30 p-2.5 rounded-xl">
      {icon}
    </div>
    <div className="text-center w-full">
        <h3 className="text-[#3B5998] font-bold text-xs leading-tight line-clamp-1">{title}</h3>
        {subtitle && <span className="text-[#3B5998]/60 text-[10px] font-arabic block mt-0.5 truncate">{subtitle}</span>}
    </div>
  </button>
);

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, userName }) => {
  // Logika Pemilihan Ayat Harian Dinamis
  const dailyVerse = useMemo(() => {
    const today = new Date();
    // Gunakan tanggal untuk membuat seed (misal: 2024 + 11 + 25 = 2060)
    const daySeed = today.getDate() + today.getMonth() + today.getFullYear();
    // Gunakan modulus untuk memilih index dari koleksi ayat
    const index = daySeed % DAILY_VERSES.length;
    return DAILY_VERSES[index];
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full relative">
        {/* Enhanced Header */}
        <div className="flex justify-between items-start pt-8 pb-4 px-4 z-20">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-[#EFFACD] animate-pulse" />
                    <h1 className="text-[#EFFACD] text-2xl font-black tracking-tighter drop-shadow-lg">Muslim Daily</h1>
                </div>
                <p className="text-[#EFFACD]/70 text-xs font-medium tracking-wide">Assalamualaikum, {userName}</p>
            </div>
            <button 
                onClick={() => onNavigate('SETTINGS')}
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-[#EFFACD] hover:bg-[#EFFACD] hover:text-[#3B5998] transition-all shadow-xl active:scale-90"
            >
                <Settings size={20} />
            </button>
        </div>

        {/* Quick Prayer Info Widget */}
        <div className="px-4 mb-6">
            <div className="bg-[#EFFACD]/10 backdrop-blur-lg border border-white/10 rounded-3xl p-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="bg-[#EFFACD] text-[#3B5998] p-2.5 rounded-2xl shadow-lg">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-[#EFFACD]/60 text-[10px] uppercase font-bold tracking-widest">Sholat Berikutnya</p>
                        <h4 className="text-[#EFFACD] text-lg font-black">Dzuhur <span className="text-sm font-light opacity-80">11:58</span></h4>
                    </div>
                </div>
                <button 
                    onClick={() => onNavigate('SHOLAT')}
                    className="bg-[#EFFACD] text-[#3B5998] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-lg active:scale-95"
                >
                    Lihat Jadwal
                </button>
            </div>
        </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20 custom-scrollbar">
        <div className="grid grid-cols-3 gap-3.5 pb-6">
            <MenuButton 
            title="Alquran" 
            subtitle="القرآن"
            icon={<BookOpen size={28} />} 
            onClick={() => onNavigate('QURAN_TEXT')} 
            />
            <MenuButton 
            title="Murottal" 
            subtitle="صوت"
            icon={<Headphones size={28} />} 
            onClick={() => onNavigate('QURAN_MP3')} 
            />
            <MenuButton 
            title="Sholat" 
            subtitle="صلاة"
            icon={<Clock size={28} />} 
            onClick={() => onNavigate('SHOLAT')} 
            />
            <MenuButton 
            title="Doa" 
            subtitle="دعاء"
            icon={<HeartHandshake size={28} />} 
            onClick={() => onNavigate('DOA')} 
            />
            <MenuButton 
            title="Kiblat" 
            subtitle="قبلة"
            icon={<Compass size={28} />} 
            onClick={() => onNavigate('KIBLAT')} 
            />
            <MenuButton 
            title="Tajwid" 
            subtitle="تجويد"
            icon={<GraduationCap size={28} />} 
            onClick={() => onNavigate('TAJWID')} 
            />
        </div>

        {/* Dynamic Motivation Card */}
        <div className="bg-gradient-to-br from-[#EFFACD] to-[#d4e1a1] rounded-3xl p-5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h5 className="text-[#3B5998] font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles size={12} /> Ayat Hari Ini
            </h5>
            <p className="text-[#3B5998] font-arabic text-xl leading-relaxed text-right mb-4">
                {dailyVerse.arabic}
            </p>
            <p className="text-[#3B5998]/80 text-[10px] italic font-medium leading-relaxed">
                "{dailyVerse.translation}" ({dailyVerse.reference})
            </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
