
import React from 'react';
import { Bell, Info, Moon, Code, UserCircle } from 'lucide-react';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  notifEnabled: boolean;
  setNotifEnabled: (val: boolean) => void;
  userName: string;
  setUserName: (val: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  darkMode, 
  setDarkMode, 
  notifEnabled, 
  setNotifEnabled,
  userName,
  setUserName
}) => {
    return (
        <div className="w-full flex flex-col h-full animate-fade-in-up space-y-4 pt-2 pb-10 overflow-y-auto custom-scrollbar">
            
            {/* Group 0: Profile / Identity */}
            <div className={`rounded-2xl p-5 shadow-lg ${darkMode ? 'bg-[#2D3748] text-[#EFFACD]' : 'bg-[#EFFACD] text-[#3B5998]'}`}>
                <h3 className="font-bold text-xs opacity-60 mb-4 uppercase tracking-widest border-b border-current pb-2 opacity-40">Identitas Diri</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl shadow-inner ${darkMode ? 'bg-white/10' : 'bg-[#3B5998]/10'}`}>
                            <UserCircle size={24} />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold uppercase tracking-tighter opacity-60 block mb-1">Nama Panggilan</label>
                            <input 
                                type="text" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value.substring(0, 20))}
                                placeholder="Masukkan nama..."
                                className={`w-full bg-transparent border-b-2 border-current focus:outline-none py-1 font-bold text-lg transition-all focus:border-white ${darkMode ? 'placeholder-[#EFFACD]/30' : 'placeholder-[#3B5998]/30'}`}
                            />
                        </div>
                    </div>
                    <p className="text-[10px] opacity-50 italic">Nama ini digunakan untuk menyapa Anda di menu utama.</p>
                </div>
            </div>

            {/* Group 1: General */}
            <div className={`rounded-2xl p-5 shadow-lg ${darkMode ? 'bg-[#2D3748] text-[#EFFACD]' : 'bg-[#EFFACD] text-[#3B5998]'}`}>
                <h3 className="font-bold text-xs opacity-60 mb-4 uppercase tracking-widest border-b border-current pb-2 opacity-40">Kustomisasi</h3>
                <div className="space-y-5">
                    {/* Toggle Notifikasi */}
                    <div 
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => setNotifEnabled(!notifEnabled)}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/60'}`}>
                                <Bell size={20} />
                            </div>
                            <span className="font-semibold text-sm">Notifikasi Adzan</span>
                        </div>
                        <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${notifEnabled ? (darkMode ? 'bg-[#EFFACD]' : 'bg-[#3B5998]') : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all ${notifEnabled ? 'right-1' : 'left-1'} ${notifEnabled ? (darkMode ? 'bg-[#3B5998]' : 'bg-[#EFFACD]') : 'bg-white'}`}></div>
                        </div>
                    </div>

                    {/* Toggle Mode Gelap */}
                     <div 
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => setDarkMode(!darkMode)}
                     >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/60'}`}>
                                <Moon size={20} />
                            </div>
                            <span className="font-semibold text-sm">Mode Gelap</span>
                        </div>
                        <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? (darkMode ? 'bg-[#EFFACD]' : 'bg-[#3B5998]') : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all ${darkMode ? 'right-1' : 'left-1'} ${darkMode ? (darkMode ? 'bg-[#3B5998]' : 'bg-[#EFFACD]') : 'bg-white'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group 2: About */}
            <div className={`rounded-2xl p-5 shadow-lg ${darkMode ? 'bg-[#2D3748] text-[#EFFACD]' : 'bg-[#EFFACD] text-[#3B5998]'}`}>
                <h3 className="font-bold text-xs opacity-60 mb-4 uppercase tracking-widest border-b border-current pb-2 opacity-40">Tentang Aplikasi</h3>
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/60'}`}>
                                <Info size={20} />
                            </div>
                            <span className="font-semibold text-sm">Versi Aplikasi</span>
                        </div>
                        <span className="text-sm font-bold opacity-60 px-2 py-1 rounded bg-black/5">v1.3.0</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/60'}`}>
                                <Code size={20} />
                            </div>
                            <span className="font-semibold text-sm">Pengembang</span>
                        </div>
                        <span className="text-sm font-bold opacity-60">Muslim Daily Team</span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col justify-end items-center py-6 opacity-40 shrink-0">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${darkMode ? 'border-[#2D3748] text-[#2D3748]' : 'border-[#EFFACD] text-[#EFFACD]'}`}>
                    <span className="font-arabic text-xl">القرآن</span>
                </div>
                <p className={`text-[10px] tracking-widest uppercase ${darkMode ? 'text-[#2D3748]' : 'text-[#EFFACD]'}`}>
                    Muslim Daily App &copy; 2024
                </p>
            </div>
        </div>
    );
};

export default SettingsView;
