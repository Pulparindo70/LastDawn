import type { Metadata, Viewport } from 'next';
import './globals.css';
import SWRegister from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Operación: Último Amanecer',
  description: 'Shooter PWA — Sobrevive, mejora tu arsenal y domina el ranking.',
  themeColor: '#00E5FF',
  applicationName: 'Último Amanecer',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon-32.png',
    apple: '/icons/maskable-192.png',
    other: [{ rel: 'mask-icon', url: '/icons/maskable-512.png' }],
  },
  openGraph: {
    title: 'Operación: Último Amanecer',
    description: 'Shooter PWA — Sobrevive, mejora tu arsenal y domina el ranking.',
    type: 'website',
    url: 'https://tu-dominio.com',
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'Último Amanecer' },
    ],
  },
  other: {
    // ⚙️ Compatibilidad PWA + iOS splash
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'UltimoAmanecer',

    // 🖼️ Splash screen iOS (puedes añadir más tamaños si quieres)
    'apple-touch-startup-image': '/icons/splash-1024.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#00E5FF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#0B0F16] text-slate-100 antialiased">
        {/* Aquí luego montamos <Providers/> si usamos Zustand persist o Theme */}
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
