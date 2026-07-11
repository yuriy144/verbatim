/*
  Verbatim service worker — makes the app installable and fully offline.

  It caches the app's own files and NOTHING else. It talks to no server other
  than fetching Verbatim's own static files from its own origin, and it never
  sees, stores, or transmits any user text (URL fragments — the part after #
  in share links — are never sent over the network at all, so they never even
  reach this worker's fetch handler in a request URL).

  Update strategy:
  - Navigations (opening the app): CACHE-FIRST with a background refresh. The
    app paints instantly from cache (and always works offline); the fresh copy
    downloaded in the background lands in the cache for next time. Version
    releases still apply on the SAME visit they're deployed: the browser
    re-checks sw.js on every navigation, and a changed CACHE_VERSION installs
    a new worker that re-caches everything and (via the page's SKIP_WAITING /
    controllerchange handshake in index.html) reloads the page once.
  - Assets (icons, manifest): STALE-WHILE-REVALIDATE — served instantly from
    cache, refreshed in the background.

  Install resilience: only './' and './index.html' are REQUIRED for install to
  succeed. Icons and the manifest are cached best-effort — a renamed or missing
  icon must never be able to break offline support for the whole app. (It did
  once: the repo folder is 'Icons/' with a capital I, GitHub Pages is
  case-sensitive, and a lowercase 'icons/…' precache list 404'd, which made
  cache.addAll() reject and the worker never installed at all.)

  Releasing a new version: bump CACHE_VERSION below. Old caches are deleted on
  activation, so devices never accumulate stale copies.
*/
'use strict';

const CACHE_VERSION = 'v5.0.5';
const CACHE_NAME = 'verbatim-' + CACHE_VERSION;

// Must match the repository layout exactly — GitHub Pages URLs are
// case-sensitive ('Icons/' ≠ 'icons/').
const PRECACHE_CRITICAL = [
  './',
  './index.html',
];
const PRECACHE_OPTIONAL = [
  './manifest.json',
  './Icons/icon-192.png',
  './Icons/icon-512.png',
  './Icons/maskable-512.png',
  './Icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // The app shell must cache or the install fails (offline would be a lie).
      cache.addAll(PRECACHE_CRITICAL).then(() =>
        // Everything else is best-effort: a missing icon is cosmetic, not fatal.
        Promise.allSettled(PRECACHE_OPTIONAL.map((url) => cache.add(url)))
      )
    ).then(() => self.skipWaiting())
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

// The page can ask a freshly-installed (waiting) worker to take over at once,
// so an update applies on the visit it was downloaded instead of the next one.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Fetch the request and quietly keep a copy. Failures (offline) resolve to
// null so callers can fall back without try/catch pyramids.
function fetchAndCache(req, cacheKey) {
  return fetch(req)
    .then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(cacheKey || req, copy)).catch(() => {});
      }
      return res;
    })
    .catch(() => null);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch other origins

  // Opening the app: instant from cache (works offline, no network wait);
  // a background refresh keeps the cached copy current for the next launch.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        const fresh = fetchAndCache(req, './index.html');
        // No cached copy yet (very first visit): we must wait for the network.
        return cached || fresh.then((res) => res || Response.error());
      })
    );
    return;
  }

  // Static assets: instant from cache, refreshed quietly in the background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const refreshed = fetchAndCache(req).then((res) => res || cached);
      return cached || refreshed;
    })
  );
});
