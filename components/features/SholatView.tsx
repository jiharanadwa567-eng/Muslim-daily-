
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

    if (!navigator.geolocation) {
        setError("Browser tidak mendukung Geolocation.");
        setLoading(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const geoRes = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
                );
                const geoData = await geoRes.json();
                setLocationName(`${geoData.locality || geoData.city || "Lokasi Anda"}, ${geoData.principalSubdivision || ""}`);

                const date = new Date();
                // Set ke jam 00:00 agar timestamp stabil dan cache-friendly bagi Service Worker
                const stableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                const timestamp = Math.floor(stableDate.getTime() / 1000);
                
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
                    throw new Error("Gagal mengambil data jadwal sholat.");
                }
            } catch (err) {
                console.error(err);
                setError("Mode Offline: Menggunakan jadwal terakhir yang tersimpan.");
            } finally {
                setLoading(false);
            }
        },
        (err) => {
            setError("Gagal mendeteksi lokasi. Menggunakan data default.");
            setLoading(false);
        }
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
            <span>{gregorianDate}</span>
            <span className="font-arabic tracking-wide bg-[#EFFACD]/10 px-2 py-0.5 rounded-full border border-[#EFFACD]/20">
                {hijriDate}
            </span>
          </div>
          {error && (
            <div className="mt-3 bg-white/10 p-2 rounded-lg flex items-center justify-center gap-2 text-white/60 text-[10px] mx-4">
                <AlertCircle size={14} />
                <span>{error}</span>
            </div>
          )}
       </div>

       <div className="flex-1 overflow-y-auto space-y-3 pb-4 px-1">
          {prayerTimes.map((time, index) => {
              const isNext = index === nextPrayerIndex;
              return (
                  <div key={time.name} className={`rounded-xl p-4 flex items-center justify-between shadow-md transition-all duration-300 ${isNext ? 'bg-[#EFFACD] text-[#3B5998] border-2 border-white scale-[1.02]' : 'bg-white/10 text-[#EFFACD] border border-white/10'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-[#3B5998] animate-pulse' : 'bg-[#EFFACD]/50'}`}></div>
                        <span className="font-bold text-lg">{time.name}</span>
                    </div>
                    <span className="font-bold text-xl font-mono tracking-wider">{time.time}</span>
                  </div>
              );
          })}
       </div>
    </div>
  );
};

export default SholatView;
