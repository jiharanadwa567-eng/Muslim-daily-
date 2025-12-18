import React from 'react';
import { DUA_CATEGORIES, DUA_ITEMS } from '../../constants';
import { ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';
import { DuaItem } from '../../types';

interface DoaViewProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  selectedDua: DuaItem | null;
  onSelectDua: (dua: DuaItem | null) => void;
}

const DoaView: React.FC<DoaViewProps> = ({ 
  selectedCategory, 
  onSelectCategory, 
  selectedDua, 
  onSelectDua 
}) => {

  // Filter items based on category
  const categoryItems = selectedCategory 
    ? DUA_ITEMS.filter(item => item.categoryId === selectedCategory) 
    : [];

  const categoryTitle = DUA_CATEGORIES.find(c => c.id === selectedCategory)?.title;

  // VIEW 3: Detail Doa
  if (selectedDua) {
    return (
      <div className="w-full flex flex-col h-full animate-fade-in-up">
         <button 
           onClick={() => onSelectDua(null)}
           className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors self-start"
         >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Kembali ke Daftar</span>
         </button>

         <div className="bg-[#EFFACD] text-[#3B5998] rounded-xl p-6 shadow-xl flex-1 overflow-y-auto">
             <h2 className="text-xl font-bold text-center mb-6 border-b-2 border-[#3B5998]/20 pb-4">
               {selectedDua.title}
             </h2>
             
             <div className="space-y-6 text-center">
                 <p className="font-arabic text-3xl leading-loose font-bold" dir="rtl">
                    {selectedDua.arabic}
                 </p>
                 
                 <div className="bg-white/50 p-4 rounded-lg">
                    <p className="text-[#3B5998] italic font-medium mb-2">
                        "{selectedDua.latin}"
                    </p>
                 </div>
                 
                 <p className="text-sm leading-relaxed opacity-90">
                    Artinya: {selectedDua.translation}
                 </p>
             </div>
         </div>
      </div>
    );
  }

  // VIEW 2: Daftar Doa dalam Kategori
  if (selectedCategory) {
    return (
      <div className="w-full flex flex-col h-full animate-fade-in-up">
         <div className="flex items-center gap-3 mb-4">
            <button 
                onClick={() => onSelectCategory(null)}
                className="bg-[#EFFACD] p-2 rounded-full text-[#3B5998] hover:scale-105 transition-transform"
            >
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-[#EFFACD] text-lg font-bold truncate">{categoryTitle}</h2>
         </div>

         <div className="flex-1 overflow-y-auto space-y-3 pb-4">
            {categoryItems.length > 0 ? (
                categoryItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => onSelectDua(item)}
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center justify-between group hover:bg-white/20 transition-all text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-[#EFFACD]/20 p-2 rounded-lg text-[#EFFACD]">
                                <BookOpen size={20} />
                            </div>
                            <span className="text-white font-medium text-sm line-clamp-2">{item.title}</span>
                        </div>
                        <ChevronRight className="text-white/50 group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                ))
            ) : (
                <div className="text-center text-white/50 mt-10 p-4 border border-white/10 rounded-xl">
                    Belum ada data doa untuk kategori ini.
                </div>
            )}
         </div>
      </div>
    );
  }

  // VIEW 1: Daftar Kategori (Default)
  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-auto pb-4">
       {DUA_CATEGORIES.map((cat) => (
           <button 
             key={cat.id}
             onClick={() => onSelectCategory(cat.id)}
             className="w-full bg-[#EFFACD] p-6 rounded-xl shadow-lg flex items-center justify-between group active:scale-95 transition-all"
           >
              <span className="text-[#3B5998] font-bold text-lg text-left">{cat.title}</span>
              <ChevronRight className="text-[#3B5998] opacity-50 group-hover:translate-x-1 transition-transform" />
           </button>
       ))}
    </div>
  );
};

export default DoaView;