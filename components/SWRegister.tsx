'use client';

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    // Evita doble registro si la auto-inyección ya lo hizo
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => {
        if (!reg) {
          navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  return null;
}

