
import React, { useState, useEffect, useRef } from 'react';
import { Search, PlayCircle, ArrowLeft, PauseCircle, Loader2, BookOpen, Volume2, StopCircle, Grid, AlertCircle, Info, X } from 'lucide-react';
import { SURAH_LIST } from '../../constants';
import { Surah, Ayah } from '../../types';

interface QuranViewProps {
  mode: 'TEXT' | 'MP3';
  selectedSurah: Surah | null;
  onSelectSurah: (surah: Surah | null) => void;
  activeAudioSurah: Surah | null;
  isAudioPlaying: boolean;
  onPlaySurah: (surah: Surah) => void;
}

const JUZ_MAPPING = [
    { id: 1, start: 1, end: 2 }, { id: 2, start: 2, end: 2 }, { id: 3, start: 2, end: 3 },
    { id: 4, start: 3, end: 4 }, { id: 5, start: 4, end: 4 }, { id: 6, start: 4, end: 5 },
    { id: 7, start: 5, end: 6 }, { id: 8, start: 6, end: 7 }, { id: 9, start: 7, end: 8 },
    { id: 10, start: 8, end: 9 }, { id: 11, start: 9, end: 11 }, { id: 12, start: 11, end: 12 },
    { id: 13, start: 12, end: 14 }, { id: 14, start: 15, end: 16 }, { id: 15, start: 17, end: 18 },
    { id: 16, start: 18, end: 20 }, { id: 17, start: 21, end: 22 }, { id: 18, start: 23, end: 25 },
    { id: 19, start: 25, end: 27 }, { id: 20, start: 27, end: 29 }, { id: 21, start: 29, end: 33 },
    { id: 22, start: 33, end: 36 }, { id: 23, start: 36, end: 39 }, { id: 24, start: 39, end: 41 },
    { id: 25, start: 41, end: 45 }, { id: 26, start: 46, end: 51 }, { id: 27, start: 51, end: 57 },
    { id: 28, start: 58, end: 66 }, { id: 29, start: 67, end: 77 }, { id: 30, start: 78, end: 114 }
];

const QuranView: React.FC<QuranViewProps> = ({ 
    mode, 
    selectedSurah, 
    onSelectSurah,
    activeAudioSurah,
    isAudioPlaying,
    onPlaySurah
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SURAH' | 'JUZ'>('SURAH');
  const [selectedJuzId, setSelectedJuzId] = useState<number | null>(null);
  const [localPlayingAyahIndex, setLocalPlayingAyahIndex] = useState<number | null>(null);
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  const getFilteredSurahs = () => {
      if (activeTab === 'JUZ' && selectedJuzId !== null) {
          const mapping = JUZ_MAPPING.find(j => j.id === selectedJuzId);
          if (mapping) {
              return SURAH_LIST.filter(s => s.number >= mapping.start && s.number <= mapping.end);
          }
      }
      return SURAH_LIST.filter(surah => 
        surah.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const filteredSurahs = getFilteredSurahs();

  useEffect(() => {
    return () => {
        if (localAudioRef.current) localAudioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (selectedSurah && mode === 'TEXT') {
      setLoading(true);
      setError(null);
      setAyahs([]); 
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/editions/quran-uthmani,id.indonesian,ar.alafasy,id.jalalayn`)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => {
            if (data.data && data.data.length >= 4) {
                const arabicData = data.data[0].ayahs;
                const translationData = data.data[1].ayahs;
                const audioData = data.data[2].ayahs;
                const tafsirData = data.data[3].ayahs;
                
                const combinedAyahs: Ayah[] = arabicData.map((ayah: any, index: number) => {
                    let arabicText = ayah.text;
                    if (selectedSurah.number !== 1 && ayah.numberInSurah === 1) {
                         const bismillahPrefix = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
                         if (arabicText.startsWith(bismillahPrefix)) {
                             arabicText = arabicText.replace(bismillahPrefix, '').trim();
                         }
                    }
                    return {
                        number: { inSurah: ayah.numberInSurah },
                        text: {
                            arab: arabicText,
                            translation: translationData[index].text
                        },
                        audio: audioData[index].audio,
                        tafsir: tafsirData[index].text
                    };
                });
                setAyahs(combinedAyahs);
            }
        })
        .catch(err => {
            console.error("Gagal mengambil data ayat:", err);
            setError("Gagal memuat ayat. Pastikan Anda memiliki koneksi internet untuk memuat surat ini pertama kali.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSurah, mode]);

  const renderTajwidText = (text: string) => {
    const output: React.ReactNode[] = [];
    let i = 0;
    const isDiacritic = (char: string) => /[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8]/.test(char);
    const getNextLetter = (startIndex: number): string | null => {
        for (let j = startIndex; j < text.length; j++) {
            if (text[j] !== ' ' && !isDiacritic(text[j])) return text[j];
        }
        return null;
    };
    while (i < text.length) {
        const char = text[i];
        const nextChar = text[i + 1] || '';
        if ((char === '\u0646' || char === '\u0645') && nextChar === '\u0651') {
            output.push(<span key={i} className="text-red-400">{char}{nextChar}</span>);
            i += 2; continue;
        }
        if (char === '\u0646' && nextChar === '\u06E2') {
             output.push(<span key={i} className="text-green-400">{char}{nextChar}</span>);
             i += 2; continue;
        }
        if (char === '\u0646' && !isDiacritic(nextChar)) {
            const nextLetter = getNextLetter(i + 1);
            const idghamLetters = ['\u064A', '\u0631', '\u0645', '\u0644', '\u0648', '\u0646'];
            if (nextLetter && idghamLetters.includes(nextLetter)) {
                output.push(<span key={i} className="text-red-400">{char}</span>);
            } else {
                output.push(<span key={i} className="text-green-400">{char}</span>);
            }
            i++; continue;
        }
        if (char === '\u0645' && !isDiacritic(nextChar)) {
             const nextLetter = getNextLetter(i + 1);
             if (nextLetter === '\u0628') output.push(<span key={i} className="text-green-400">{char}</span>);
             else if (nextLetter === '\u0645') output.push(<span key={i} className="text-red-400">{char}</span>);
             else output.push(char);
             i++; continue;
        }
        output.push(char);
        i++;
    }
    return output;
  };

  const handleFullSurahPlay = (e: React.MouseEvent, surah: Surah) => {
      e.stopPropagation();
      if (localPlayingAyahIndex !== null && localAudioRef.current) {
          localAudioRef.current.pause();
          setLocalPlayingAyahIndex(null);
      }
      onPlaySurah(surah);
  };

  const toggleAyahAudio = (ayahUrl: string | undefined, index: number) => {
    if (!localAudioRef.current || !ayahUrl) return;
    if (localPlayingAyahIndex === index) {
        localAudioRef.current.pause();
        setLocalPlayingAyahIndex(null);
    } else {
        setLocalPlayingAyahIndex(index);
        localAudioRef.current.src = ayahUrl;
        localAudioRef.current.play();
    }
  };

  if (selectedSurah && mode === 'TEXT') {
    const isThisSurahGlobalPlaying = activeAudioSurah?.number === selectedSurah.number && isAudioPlaying;

    return (
        <div className="w-full flex flex-col h-full animate-fade-in-up">
            <audio ref={localAudioRef} onEnded={() => setLocalPlayingAyahIndex(null)} className="hidden" />
            
            {/* Modal Tafsir */}
            {selectedTafsirAyah && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTafsirAyah(null)}></div>
                    <div className="relative bg-white text-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
                        <div className="bg-[#3B5998] p-4 flex justify-between items-center text-[#EFFACD]">
                            <h3 className="font-bold flex items-center gap-2">
                                <Info size={18} />
                                Tafsir Ayat {selectedTafsirAyah.number.inSurah}
                            </h3>
                            <button onClick={() => setSelectedTafsirAyah(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <p className="text-right font-arabic text-2xl leading-[2.5] mb-4" dir="rtl" lang="ar">
                                    {selectedTafsirAyah.text.arab}
                                </p>
                                <p className="text-xs font-bold text-[#3B5998] uppercase tracking-wider mb-1">Terjemahan:</p>
                                <p className="text-sm italic text-slate-600 border-l-4 border-[#EFFACD] pl-3">
                                    {selectedTafsirAyah.text.translation}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#3B5998] uppercase tracking-wider mb-2">Penjelasan (Tafsir Jalalayn):</p>
                                <p className="text-sm leading-relaxed text-slate-700 text-justify">
                                    {selectedTafsirAyah.tafsir}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t flex justify-center">
                            <button 
                                onClick={() => setSelectedTafsirAyah(null)}
                                className="bg-[#3B5998] text-[#EFFACD] px-8 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 mb-4">
                <button 
                    onClick={() => onSelectSurah(null)}
                    className="bg-[#EFFACD] p-2 rounded-full text-[#3B5998] hover:scale-105 transition-transform"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h2 className="text-[#EFFACD] text-lg font-bold">{selectedSurah.transliteration}</h2>
                    <p className="text-[#EFFACD]/70 text-xs">{selectedSurah.translation} • {selectedSurah.totalAyah} Ayat</p>
                </div>
                
                <button 
                    onClick={(e) => handleFullSurahPlay(e, selectedSurah)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-md active:scale-95
                        ${isThisSurahGlobalPlaying ? 'bg-[#EFFACD] text-[#3B5998] border-[#EFFACD]' : 'border-[#EFFACD] text-[#EFFACD] hover:bg-[#EFFACD]/10'}
                    `}
                >
                     {isThisSurahGlobalPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 pb-4 space-y-6 custom-scrollbar">
                {selectedSurah.number !== 9 && selectedSurah.number !== 1 && !error && (
                    <div className="text-center py-4 text-[#EFFACD] font-arabic text-2xl" lang="ar">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3 text-white/50">
                        <Loader2 className="animate-spin" size={32} />
                        <p>Memuat ayat...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-4 text-center px-6">
                        <AlertCircle size={48} className="text-[#EFFACD] opacity-50" />
                        <p className="text-[#EFFACD] text-sm leading-relaxed">{error}</p>
                        <button 
                            onClick={() => onSelectSurah(selectedSurah)}
                            className="bg-[#EFFACD] text-[#3B5998] px-4 py-2 rounded-lg text-xs font-bold"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : (
                    ayahs.map((ayah, idx) => {
                        const isThisAyahPlaying = localPlayingAyahIndex === idx;

                        return (
                            <div key={idx} className={`backdrop-blur-sm rounded-xl p-4 border transition-colors duration-300
                                ${isThisAyahPlaying 
                                    ? 'bg-[#EFFACD]/10 border-[#EFFACD] shadow-[0_0_15px_rgba(239,250,205,0.1)]' 
                                    : 'bg-white/5 border-white/10'
                                }
                            `}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#EFFACD]/20 flex items-center justify-center text-[#EFFACD] text-xs font-bold border border-[#EFFACD]/30">
                                        {ayah.number.inSurah}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setSelectedTafsirAyah(ayah)}
                                            className="p-2 rounded-full text-white/40 hover:text-[#EFFACD] hover:bg-white/10 transition-all active:scale-95"
                                            title="Lihat Tafsir"
                                        >
                                            <Info size={18} />
                                        </button>
                                        <button 
                                            onClick={() => toggleAyahAudio(ayah.audio, idx)}
                                            className={`p-2 rounded-full transition-all active:scale-95
                                                ${isThisAyahPlaying ? 'text-[#EFFACD] bg-[#EFFACD]/20' : 'text-white/40 hover:text-[#EFFACD] hover:bg-white/10'}
                                            `}
                                        >
                                            {isThisAyahPlaying ? <StopCircle size={20} /> : <Volume2 size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-right font-arabic text-3xl leading-[2.5] text-white mb-6" dir="rtl" lang="ar">
                                    {renderTajwidText(ayah.text.arab)}
                                </p>
                                <p className="text-left text-white/80 text-sm leading-relaxed font-light">
                                    {ayah.text.translation}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full relative">
      <div className="flex gap-2 mb-4 shrink-0">
        <button 
            onClick={() => { setActiveTab('SURAH'); setSelectedJuzId(null); }}
            className={`flex-1 py-2 rounded-md font-semibold text-xs shadow-sm transition-all
                ${activeTab === 'SURAH' ? 'bg-[#EFFACD] text-[#3B5998]' : 'bg-[#EFFACD]/20 text-[#EFFACD] hover:bg-[#EFFACD]/40'}
            `}
        >
            Nama Surat
        </button>
        <button 
            onClick={() => { setActiveTab('JUZ'); setSearchTerm(''); }}
            className={`flex-1 py-2 rounded-md font-semibold text-xs shadow-sm transition-all
                ${activeTab === 'JUZ' ? 'bg-[#EFFACD] text-[#3B5998]' : 'bg-[#EFFACD]/20 text-[#EFFACD] hover:bg-[#EFFACD]/40'}
            `}
        >
            Juz
        </button>
      </div>

      {(activeTab === 'SURAH' || (activeTab === 'JUZ' && selectedJuzId !== null)) && (
          <div className="bg-[#EFFACD] rounded-lg p-3 mb-4 flex items-center shadow-md shrink-0">
             <Search className="text-[#3B5998] mr-2" size={20} />
             <input 
                type="text" 
                placeholder="Cari surat..." 
                className="bg-transparent w-full text-[#3B5998] placeholder-[#3B5998]/60 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
      )}

      <div className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {activeTab === 'JUZ' && selectedJuzId === null && (
            <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
                {JUZ_MAPPING.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedJuzId(item.id)}
                        className="bg-white/10 border border-white/20 hover:bg-[#EFFACD] hover:text-[#3B5998] hover:border-[#EFFACD] text-[#EFFACD] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                        <div className="bg-current opacity-10 p-2 rounded-full">
                            <Grid size={24} />
                        </div>
                        <span className="font-bold text-sm">Juz {item.id}</span>
                    </button>
                ))}
            </div>
        )}

        {(activeTab === 'JUZ' && selectedJuzId !== null) && (
            <div className="animate-slide-up space-y-2">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setSelectedJuzId(null)} className="bg-[#EFFACD] p-2 rounded-full text-[#3B5998]">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-[#EFFACD] text-lg font-bold">Juz {selectedJuzId}</h2>
                    </div>
                </div>
                {filteredSurahs.map((surah) => (
                    <button key={surah.number} onClick={() => onSelectSurah(surah)} className="w-full backdrop-blur-sm border rounded-xl p-4 flex items-center justify-between bg-white/10 border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border-2 border-[#EFFACD] text-[#EFFACD] flex items-center justify-center font-bold">{surah.number}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-white">{surah.transliteration}</h3>
                                <p className="text-gray-300 text-xs">{surah.translation} • {surah.totalAyah} Ayat</p>
                            </div>
                        </div>
                        <span className="font-arabic text-xl text-[#EFFACD]" lang="ar">{surah.name}</span>
                    </button>
                ))}
            </div>
        )}

        {activeTab === 'SURAH' && (
            <div className="space-y-2">
                {filteredSurahs.map((surah) => {
                    const isCurrentGlobal = activeAudioSurah?.number === surah.number;
                    return (
                        <button 
                            key={surah.number} 
                            onClick={() => mode === 'TEXT' ? onSelectSurah(surah) : onPlaySurah(surah)}
                            className={`w-full backdrop-blur-sm border rounded-xl p-4 flex items-center justify-between transition-all text-left group
                                ${isCurrentGlobal 
                                    ? 'bg-[#EFFACD]/20 border-[#EFFACD] shadow-lg' 
                                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors
                                    ${isCurrentGlobal && isAudioPlaying ? 'bg-[#EFFACD] text-[#3B5998]' : 'border-[#EFFACD] text-[#EFFACD]'}
                                `}>
                                    {isCurrentGlobal && isAudioPlaying ? "..." : surah.number}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-white">{surah.transliteration}</h3>
                                    <p className="text-gray-300 text-xs">{surah.translation} • {surah.totalAyah} Ayat</p>
                                </div>
                            </div>
                            <span className="font-arabic text-xl text-[#EFFACD]" lang="ar">{surah.name}</span>
                        </button>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};

export default QuranView;
