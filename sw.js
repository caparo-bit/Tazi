const CACHE = 'tazi-v1';
const ASSETS = [
  '/Tazi/',
  '/Tazi/index.html',
  '/Tazi/manifest.json',
  '/Tazi/icon-192.png',
  '/Tazi/icon-512.png'   // si lo tienes
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
