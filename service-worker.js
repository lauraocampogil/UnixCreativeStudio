// service-worker.js
const CACHE_NAME = "unix-studio-cache-v2";
const urlsToCache = ["/", "/index.html", "/style.css", "/main.js", "/images/UNIX_TRANSPARENCY_WEB.webp", "/fonts/Space_Grotesk-regular.woff2", "/fonts/Space_Grotesk-bold.woff2"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
			.then(() => self.skipWaiting())
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== CACHE_NAME) {
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response;
			}

			return fetch(event.request).then((response) => {
				// Don't cache if not a valid response
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// IMPORTANT: Clone the response since it's a stream
				const responseToCache = response.clone();

				caches.open(CACHE_NAME).then((cache) => {
					// Only cache same-origin requests
					if (event.request.url.startsWith(self.location.origin)) {
						cache.put(event.request, responseToCache);
					}
				});

				return response;
			});
		})
	);
});
