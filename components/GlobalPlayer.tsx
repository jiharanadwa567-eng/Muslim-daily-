
import React from 'react';
import { Play, Pause, X, Music } from 'lucide-react';
import { Surah } from '../types';

interface GlobalPlayerProps {
  surah: Surah;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  progress: number; 
  currentTime: number;
}

const GlobalPlayer: React.FC<GlobalPlayerProps> = ({ 
  surah, 
  isPlaying, 
  onTogglePlay, 
  onClose,
  progress,
  currentTime 
}) => {
  const formatTime = (time: number) => {
    if(isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full px-4 mb-3 animate-slide-up">
      <div className="bg-[#EFFACD]/15 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl border border-white/20 relative overflow-hidden">
        
        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <div 
                className="h-full bg-[#EFFACD] transition-all duration-300 ease-linear shadow-[0_0_8px_#EFFACD]"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        <div className="flex items-center justify-between relative z-10 gap-3">
            {/* Surah Info */}
            <div className="flex items-center gap-3 overflow-hidden flex-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-inner ${isPlaying ? 'bg-[#EFFACD] text-[#3B5998] rotate-12' : 'bg-white/10 text-[#EFFACD]'}`}>
                        <Music size={18} className={isPlaying ? 'animate-pulse' : ''} />
                </div>
                <div className="overflow-hidden min-w-0">
                    <h4 className="text-[#EFFACD] font-bold text-sm truncate leading-tight">{surah.transliteration}</h4>
                    <div className="flex items-center gap-2 opacity-60">
                         <span className="text-[10px] font-arabic truncate">{surah.name}</span>
                         <span className="text-[9px] font-mono tracking-tighter">/ {formatTime(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
                <button 
                    onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
                    className="w-10 h-10 rounded-full bg-[#EFFACD] flex items-center justify-center text-[#3B5998] shadow-lg active:scale-90 transition-transform"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-8 h-8 rounded-full text-[#EFFACD]/40 hover:text-red-400 hover:bg-red-400/10 transition-all active:scale-90"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPlayer;
