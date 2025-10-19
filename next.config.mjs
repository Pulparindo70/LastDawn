import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline.html', // fallback cuando no hay conexión
  },
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
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
        expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
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
  experimental: { appDir: true },
};

export default withPWA(config);
