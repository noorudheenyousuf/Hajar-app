const CACHE_NAME = 'hajar-pwa-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './dashboard.html',
  './login-page.html',
  './management.html',
  './registry.html',
  './students-list.html',
  './students-enroll.html',
  './images/icon-192.png',
  './images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Put a copy in cache for future requests
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(request, response.clone()); } catch (e) {}
          return response;
        });
      }).catch(() => {
        // fallback to cached root for navigation requests
        if (request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
