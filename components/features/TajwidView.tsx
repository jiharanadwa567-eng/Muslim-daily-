
import React from 'react';
import { TAJWID_RULES, TAJWID_CATEGORIES } from '../../constants';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface TajwidViewProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const TajwidView: React.FC<TajwidViewProps> = ({ selectedCategory, onSelectCategory }) => {
  
  // VIEW 2: Detail Rules in Category
  if (selectedCategory) {
    const categoryInfo = TAJWID_CATEGORIES.find(c => c.id === selectedCategory);
    const rules = TAJWID_RULES.filter(rule => rule.categoryId === selectedCategory);

    return (
        <div className="w-full flex flex-col h-full animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
                <button 
                    onClick={() => onSelectCategory(null)}
                    className="bg-[#EFFACD] p-2 rounded-full text-[#3B5998] hover:scale-105 transition-transform"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                     <h2 className="text-[#EFFACD] text-lg font-bold truncate">{categoryInfo?.title}</h2>
                     <p className="text-[#EFFACD]/70 text-xs truncate">{categoryInfo?.description}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {rules.map((item) => (
                    <div key={item.id} className="bg-[#EFFACD] rounded-xl p-5 shadow-lg text-[#3B5998]">
                        <div className="border-b border-[#3B5998]/20 pb-2 mb-2">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p className="leading-relaxed"><span className="font-semibold">Hukum:</span> {item.rule}</p>
                            <div className="bg-white/50 p-2 rounded-lg mt-3 flex flex-col gap-1">
                                <span className="text-xs opacity-70 uppercase tracking-wider">Contoh Ayat</span>
                                <span className="font-arabic text-2xl font-bold text-center py-2">{item.example}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {rules.length === 0 && (
                    <div className="text-center text-white/50 p-4">
                        Data tajwid belum tersedia.
                    </div>
                )}
            </div>
        </div>
    );
  }

  // VIEW 1: Categories List
  return (
    <div className="w-full flex flex-col h-full overflow-y-auto gap-4 pb-4">
      {TAJWID_CATEGORIES.map((cat) => (
        <button 
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="bg-[#EFFACD] rounded-xl p-6 shadow-lg text-[#3B5998] flex items-center justify-between group active:scale-95 transition-all text-left"
        >
            <div className="flex-1 mr-4">
                <h3 className="font-bold text-xl mb-1">{cat.title}</h3>
                <p className="text-sm opacity-80 leading-tight">{cat.description}</p>
            </div>
            <div className="bg-[#3B5998]/10 p-2 rounded-full">
                <ChevronRight className="text-[#3B5998] group-hover:translate-x-1 transition-transform" />
            </div>
        </button>
      ))}
    </div>
  );
};

export default TajwidView;
