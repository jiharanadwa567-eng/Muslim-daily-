
const CACHE_NAME = 'muslim-daily-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './index.tsx',
  './manifest.json',
  './metadata.json',
  'https://cdn.tailwindcss.com'
];

// Origin eksternal yang akan di-cache secara dinamis setelah akses pertama
const ALLOWED_ORIGINS = [
  'esm.sh',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'api.alquran.cloud',
  'api.aladhan.com',
  'api.bigdatacloud.net',
  'download.quranicaudio.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching core assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Tentukan apakah request ini layak di-cache
  const shouldCache = STATIC_ASSETS.includes(event.request.url) || 
                      ALLOWED_ORIGINS.some(origin => url.hostname.includes(origin)) ||
                      url.pathname.endsWith('.tsx') || 
                      url.pathname.endsWith('.ts') ||
                      url.pathname.endsWith('.js');

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Strategi Stale-While-Revalidate: Ambil dari cache, update dari network
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && shouldCache) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Jika benar-benar offline dan tidak ada di cache
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});
