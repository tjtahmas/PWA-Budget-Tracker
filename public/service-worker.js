const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.js',
    '/styles.css',
    '/db.js',
    '/manifest.webmanifest',
];

console.log(FILES_TO_CACHE)

const CACHE_NAME = 'transaction-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// install
self.addEventListener('install', function (evt) {
    // pre cache transaction data
    // evt.waitUntil(
    //     caches.open(DATA_CACHE_NAME).then((cache) => cache.add('/api/transaction'))
    // );

    // pre cache all static assets
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('In the CACHE!!')
            return cache.addAll( FILES_TO_CACHE)
        })
    );
    
    // tell the browser to activate the service worker immediately once installing
    // self.skipWaiting();
});

// activate the service worker and remove old data from the cache
// self.addEventListener('activate', function(evt) {
//     evt.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(
//                 keyList.map(key => {
//                     if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//                         console.log('Removing old cache data', key);
//                         return caches.delete(key);
//                     }
//                 })
//             )
//         })
//     )

//     self.clients.claim();
// });

// Enable the service worker to intercept network requests
self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
        // console.log('[Service Worker] Fetch (data)', evt. request.url);

        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(evt.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }

                    return response;
                })
                .catch(err => {
                    return cache.match(evt.request);
                });
            }).catch(err => {
                console.log(err)
            })
        )
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch( function() {
                return caches.match(evt.request)
            }).then(response => {
                if(response){
                    return response;
                } else if (evt.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/');
                }
            })
    )
});


// const PRECACHE = 'precache-v1';
// const RUNTIME = 'runtime';

// self.addEventListener('install', (event) => {
//     event.waitUtnil(
//         caches
//             .open(PRECACHE)
//             .then((cache) => cache.addAll(FILES_TO_CACHE))
//             .then(self.skipWaiting())
//     );
// });

// self.addEventListener('activate', (event) => {
//     const currentCaches = [PRECACHE, RUNTIME];
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) => {
//         return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
//       })
//       .then((cachesToDelete) => {
//         return Promise.all(
//           cachesToDelete.map((cacheToDelete) => {
//             return caches.delete(cacheToDelete);
//           })
//         );
//       })
//       .then(() => self.clients.claim())
//   );
// });

// self.addEventListener('fetch', (event) => {
//     if (event.request.url.startsWith(self.location.origin)) {
//       event.respondWith(
//         caches.match(event.request).then((cachedResponse) => {
//           if (cachedResponse) {
//             return cachedResponse;
//           }
  
//           return caches.open(RUNTIME).then((cache) => {
//             return fetch(event.request).then((response) => {
//               return cache.put(event.request, response.clone()).then(() => {
//                 return response;
//               });
//             });
//           });
//         })
//       );
//     }
//   });