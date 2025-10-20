import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: { document: '/offline.html' },
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
  // Evita error bad-precaching-response para app-build-manifest en local
  buildExcludes: [/app-build-manifest\.json$/],
  // Precarga explícita de rutas clave
  additionalManifestEntries: [
    { url: '/', revision: null },
    { url: '/offline.html', revision: null },
    { url: '/manifest.json', revision: null },
    { url: '/icons/maskable-192.png', revision: null },
    { url: '/icons/maskable-512.png', revision: null },
    { url: '/icons/mono-256.png', revision: null },
    { url: '/icons/favicon-32.png', revision: null },
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 31536000 },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 60, maxAgeSeconds: 2592000 },
      },
    },
    {
      urlPattern: /\.(?:js|css|woff2?)$/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources' },
    },
    {
      urlPattern: /^https?.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'default',
        networkTimeoutSeconds: 5,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
};

export default withPWA(config);
