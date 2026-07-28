const CACHE_NAME = 'attendance-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/registry.html',
  '/script/components/navbar.js',
  '/script/registry.js',
  'https://cdn.tailwindcss.com?plugins=forms,container-queries'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event (Offline support)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});