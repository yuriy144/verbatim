/*
  Verbatim service worker — makes the app installable and fully offline.

  It caches the app's own files and NOTHING else. It talks to no server other
  than fetching Verbatim's own static files from its own origin, and it never
  sees, stores, or transmits any user text (URL fragments — the part after #
  in share links — are never sent over the network at all, so they never even
  reach this worker's fetch handler in a request URL).

  Update strategy:
  - Navigations (opening the app): NETWORK-FIRST, falling back to the cached
    copy when offline. This means a deployed update is picked up on the very
    next online visit — no stale-version confusion — while offline still works.
  - Assets (icons, manifest): STALE-WHILE-REVALIDATE — served instantly from
    cache, refreshed in the background.

  Releasing a new version: bump CACHE_VERSION below. Old caches are deleted on
  activation, so devices never accumulate stale copies.
*/
'use strict';

const CACHE_VERSION = 'v4.3.0';
const CACHE_NAME = 'verbatim-' + CACHE_VERSION;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('verbatim-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch other origins

  // Opening the app: network-first so updates land immediately; cache = offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html', { cacheName: CACHE_NAME })
          .then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: instant from cache, refreshed quietly in the background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const refreshed = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached); // offline: fall back to whatever we had
      return cached || refreshed;
    })
  );
});
