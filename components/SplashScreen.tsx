import React, { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen w-full bg-[#3B5998] flex items-center justify-center relative overflow-hidden">
      {/* Background pattern similar to Layout but fullscreen for splash */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <svg className="w-full h-full">
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
         </svg>
      </div>

      <div className="z-10 animate-fade-in-up flex flex-col items-center">
        {/* Simplified Calligraphy representation */}
        <div className="w-48 h-48 rounded-full border-4 border-[#EFFACD]/30 flex items-center justify-center bg-[#EFFACD]/10 backdrop-blur-sm shadow-2xl mb-8">
            <span className="font-arabic text-8xl text-[#EFFACD] leading-none pb-4 drop-shadow-lg">
                القرآن
            </span>
        </div>
        
        <p className="text-[#EFFACD] text-lg font-light tracking-widest mt-4">
          MUSLIM DAILY
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;