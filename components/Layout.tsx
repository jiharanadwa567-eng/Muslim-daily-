import React from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showHome?: boolean;
  onHome?: () => void;
  onSettings?: () => void;
  showSettings?: boolean;
  darkMode?: boolean;
  audioPlayer?: React.ReactNode; // New Prop for Global Player
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBack = false, 
  onBack,
  showHome = false,
  onHome,
  onSettings,
  showSettings = false,
  darkMode = false,
  audioPlayer
}) => {
  return (
    // Background Color changes based on darkMode prop
    <div className={`relative h-[100dvh] w-full ${darkMode ? 'bg-[#1a202c]' : 'bg-[#3B5998]'} transition-colors duration-500 overflow-hidden text-white flex flex-col items-center`}>
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 2px, transparent 2px), 
                              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
        }}>
         {/* Geometric SVG Pattern imitation */}
         <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
            <defs>
                <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
                    <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
         </svg>
      </div>

      {/* Mosque Silhouette at bottom (Global) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover">
            <path 
                fill={darkMode ? '#4A5568' : '#EFFACD'} 
                fillOpacity="1" 
                d="M0,224L48,229.3C96,235,192,245,288,234.7C384,224,480,192,576,176C672,160,768,160,864,181.3C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
        </svg>
      </div>

      {/* Header Area */}
      {title && (
        <div className="relative z-10 w-full max-w-md p-4 pt-6 text-center shrink-0">
          <h1 className="text-xl font-bold tracking-wider text-[#EFFACD] uppercase drop-shadow-md">
            {title}
          </h1>
        </div>
      )}

      {/* Main Content Area */}
      {/* flex-1: Mengisi sisa ruang antara header dan footer */}
      <main className="relative z-10 w-full max-w-md flex-1 px-4 py-2 flex flex-col overflow-hidden">
        {children}
      </main>

      {/* Player & Navigation Container */}
      <div className="relative z-20 w-full max-w-md shrink-0 flex flex-col">
        {/* Render Global Player if exists */}
        {audioPlayer && (
           <div className="w-full">
              {audioPlayer}
           </div>
        )}

        <BottomNavigation 
          showBack={showBack} 
          onBack={onBack} 
          showHome={showHome} 
          onHome={onHome}
          showSettings={showSettings}
          onSettings={onSettings}
        />
      </div>
    </div>
  );
};

export default Layout;