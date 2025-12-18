import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-[#3B5998] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Pattern (Sama seperti Layout) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 2px, transparent 2px), 
                              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
        }}>
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

      <div className="w-full max-w-sm z-10 flex flex-col justify-between h-[60vh]">
        {/* Spacer top */}
        <div></div>

        {/* Header / Logo Area */}
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#EFFACD] flex items-center justify-center bg-[#EFFACD]/10 backdrop-blur-sm mb-6 shadow-2xl">
                <span className="font-arabic text-5xl text-[#EFFACD] pb-2 drop-shadow-lg">
                    القرآن
                </span>
            </div>
            <h1 className="text-3xl font-bold text-[#EFFACD] tracking-widest drop-shadow-md">MUSLIM DAILY</h1>
            <p className="text-white/80 text-base mt-3 font-light tracking-wide">Jalani harimu dengan Al-Qur'an</p>
        </div>

        {/* Action Area */}
        <div className="w-full pb-10">
            <button 
                onClick={onLogin}
                className="w-full bg-[#EFFACD] text-[#3B5998] py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
                <span>MASUK APLIKASI</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            
            <p className="text-white/40 text-xs text-center mt-6">
                v1.0.0 • Muslim Daily App
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;