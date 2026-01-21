
const STATIC_CACHE = 'muslim-daily-static-v5';
const DATA_CACHE = 'muslim-daily-data-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './index.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdn-icons-png.flaticon.com/512/2951/2951167.png'
];

// Tahap Install: Simpan aset statis dasar
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('Pre-caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Tahap Aktivasi: Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DATA_CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategi Fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategi Khusus untuk API (Al-Quran & Jadwal Sholat) - Cache First then Network
  if (url.hostname.includes('api.alquran.cloud') || url.hostname.includes('api.aladhan.com')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(DATA_CACHE).then((cache) => {
              cache.put(request, cacheCopy);
            });
          }
          return networkResponse;
        }).catch(() => {
            // Jika offline dan tidak ada di cache sama sekali
            return null;
        });
      })
    );
    return;
  }

  // Strategi Stale-While-Revalidate untuk aset lainnya
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback untuk navigasi halaman jika offline total
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
      return cachedResponse || fetchPromise;
    })
  );
});
