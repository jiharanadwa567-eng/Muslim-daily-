import React from 'react';
import { PlayCircle, PauseCircle, X, Volume2 } from 'lucide-react';
import { Surah } from '../types';

interface GlobalPlayerProps {
  surah: Surah;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  progress: number; // 0 - 100
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
    <div className="w-full px-4 mb-2 animate-slide-up">
      <div className="bg-[#3B5998] rounded-2xl p-3 shadow-[0_-4px_15px_rgba(0,0,0,0.2)] border border-[#EFFACD]/20 relative overflow-hidden">
        
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
                className="h-full bg-[#EFFACD] transition-all duration-500 ease-linear"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        <div className="flex items-center justify-between relative z-10">
            {/* Info */}
            <div className="flex items-center gap-3 overflow-hidden flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isPlaying ? 'bg-[#EFFACD] text-[#3B5998]' : 'bg-[#EFFACD]/20 text-[#EFFACD]'}`}>
                        <Volume2 size={18} />
                </div>
                <div className="overflow-hidden min-w-0">
                    <h4 className="text-[#EFFACD] font-bold text-sm truncate">{surah.transliteration}</h4>
                    <div className="flex items-center gap-2">
                         <span className="text-[#EFFACD]/60 text-xs font-arabic truncate">{surah.name}</span>
                         <span className="text-[#EFFACD]/40 text-[10px] font-mono">• {formatTime(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
                    className="w-10 h-10 rounded-full bg-[#EFFACD] flex items-center justify-center text-[#3B5998] shadow-md active:scale-95 transition-transform"
                >
                    {isPlaying ? <PauseCircle size={24} fill="currentColor" /> : <PlayCircle size={24} fill="currentColor" />}
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="p-2 rounded-full text-[#EFFACD]/60 hover:text-[#EFFACD] hover:bg-white/10 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPlayer;