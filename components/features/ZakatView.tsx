
import React, { useState, useMemo } from 'react';
import { Calculator, Coins, TrendingUp, Users, Info, AlertCircle, CheckCircle2, Wallet } from 'lucide-react';

type ZakatType = 'MAAL' | 'FITRAH' | 'PROFESI';

const ZakatView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ZakatType>('MAAL');
  
  // Settings
  const [goldPrice, setGoldPrice] = useState<number>(1200000); // Harga emas per gram (IDR)
  const [ricePrice, setRicePrice] = useState<number>(15000); // Harga beras per kg (IDR)
  
  // Zakat Maal State
  const [savings, setSavings] = useState<number>(0);
  const [goldWeight, setGoldWeight] = useState<number>(0);
  const [otherAssets, setOtherAssets] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);

  // Zakat Fitrah State
  const [peopleCount, setPeopleCount] = useState<number>(1);

  // Zakat Profesi State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);

  // Calculations
  const results = useMemo(() => {
    // Maal
    const nisabMaalValue = 85 * goldPrice;
    const totalMaalWealth = savings + (goldWeight * goldPrice) + otherAssets - debts;
    const isMaalObligatory = totalMaalWealth >= nisabMaalValue;
    const maalZakat = isMaalObligatory ? totalMaalWealth * 0.025 : 0;

    // Fitrah
    const fitrahRice = peopleCount * 2.5; // kg
    const fitrahMoney = peopleCount * 3.5 * ricePrice; // Liter equivalent simplified to kg for logic

    // Profesi
    const nisabProfesiValue = 522 * ricePrice; // Beras 522kg per bulan
    const totalIncome = monthlyIncome + bonus;
    const isProfesiObligatory = totalIncome >= nisabProfesiValue;
    const profesiZakat = isProfesiObligatory ? totalIncome * 0.025 : 0;

    return {
      nisabMaalValue,
      totalMaalWealth,
      maalZakat,
      isMaalObligatory,
      fitrahRice,
      fitrahMoney,
      nisabProfesiValue,
      profesiZakat,
      isProfesiObligatory
    };
  }, [goldPrice, ricePrice, savings, goldWeight, otherAssets, debts, peopleCount, monthlyIncome, bonus]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const InputRow = ({ label, value, onChange, icon: Icon, prefix = "Rp" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold uppercase tracking-wider text-[#EFFACD]/60 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B5998]/50">
          {Icon ? <Icon size={16} /> : <span className="text-xs font-bold">{prefix}</span>}
        </div>
        <input 
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="0"
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white font-bold focus:outline-none focus:border-[#EFFACD] transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col h-full animate-fade-in-up">
      {/* Tab Switcher */}
      <div className="flex bg-white/5 p-1 rounded-2xl mb-6 shrink-0 border border-white/10">
        {(['MAAL', 'FITRAH', 'PROFESI'] as ZakatType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === type ? 'bg-[#EFFACD] text-[#3B5998] shadow-lg' : 'text-[#EFFACD]/50 hover:text-[#EFFACD]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 pb-10 space-y-6 custom-scrollbar">
        {/* Global Config Section */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 grid grid-cols-2 gap-4">
            <InputRow 
                label="Harga Emas/gr" 
                value={goldPrice} 
                onChange={setGoldPrice}
                icon={TrendingUp}
            />
            <InputRow 
                label="Harga Beras/kg" 
                value={ricePrice} 
                onChange={setRicePrice}
                icon={Coins}
            />
        </div>

        {/* Dynamic Calculation Content */}
        <div className="animate-slide-up space-y-4">
          {activeTab === 'MAAL' && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <InputRow label="Tabungan & Piutang" value={savings} onChange={setSavings} />
                <div className="grid grid-cols-2 gap-4">
                  <InputRow label="Emas (Gram)" value={goldWeight} onChange={setGoldWeight} prefix="gr" />
                  <InputRow label="Aset Lainnya" value={otherAssets} onChange={setOtherAssets} />
                </div>
                <InputRow label="Hutang Jatuh Tempo" value={debts} onChange={setDebts} />
              </div>

              <div className={`rounded-3xl p-6 shadow-2xl transition-all duration-500 border-2 ${results.isMaalObligatory ? 'bg-[#EFFACD] text-[#3B5998] border-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-xs uppercase tracking-widest opacity-60">Hasil Kalkulasi Maal</h3>
                    {results.isMaalObligatory ? <CheckCircle2 className="text-emerald-600" size={24} /> : <AlertCircle className="opacity-40" size={24} />}
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <span className="text-[10px] font-bold uppercase opacity-60">Nisab (85gr Emas)</span>
                    <span className={`text-lg font-black ${results.isMaalObligatory ? 'text-[#3B5998]' : 'text-white'}`}>{formatCurrency(results.nisabMaalValue)}</span>
                </div>
                <div className="h-px w-full bg-current opacity-10 mb-4"></div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase opacity-60">Zakat Wajib Dibayar (2.5%)</span>
                    <span className={`text-3xl font-black ${results.isMaalObligatory ? 'text-[#3B5998]' : 'text-white/20'}`}>{formatCurrency(results.maalZakat)}</span>
                </div>
                {!results.isMaalObligatory && (
                  <p className="mt-4 text-[10px] italic leading-relaxed text-white/40">Harta belum mencapai Nisab. Tidak wajib zakat maal, namun disunnahkan bersedekah.</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'FITRAH' && (
            <>
              <InputRow label="Jumlah Jiwa" value={peopleCount} onChange={setPeopleCount} icon={Users} prefix="Σ" />
              
              <div className="bg-[#EFFACD] text-[#3B5998] rounded-3xl p-6 shadow-2xl border-2 border-white">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-xs uppercase tracking-widest opacity-60">Zakat Fitrah</h3>
                    <CheckCircle2 className="text-emerald-600" size={24} />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase opacity-60 mb-1">Beras / Gandum</span>
                    <span className="text-2xl font-black">{results.fitrahRice} <small className="text-sm font-bold">Kg</small></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase opacity-60 mb-1">Uang Tunai (Setara)</span>
                    <span className="text-2xl font-black">{formatCurrency(results.fitrahMoney)}</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-white/30 rounded-xl text-[10px] leading-relaxed flex items-start gap-2">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  <span>Zakat Fitrah adalah 2.5 kg atau 3.5 liter beras per jiwa yang wajib dikeluarkan setahun sekali sebelum Sholat Idul Fitri.</span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'PROFESI' && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <InputRow label="Penghasilan Per Bulan" value={monthlyIncome} onChange={setMonthlyIncome} icon={Wallet} />
                <InputRow label="Bonus / Pendapatan Lain" value={bonus} onChange={setBonus} icon={Coins} />
              </div>

              <div className={`rounded-3xl p-6 shadow-2xl transition-all duration-500 border-2 ${results.isProfesiObligatory ? 'bg-[#EFFACD] text-[#3B5998] border-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-xs uppercase tracking-widest opacity-60">Zakat Profesi</h3>
                    {results.isProfesiObligatory ? <CheckCircle2 className="text-emerald-600" size={24} /> : <AlertCircle className="opacity-40" size={24} />}
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <span className="text-[10px] font-bold uppercase opacity-60">Nisab Bulanan (522kg Beras)</span>
                    <span className={`text-lg font-black ${results.isProfesiObligatory ? 'text-[#3B5998]' : 'text-white'}`}>{formatCurrency(results.nisabProfesiValue)}</span>
                </div>
                <div className="h-px w-full bg-current opacity-10 mb-4"></div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase opacity-60">Zakat Profesi (2.5%)</span>
                    <span className={`text-3xl font-black ${results.isProfesiObligatory ? 'text-[#3B5998]' : 'text-white/20'}`}>{formatCurrency(results.profesiZakat)}</span>
                </div>
                {!results.isProfesiObligatory && (
                  <p className="mt-4 text-[10px] italic leading-relaxed text-white/40">Penghasilan belum mencapai Nisab bulanan sesuai fatwa MUI.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
          <Info className="text-[#EFFACD] shrink-0" size={18} />
          <p className="text-[10px] text-[#EFFACD]/70 leading-relaxed">
            Perhitungan ini bersifat estimasi berdasarkan data yang dimasukkan. Untuk kepastian hukum syariah, disarankan berkonsultasi dengan lembaga amil zakat resmi seperti BAZNAS atau LAZ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZakatView;
