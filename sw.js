/* Cebimdeki Türkiye — offline service worker */
const CACHE = 'ct-v11b';
const PHOTO_PREFIX = 'ct-photos-';   // per-province packs, created by the page
const RUNTIME = 'ct-runtime';        // fonts etc.
const ASSETS = ['./', './index.html', './data.js', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE && k !== RUNTIME && !k.startsWith(PHOTO_PREFIX)).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  return fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // HTML + data: network first so updates arrive, cache fallback offline
  if (sameOrigin && (req.mode === 'navigate' || /\/(index\.html|data\.js)?$/.test(url.pathname) || url.pathname.endsWith('data.js'))) {
    e.respondWith(networkFirst(req));
    return;
  }
  // Wikimedia photos: serve from province packs if downloaded; otherwise network (not auto-cached)
  if (url.hostname === 'upload.wikimedia.org') {
    e.respondWith(caches.match(req.url).then((r) => r || fetch(req)));
    return;
  }
  // Google Fonts: stale-while-revalidate in runtime cache (opaque allowed)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(RUNTIME).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // other same-origin assets: cache first
  if (sameOrigin) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    })));
  }
});
