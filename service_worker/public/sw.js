self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open("mycache").then(function(cache){
      cache.addAll([
        '../index.html',
        'main.css'
      ])
    })
  );
});

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches.open("mycache").then(function(cache){
      return cache.match(event.request);
      console.log(fetching);
    })
  )
})