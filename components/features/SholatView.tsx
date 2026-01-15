
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { PRAYER_TIMES as DEFAULT_TIMES } from '../../constants';
import { PrayerTime } from '../../types';

const SholatView: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(DEFAULT_TIMES);
  const [locationName, setLocationName] = useState<string>("Jakarta, Indonesia (Default)");
  const [hijriDate, setHijriDate] = useState<string>("1446 H");
  const [gregorianDate, setGregorianDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayerIndex, setNextPrayerIndex] = useState<number>(-1);

  // Fungsi untuk memproses data dari API Aladhan
  const processPrayerData = (timings: any) => {
    // Mapping API response ke struktur aplikasi
    // Menggunakan urutan standar
    const mapping = [
      { name: "Imsak", time: timings.Imsak },
      { name: "Subuh", time: timings.Fajr },
      { name: "Terbit", time: timings.Sunrise },
      { name: "Dhuha", time: timings.Dhuhr }, // Trik: Aladhan tidak selalu kirim Dhuha, kita bisa estimasi atau skip. Disini kita pakai Dhuhr - 20 menit atau skip.
      // KOREKSI: API Aladhan standar tidak mengirim "Dhuha". 
      // Kita ganti Dhuha dengan kalkulasi manual (Terbit + 20 menit) atau hapus.
      // Untuk konsistensi UI, kita ganti logic Dhuha = Sunrise + 25 menit.
      { name: "Dzuhur", time: timings.Dhuhr },
      { name: "Ashar", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isya", time: timings.Isha },
    ];

    // Hitung manual Dhuha (Sunrise + 25 menit)
    const sunriseParts = timings.Sunrise.split(':');
    const sunriseDate = new Date();
    sunriseDate.setHours(parseInt(sunriseParts[0]), parseInt(sunriseParts[1]) + 25);
    const dhuhaTime = `${sunriseDate.getHours().toString().padStart(2, '0')}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;

    // Reconstruct array
    const finalTimes: PrayerTime[] = [
        { name: "Imsak", time: timings.Imsak },
        { name: "Subuh", time: timings.Fajr },
        { name: "Terbit", time: timings.Sunrise },
        { name: "Dhuha", time: dhuhaTime },
        { name: "Dzuhur", time: timings.Dhuhr },
        { name: "Ashar", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isya", time: timings.Isha },
    ];
    
    setPrayerTimes(finalTimes);
    determineNextPrayer(finalTimes);
  };

  // Menentukan sholat apa berikutnya
  const determineNextPrayer = (times: PrayerTime[]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    let foundNext = false;
    
    for (let i = 0; i < times.length; i++) {
        const [h, m] = times[i].time.split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        
        // Kita skip "Terbit" dan "Dhuha" untuk highlight sholat wajib (opsional, tapi biasanya user ingin tahu sholat wajib)
        // Tapi di kode ini kita highlight semuanya sesuai urutan waktu
        if (prayerMinutes > currentMinutes) {
            setNextPrayerIndex(i);
            foundNext = true;
            break;
        }
    }

    // Jika tidak ada yang lebih besar (lewat Isya), maka next adalah Imsak besok (index 0)
    if (!foundNext) {
        setNextPrayerIndex(0);
    }
  };

  const fetchLocationAndData = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
        setError("Browser tidak mendukung Geolocation.");
        setLoading(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                // 1. Get Reverse Geocoding (Nama Kota)
                // Menggunakan API gratis BigDataCloud (No API Key needed for client side basic usage)
                const geoRes = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
                );
                const geoData = await geoRes.json();
                
                const city = geoData.locality || geoData.city || "";
                const region = geoData.principalSubdivision || "";
                setLocationName(`${city}, ${region}`);

                // 2. Get Prayer Times (Aladhan API)
                // Method 20 = Kemenag RI
                const date = new Date();
                const timestamp = Math.floor(date.getTime() / 1000);
                const aladhanRes = await fetch(
                    `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=20`
                );
                const aladhanData = await aladhanRes.json();

                if (aladhanData.code === 200) {
                    processPrayerData(aladhanData.data.timings);
                    
                    // Set Tanggal
                    const hijri = aladhanData.data.date.hijri;
                    setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
                    setGregorianDate(aladhanData.data.date.readable);
                } else {
                    throw new Error("Gagal mengambil data jadwal sholat.");
                }

            } catch (err) {
                console.error(err);
                setError("Gagal memuat data online. Menggunakan data default.");
                // Fallback ke default sudah di set di initial state
            } finally {
                setLoading(false);
            }
        },
        (err) => {
            console.error(err);
            let msg = "Gagal mendeteksi lokasi.";
            if (err.code === 1) msg = "Izin lokasi ditolak. Aktifkan GPS untuk jadwal akurat.";
            else if (err.code === 2) msg = "Lokasi tidak tersedia.";
            else if (err.code === 3) msg = "Waktu permintaan habis.";
            
            setError(msg);
            setLoading(false);
        }
    );
  };

  useEffect(() => {
    // Set tanggal Masehi awal
    const today = new Date();
    setGregorianDate(today.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    
    fetchLocationAndData();
    
    // Interval check next prayer every minute
    const interval = setInterval(() => {
        if(prayerTimes.length > 0) determineNextPrayer(prayerTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col h-full animate-fade-in-up">
       {/* Header Informasi Lokasi & Tanggal */}
       <div className="text-center mb-6 text-[#EFFACD]">
          <div className="flex items-center justify-center gap-2 mb-2">
             <MapPin size={18} className={loading ? "animate-bounce" : ""} />
             <span className="font-medium text-lg leading-tight">{locationName}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 opacity-80 text-xs">
            <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{gregorianDate}</span>
            </div>
            <span className="font-arabic tracking-wide bg-[#EFFACD]/10 px-2 py-0.5 rounded-full border border-[#EFFACD]/20">
                {hijriDate}
            </span>
          </div>

          {error && (
            <div className="mt-3 bg-red-500/20 border border-red-500/50 p-2 rounded-lg flex items-center justify-center gap-2 text-red-200 text-xs mx-4">
                <AlertCircle size={14} />
                <span>{error}</span>
                <button onClick={fetchLocationAndData} className="ml-2 underline hover:text-white">Coba Lagi</button>
            </div>
          )}
       </div>

       {/* List Jadwal */}
       <div className="flex-1 overflow-y-auto space-y-3 pb-4 px-1">
          {loading && prayerTimes === DEFAULT_TIMES ? (
             <div className="flex flex-col items-center justify-center h-40 text-[#EFFACD]/50 gap-2">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-xs">Menyelaraskan lokasi...</p>
             </div>
          ) : (
             prayerTimes.map((time, index) => {
                 const isNext = index === nextPrayerIndex;
                 return (
                     <div 
                        key={time.name} 
                        className={`rounded-xl p-4 flex items-center justify-between shadow-md transition-all duration-300 ${
                            isNext 
                                ? 'bg-[#EFFACD] text-[#3B5998] border-2 border-white scale-[1.02] shadow-xl' 
                                : 'bg-white/10 backdrop-blur-md text-[#EFFACD] border border-white/10 hover:bg-white/20'
                        }`}
                     >
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-[#3B5998] animate-pulse' : 'bg-[#EFFACD]/50'}`}></div>
                            <span className="font-bold text-lg">{time.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-xl font-mono tracking-wider">{time.time}</span>
                        </div>
                     </div>
                 );
             })
          )}
       </div>

       {/* Refresh Button Manual */}
       {!loading && (
           <div className="flex justify-center mt-2">
               <button 
                onClick={fetchLocationAndData}
                className="flex items-center gap-2 text-[#EFFACD]/50 text-xs hover:text-[#EFFACD] transition-colors"
               >
                   <RefreshCw size={12} />
                   Update Lokasi
               </button>
           </div>
       )}
    </div>
  );
};

export default SholatView;
