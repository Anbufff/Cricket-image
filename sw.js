const CACHE_NAME = 'image-search-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    // CSS/JS உள்ளடக்கம் inline ஆக இருப்பதால், தேவையில்லை. ஆனால் புதிய சொத்துகளை சேர்க்கலாம்.
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // கேச் இருந்தால் அதை திருப்பி அனுப்பு, இல்லையெனில் நெட்வொர்க்கிலிருந்து ஃபெட்ச் செய்
                return response || fetch(event.request);
            })
    );
});