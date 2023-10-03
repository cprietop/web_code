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
        .then(cache => {
            return cache.addAll(urlToCache)
            .then(() => self.skipWaiting())
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
        //activate current cache
        .then(() => self.clients.claim())
    )
})

//When the connection is recovered

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



















/*
heheheeh here is!!
@media(max-width: 800px){
    header{
        display: block;
        text-align: center;
    }
    nav{
        margin-left: 0px;
    }
}
*/