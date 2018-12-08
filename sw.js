console.log('Service Worker:Register');

// caching the files 
const cacheFiles=[
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js'
            ];

self.addEventListener('install',event=>{
	event.waitUntil(
		caches.open('v1').then(cache =>{
			return cache.addAll(cacheFiles);
		}).catch(err => console.log("Couldn't cache " + err))
	);
});

self.addEventListener('fetch', event=> {
    event.respondWith(
        caches.match(event.request).then(response=> { 
        	if(response)
        	{
        		console.log('Found ',event.request,' in cache');
        		return response;
        	}
        	else{
        		console.log('Could not find ',event.request,' in cache ');
        		return fetch(event.request)
        		.then(response=>{
        			const clonedResponse=response.clone();
        			caches.open('v1').then(cache=>{
        				cache.put(event.request,clonedResponse);
        			})
        			return response;
        		})
        		.catch(err=>{
        			console.error(err);
        		});
        	}
        })
    );
});
