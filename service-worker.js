const CACHE_NAME = "cache-v1";
const urlsToCache = ["index.html", "style.css", "script.js"];

//implementar beforeinstallprompt
 self.addEventListener("beforeinstallprompt", (e) => {
   e.preventDefault();
   console.log("beforeinstallprompt");
 });

//implementar install
self.addEventListener("install", (e) => {
  console.log("install");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//implementar fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

//implementar activate
self.addEventListener("activate", (e) => {
  console.log("activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("key");
            return caches.delete(key);
          }
        })
      );
    })
  );
});