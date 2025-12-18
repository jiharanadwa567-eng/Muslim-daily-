
import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Loader2, AlertCircle } from 'lucide-react';

const KiblatView: React.FC = () => {
  const [qiblaAngle, setQiblaAngle] = useState<number>(295); // Default Jakarta
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  // Koordinat Ka'bah
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  // Rumus Haversine/Bearing untuk menghitung sudut Kiblat
  const calculateQiblaAngle = (latitude: number, longitude: number) => {
    const phiK = (KAABA_LAT * Math.PI) / 180.0;
    const lambdaK = (KAABA_LNG * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;

    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
      );

    return Math.round(psi < 0 ? psi + 360 : psi);
  };

  // 1. Ambil Lokasi GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung browser ini.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const angle = calculateQiblaAngle(latitude, longitude);
        setQiblaAngle(angle);
        setLoadingLocation(false);
      },
      (err) => {
        console.error(err);
        setError("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // 2. Handle Device Orientation (Kompas)
  const handleOrientation = (event: DeviceOrientationEvent) => {
    let heading = 0;

    // iOS WebKit Support
    if ((event as any).webkitCompassHeading) {
      heading = (event as any).webkitCompassHeading;
    } 
    // Android / Standard Support
    else if (event.alpha !== null) {
      // Alpha adalah rotasi z-axis (0-360), tapi arahnya berlawanan jarum jam di Android standar tertentu
      // Namun untuk absolute orientation, kita perlu 'alpha' murni jika device mendukung absolute
      // Seringkali perlu kompensasi browser, tapi untuk basic implementation:
      heading = 360 - event.alpha;
    }

    setCompassHeading(heading);
  };

  // Setup Listener Kompas
  useEffect(() => {
    // Cek apakah perlu request permission (iOS 13+)
    const isIOS = typeof (DeviceOrientationEvent as any).requestPermission === 'function';
    
    if (!isIOS) {
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Tombol Request Permission untuk iOS 13+
  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError("Izin kompas ditolak.");
        }
      } catch (e) {
        setError("Gagal meminta izin kompas.");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-10 animate-fade-in-up px-4 text-center">
      
      {/* Header Info */}
      <div className="mb-8 space-y-2">
          <h2 className="text-[#EFFACD] text-4xl font-bold drop-shadow-lg">
            {loadingLocation ? <Loader2 className="animate-spin inline" /> : `${qiblaAngle}°`}
          </h2>
          <p className="text-[#EFFACD]/70 text-sm font-medium uppercase tracking-widest">
            Arah Kiblat dari Lokasi Anda
          </p>
          
          {/* Permission Button for iOS */}
          {!permissionGranted && !loadingLocation && (
              <button 
                onClick={requestCompassPermission}
                className="mt-4 px-4 py-2 bg-[#EFFACD]/20 border border-[#EFFACD] rounded-full text-[#EFFACD] text-xs hover:bg-[#EFFACD] hover:text-[#3B5998] transition-colors"
              >
                  Aktifkan Sensor Kompas
              </button>
          )}

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-300 text-xs mt-2 bg-red-900/20 p-2 rounded-lg">
                <AlertCircle size={14} /> {error}
            </div>
          )}
      </div>

      {/* Compass Container */}
      <div className="relative w-72 h-72 rounded-full bg-gradient-to-b from-[#EFFACD]/10 to-[#3B5998]/30 backdrop-blur-md border-4 border-[#EFFACD]/50 shadow-[0_0_50px_rgba(239,250,205,0.1)] flex items-center justify-center">
         
         {/* Decorative Rings */}
         <div className="absolute inset-2 rounded-full border border-white/10"></div>
         <div className="absolute inset-8 rounded-full border border-dashed border-white/20"></div>

         {/* The Rotating Compass Disk */}
         {/* Rotasi negatif dari heading agar 'Utara' di disk tetap menunjuk ke Utara bumi saat HP diputar */}
         <div 
            className="w-full h-full rounded-full relative transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `rotate(${-compassHeading}deg)` }}
         >
            {/* Cardinal Points */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl drop-shadow-md">N</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 font-bold text-sm">S</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-sm">W</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-sm">E</div>

            {/* Degree Markers (Simplified) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div 
                    key={deg}
                    className="absolute w-1 h-2 bg-white/30 top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    style={{ 
                        transform: `rotate(${deg}deg) translateY(10px)`, // Offset from edge
                        transformOrigin: '50% 134px' // Approx center radius
                    }}
                />
            ))}

            {/* Kaaba Icon (Target) */}
            {/* Ditempatkan pada sudut Kiblat relatif terhadap Utara (0) pada piringan */}
            <div 
                className="absolute flex flex-col items-center justify-center w-12"
                style={{ 
                    top: '50%', 
                    left: '50%', 
                    // Trik CSS: Translate ke tengah -> Putar ke sudut kiblat -> Geser keluar ke pinggir -> Putar balik icon agar tegak
                    transform: `translate(-50%, -50%) rotate(${qiblaAngle}deg) translate(0, -100px) rotate(${-qiblaAngle}deg)` 
                }}
            >
                {/* Kaaba Graphic */}
                <div className="relative group">
                    <div className="w-10 h-12 bg-black border border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)] relative z-10 flex flex-col items-center justify-center">
                        <div className="w-full h-[2px] bg-[#FFD700] mt-3"></div>
                        <div className="w-8 h-8 border border-[#FFD700]/30 mt-1 rounded-sm"></div>
                    </div>
                    {/* Arrow Pointer to Kaaba */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FFD700]"></div>
                    
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#FFD700] text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        KIBLAT
                    </div>
                </div>
            </div>

         </div>

         {/* Center Fixed Indicator (User's Phone Heading) */}
         {/* Ini adalah jarum penunjuk arah HP pengguna. Pengguna harus memutar HP sampai Jarum ini sejajar dengan Ka'bah */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
             <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#3B5998]/80 backdrop-blur-sm">
                <Compass size={32} className="text-[#EFFACD]" />
             </div>
             {/* Line pointer going up */}
             <div className="absolute -top-24 w-[2px] h-24 bg-gradient-to-t from-[#EFFACD] to-transparent"></div>
         </div>
      </div>

      <div className="mt-8 px-6 text-[#EFFACD]/60 text-xs leading-relaxed max-w-xs">
         <p>
            Putar perangkat Anda hingga garis lurus sejajar dengan ikon Ka'bah. 
            Jauhkan dari benda magnetik untuk akurasi terbaik.
         </p>
         {!permissionGranted && !loadingLocation && (
             <p className="mt-2 italic text-red-300">
                *Kompas mungkin tidak berputar di PC/Laptop atau jika izin sensor belum diberikan.
             </p>
         )}
      </div>
    </div>
  );
};

export default KiblatView;
