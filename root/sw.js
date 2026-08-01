const CACHE_NAME = "hajar-app-v1";

const ASSETS_TO_CACHE = [
  "/",

  // HTML Files
  "/dashboard.html",
  "/login-page.html",
  "/management.html",
  "/registry.html",
  "/students-enroll.html",
  "/students-list.html",

  // Manifest
  "/manifest.json",

  // Icons
  "/images/icon-192.png",
  "/images/icon-512.png",

  // JavaScript Files
  "/script/registry.js",
  "/script/students-enroll.js",
  "/script/students-list.js",
  "/script/components/navbar.js"
];

// Install Event
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker Installed");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching App Files...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker Activated");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Removing Old Cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      // Return cached file if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((networkResponse) => {

          // Save new request in cache
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });

        })
        .catch(() => {
          console.log("❌ Offline:", event.request.url);
        });

    })
  );
});