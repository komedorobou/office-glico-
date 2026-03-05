// 自己破壊型SW — 古いキャッシュを全削除して登録解除する
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll())
    .then(clients => { clients.forEach(c => c.navigate(c.url)); })
  );
});
