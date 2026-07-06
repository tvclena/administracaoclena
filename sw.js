const CACHE = "painel-admin-v20";
const FILES = [
  "./",
  "./index.html",
  "./profile.html",
  "./painel-tipo-loja.html",
  "./config.html",
  "./admin-customizacoes.html",
  "./linkbio.html",
  "./manifest.json"




  
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request))
  );
});
