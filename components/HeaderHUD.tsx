'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Download, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HeaderHUD() {
  const online = useOnlineStatus(); // puede ser null hasta que monte
  const { canInstall, install } = useInstallPrompt();
  const [installing, setInstalling] = useState(false);

  const handleInstall = async () => {
    try {
      setInstalling(true);
      await install();
    } finally {
      setInstalling(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#142034] bg-[#0B0F16]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo + nombre */}
        <Link
          href="/"
          className="flex items-center gap-2 font-hud text-lg tracking-wide"
          aria-label="Ir al inicio"
        >
          <span className="inline-block h-3 w-3 rounded-full bg-cian shadow-hud" />
          <span>Último Amanecer</span>
        </Link>

        {/* Estado + acciones */}
        <div className="flex items-center gap-2">
          {online === null ? (
            // Placeholder neutro mientras hidrata (evita mismatch SSR/CSR)
            <span className="hud-badge" title="Cargando estado">
              <span className="h-4 w-4 animate-pulse rounded-full bg-slate-400" />
              <span className="hidden sm:inline">…</span>
            </span>
          ) : (
            <span
              className={`hud-badge ${online ? 'text-cian' : 'text-amber'}`}
              title={online ? 'Conectado' : 'Sin conexión'}
            >
              {online ? (
                <Wifi className="h-4 w-4" aria-hidden />
              ) : (
                <WifiOff className="h-4 w-4" aria-hidden />
              )}
              <span className="hidden sm:inline">
                {online ? 'Online' : 'Offline'}
              </span>
            </span>
          )}

          {canInstall && (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="inline-flex items-center gap-2 rounded-xl border border-[#143a44] bg-[#0f1e2a] px-3 py-2 font-medium text-cian hover:bg-[#112b35] active:scale-[.98]"
            >
              <Download className="h-4 w-4" />
              <span>{installing ? 'Instalando…' : 'Instalar'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
