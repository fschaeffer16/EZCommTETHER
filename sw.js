// Service worker for Evan's Talker — makes the installed home-screen app work
// offline. index.html registers this file on load.
//
// Strategy: network-first for the page and its assets so the latest Vercel
// deploy always wins when there's a signal, with a cached copy served as a
// fallback so the app still opens with no internet. The emergency endpoint
// (/api/) is never cached — sending an alert must always hit the live network.

const CACHE = 'evans-talker-v4';

// Spoken audio is kept separately and never expires: the same words in the same
// voice are the same sound forever, so a phrase Evan has already used plays back
// instantly and still works with no signal at all. The URL carries a voice tag,
// so changing the voice or its speed simply asks for different files.
const VOICE_CACHE = 'evans-voice-v1';
const VOICE_MAX = 500;   // a few hundred short clips; well under any storage limit

async function speakCacheFirst(req) {
  const cache = await caches.open(VOICE_CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;                       // no network at all — this is the win
  const res = await fetch(req);
  if (res && res.ok) {
    cache.put(req, res.clone()).then(() => trimVoiceCache(cache)).catch(() => {});
  }
  return res;
}

// Oldest first — caches.keys() preserves insertion order.
async function trimVoiceCache(cache) {
  try {
    const keys = await cache.keys();
    if (keys.length <= VOICE_MAX) return;
    await Promise.all(keys.slice(0, keys.length - VOICE_MAX).map((k) => cache.delete(k)));
  } catch (e) {}
}

// App shell to pre-cache so the very first launch works offline.
const CORE = [
  './',
  'index.html',
  'demo.html',
  'manifest.webmanifest',
  'manifest-template.webmanifest',
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
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== VOICE_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // let POSTs (the SOS alert) pass straight through

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't touch cross-origin requests
  // The voice is the one /api/ route worth keeping a copy of — see above.
  if (url.pathname === '/api/speak' && url.searchParams.get('text')) {
    event.respondWith(speakCacheFirst(req));
    return;
  }
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
