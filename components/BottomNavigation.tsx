import React from 'react';
import { ArrowLeft, Home, Settings } from 'lucide-react';

interface BottomNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  showHome?: boolean;
  onHome?: () => void;
  onSettings?: () => void;
  showSettings?: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  showBack = false, 
  onBack,
  showHome = false,
  onHome,
  onSettings,
  showSettings = false
}) => {
  // Render minimal container if no buttons needed
  if (!showBack && !showHome && !showSettings) return null;

  return (
    <div className="w-full bg-[#EFFACD] p-3 flex justify-between items-center rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-2 px-8">
       {/* Left Button (Back) */}
       <div className="w-10 flex justify-center">
           {showBack && (
               <button 
                 onClick={onBack} 
                 className="p-2 rounded-full text-[#3B5998] hover:bg-[#3B5998]/10 transition-colors transform active:scale-95"
                 aria-label="Kembali"
               >
                  <ArrowLeft size={28} />
               </button>
           )}
       </div>
       
       {/* Center Button (Home) */}
       <div className="w-10 flex justify-center">
           {showHome && (
                <button 
                    onClick={onHome} 
                    className="p-2 rounded-full text-[#3B5998] hover:bg-[#3B5998]/10 transition-colors transform active:scale-95"
                    aria-label="Beranda"
                >
                    <Home size={28} />
                </button>
           )}
       </div>

       {/* Right Button (Settings) */}
       <div className="w-10 flex justify-center">
           {showSettings && onSettings && (
               <button 
                 onClick={onSettings} 
                 className="p-2 rounded-full text-[#3B5998] hover:bg-[#3B5998]/10 transition-colors transform active:scale-95"
                 aria-label="Pengaturan"
               >
                  <Settings size={28} />
               </button>
           )}
       </div>
    </div>
  );
};

export default BottomNavigation;