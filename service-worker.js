self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open("unix-studio-cache-v1").then(function (cache) {
			return cache.addAll(["/", "/index.html", "/style.css", "/main.js", "/images/UNIX_TRANSPARENCY_WEB.webp"]);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
