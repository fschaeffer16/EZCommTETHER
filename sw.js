// Service worker for Evan's Talker — makes the installed home-screen app work
// offline. index.html registers this file on load.
//
// Strategy: network-first for the page and its assets so the latest Vercel
// deploy always wins when there's a signal, with a cached copy served as a
// fallback so the app still opens with no internet. The emergency endpoint
// (/api/) is never cached — sending an alert must always hit the live network.

const CACHE = 'evans-talker-v1';

// App shell to pre-cache so the very first launch works offline.
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon180.png',
  'icon192.png',
  'icon512.png',
  'icon512maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
      .catch(() => {}) // never let a single missing asset block installation
  );
});

self.addEventListener('activate', (event) => {
  // Remove caches left over from older versions.
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // let POSTs (the SOS alert) pass straight through

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't touch cross-origin requests
  if (url.pathname.startsWith('/api/')) return;    // emergency service must reach the network

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Save a fresh copy for offline use.
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        // Offline: serve the cached response, falling back to the app shell.
        caches.match(req).then((cached) => cached || caches.match('index.html'))
      )
  );
});
