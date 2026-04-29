const CACHE = 'compass-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.anthropic.com') || 
      e.request.url.includes('workers.dev')) return;
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response('Please reconnect to use Compass Survey', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
