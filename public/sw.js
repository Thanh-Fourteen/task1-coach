'use strict';
// Sinh tự động bởi tool/gen_sw.py — đừng sửa tay.
const CACHE = 'task1-coach-742782597cdd';
const ASSETS = ["./","./assets/AssetManifest.bin","./assets/AssetManifest.bin.json","./assets/FontManifest.json","./assets/NOTICES","./assets/assets/data/exercises.json","./assets/assets/data/grammar.json","./assets/assets/data/paraphrase.json","./assets/assets/data/prompts.json","./assets/assets/data/samples.json","./assets/assets/data/templates.json","./assets/assets/data/vocabulary.json","./assets/assets/fonts/BeVietnamPro-Bold.ttf","./assets/assets/fonts/BeVietnamPro-Medium.ttf","./assets/assets/fonts/BeVietnamPro-Regular.ttf","./assets/assets/fonts/BeVietnamPro-SemiBold.ttf","./assets/assets/fonts/Literata-Variable.ttf","./assets/fonts/MaterialIcons-Regular.otf","./assets/shaders/ink_sparkle.frag","./assets/shaders/stretch_effect.frag","./canvaskit/canvaskit.js","./canvaskit/canvaskit.wasm","./canvaskit/chromium/canvaskit.js","./canvaskit/chromium/canvaskit.wasm","./canvaskit/skwasm.js","./canvaskit/skwasm.wasm","./canvaskit/skwasm_heavy.js","./canvaskit/skwasm_heavy.wasm","./canvaskit/wimp.js","./canvaskit/wimp.wasm","./favicon.png","./flutter.js","./flutter_bootstrap.js","./icons/Icon-192.png","./icons/Icon-512.png","./icons/Icon-maskable-192.png","./icons/Icon-maskable-512.png","./icons/apple-touch-icon.png","./index.html","./main.dart.js","./manifest.json","./version.json"];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // Tải từng phần để một file lỗi không làm hỏng cả lần cài.
    for (let i = 0; i < ASSETS.length; i += 12) {
      await Promise.allSettled(ASSETS.slice(i, i + 12).map((u) => c.add(u)));
    }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') {
        const c = await caches.open(CACHE);
        c.put(req, res.clone());
      }
      return res;
    } catch (err) {
      // Mất mạng: điều hướng thì trả về trang chính đã cache.
      if (req.mode === 'navigate') {
        const idx = await caches.match('./', { ignoreSearch: true });
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
