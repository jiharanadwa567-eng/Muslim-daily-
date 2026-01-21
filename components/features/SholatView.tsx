
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Loader2, RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import { PRAYER_TIMES as DEFAULT_TIMES } from '../../constants';
import { PrayerTime } from '../../types';

const SholatView: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(() => {
    const saved = localStorage.getItem('last_known_prayer_times');
    return saved ? JSON.parse(saved) : DEFAULT_TIMES;
  });
  const [locationName, setLocationName] = useState<string>(() => {
    return localStorage.getItem('last_known_location') || "Jakarta, Indonesia (Default)";
  });
  const [hijriDate, setHijriDate] = useState<string>("1446 H");
  const [gregorianDate, setGregorianDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayerIndex, setNextPrayerIndex] = useState<number>(-1);

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
        window.removeEventListener('online', handleStatus);
        window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const processPrayerData = (timings: any) => {
    const sunriseParts = timings.Sunrise.split(':');
    const sunriseDate = new Date();
    sunriseDate.setHours(parseInt(sunriseParts[0]), parseInt(sunriseParts[1]) + 25);
    const dhuhaTime = `${sunriseDate.getHours().toString().padStart(2, '0')}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;

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
    localStorage.setItem('last_known_prayer_times', JSON.stringify(finalTimes));
    determineNextPrayer(finalTimes);
  };

  const determineNextPrayer = (times: PrayerTime[]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let foundNext = false;
    
    for (let i = 0; i < times.length; i++) {
        const [h, m] = times[i].time.split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        if (prayerMinutes > currentMinutes) {
            setNextPrayerIndex(i);
            foundNext = true;
            break;
        }
    }
    if (!foundNext) setNextPrayerIndex(0);
  };

  const fetchLocationAndData = () => {
    setLoading(true);
    setError(null);

    if (!navigator.onLine) {
        setError("Anda sedang offline. Menampilkan data terakhir yang tersimpan.");
        setLoading(false);
        determineNextPrayer(prayerTimes);
        return;
    }

    if (!navigator.geolocation) {
        setError("Browser tidak mendukung Geolocation.");
        setLoading(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Fetch nama lokasi
                const geoController = new AbortController();
                const timeoutId = setTimeout(() => geoController.abort(), 5000);
                
                const geoRes = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`,
                    { signal: geoController.signal }
                ).catch(() => null);
                
                clearTimeout(timeoutId);

                if (geoRes) {
                    const geoData = await geoRes.json();
                    const city = geoData.locality || geoData.city || "";
                    const region = geoData.principalSubdivision || "";
                    const fullLoc = `${city}, ${region}`;
                    setLocationName(fullLoc);
                    localStorage.setItem('last_known_location', fullLoc);
                }

                // Fetch jadwal sholat
                const date = new Date();
                const timestamp = Math.floor(date.getTime() / 1000);
                const aladhanRes = await fetch(
                    `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=20`
                );
                
                const aladhanData = await aladhanRes.json();
                if (aladhanData.code === 200) {
                    processPrayerData(aladhanData.data.timings);
                    const hijri = aladhanData.data.date.hijri;
                    setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
                    setGregorianDate(aladhanData.data.date.readable);
                } else {
                    throw new Error("Gagal mengambil data jadwal.");
                }
            } catch (err) {
                console.error("API Error:", err);
                setError("Gagal menyinkronkan jadwal. Menggunakan data terakhir.");
                determineNextPrayer(prayerTimes);
            } finally {
                setLoading(false);
            }
        },
        (err) => {
            console.error(err);
            setError("Lokasi tidak terdeteksi. Gunakan jadwal standar.");
            setLoading(false);
            determineNextPrayer(prayerTimes);
        },
        { timeout: 10000 }
    );
  };

  useEffect(() => {
    const today = new Date();
    setGregorianDate(today.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    fetchLocationAndData();
    const interval = setInterval(() => {
        if(prayerTimes.length > 0) determineNextPrayer(prayerTimes);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col h-full animate-fade-in-up">
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

          {isOffline && (
            <div className="mt-3 bg-orange-500/20 border border-orange-500/50 p-2 rounded-lg flex items-center justify-center gap-2 text-orange-200 text-[10px] mx-4 animate-pulse">
                <WifiOff size={14} />
                <span>Mode Offline Aktif</span>
            </div>
          )}

          {error && !isOffline && (
            <div className="mt-3 bg-white/10 border border-white/20 p-2 rounded-lg flex items-center justify-center gap-2 text-[#EFFACD] text-[10px] mx-4">
                <AlertCircle size={14} />
                <span>{error}</span>
                {!loading && <button onClick={fetchLocationAndData} className="ml-2 underline text-[#EFFACD]">Refresh</button>}
            </div>
          )}
       </div>

       <div className="flex-1 overflow-y-auto space-y-3 pb-4 px-1 custom-scrollbar">
          {loading && prayerTimes === DEFAULT_TIMES ? (
             <div className="flex flex-col items-center justify-center h-40 text-[#EFFACD]/50 gap-2">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-xs">Menyelaraskan data...</p>
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

       {!loading && !isOffline && (
           <div className="flex justify-center mt-2">
               <button 
                onClick={fetchLocationAndData}
                className="flex items-center gap-2 text-[#EFFACD]/50 text-xs hover:text-[#EFFACD] transition-colors"
               >
                   <RefreshCw size={12} />
                   Update Otomatis
               </button>
           </div>
       )}
    </div>
  );
};

export default SholatView;
