
import React from 'react';
import { BookOpen, Headphones, GraduationCap, Clock, HeartHandshake, Compass, Settings } from 'lucide-react';
import { ViewState } from '../../types';

interface MainMenuProps {
  onNavigate: (view: ViewState) => void;
}

const MenuButton: React.FC<{
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  onClick: () => void;
}> = ({ title, icon, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-[#EFFACD] rounded-2xl p-3 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg transform transition-transform active:scale-95 group w-full"
  >
    <div className="text-[#3B5998] group-hover:text-[#2A4070] transition-colors bg-white/20 p-2 rounded-full">
      {icon}
    </div>
    <div className="text-center w-full">
        <h3 className="text-[#3B5998] font-bold text-xs leading-tight line-clamp-1">{title}</h3>
        {subtitle && <span className="text-[#3B5998]/70 text-[10px] font-arabic block mt-0.5 truncate">{subtitle}</span>}
    </div>
  </button>
);

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col w-full relative">
        {/* Header Area for Main Menu */}
        <div className="flex justify-between items-center py-6 px-4 z-20">
            <div className="flex flex-col">
                <h1 className="text-[#EFFACD] text-xl font-bold tracking-widest drop-shadow-sm">MUSLIM DAILY</h1>
                <p className="text-[#EFFACD]/80 text-sm font-light">Assalamualaikum</p>
            </div>
            <button 
                onClick={() => onNavigate('SETTINGS')}
                className="p-2 bg-[#EFFACD]/10 backdrop-blur-sm border border-[#EFFACD]/20 rounded-full text-[#EFFACD] hover:bg-[#EFFACD] hover:text-[#3B5998] transition-all shadow-sm"
                aria-label="Pengaturan"
            >
                <Settings size={20} />
            </button>
        </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="grid grid-cols-3 gap-3 pb-4">
            <MenuButton 
            title="Alquran" 
            subtitle="القرآن"
            icon={<BookOpen size={28} />} 
            onClick={() => onNavigate('QURAN_TEXT')} 
            />
            <MenuButton 
            title="MP3" 
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
      </div>
    </div>
  );
};

export default MainMenu;
