const CACHE = "clena-admin-v23";

const FILES = [
  "./",
  "./index.html",

  "./profile.html",
  "./painel-tipo-loja.html",
  "./config.html",
  "./admin-customizacoes.html",
  "./admin-agendamentos.html",
  "./admin-relatorios-vendas.html",
  "./admin-relatorios-uso.html",
  "./linkbio.html",

  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys.map(key => {
            if (key !== CACHE) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();

        caches.open(CACHE).then(cache => {
          cache.put(event.request, copy);
        });

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;

          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
      })
  );
});
