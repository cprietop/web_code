;
//Asignar nombre a la cache de mi sitio

const CACHE_NAME = 'cache_curso',
    urlToCache= [
        './index.html',
        './img/pngwing.com.png',
        './css/style.css',
        './img/programming.png'
    ]

//

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(async cache => {
            await cache.addAll(urlToCache)
            return self.skipWaiting()
        })
        .catch(err => console.log('Fallo en el registro de cache', err))
    )
})

//Sin conexión

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        cache.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheNames => {
                    if(cacheWhitelist.indexOf(cacheNames) === -1){
                        return cache.delete(cacheNames)
                    }
                })
            )
        })
        //activar cache actual
        .then(() => self.clients.claim())
    )
})

//Cuando se recupere la conexión

self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res
            }
            return fetch(e.request)
        })
    )
})