'use client';

import { useState } from 'react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Download } from 'lucide-react';

export default function InstallPwaModal() {
  const { canInstall, install } = useInstallPrompt();
  const [open, setOpen] = useState(false);
  const [installing, setInstalling] = useState(false);

  const handleInstall = async () => {
    setInstalling(true);
    try { await install(); } finally { setInstalling(false); }
  };

  if (!canInstall && !open) {
    // Si no hay beforeinstallprompt, aún permitimos “Cómo instalar”
    // Muestra un botón “Cómo instalar” en tu Hero que haga setOpen(true).
    return null;
  }

  return (
    <>
      {/* Botón de ejemplo (puedes moverlo al Hero) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          id="instalar"
          className="mx-4 mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-4 py-2 text-sm font-semibold text-cian hover:bg-[#112b35]"
        >
          <Download className="h-4 w-4" />
          {canInstall ? 'Instalar App' : 'Cómo instalar'}
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-end bg-black/50 p-0 sm:place-items-center sm:p-4">
          <div className="hud-card w-full max-w-lg rounded-t-2xl p-6 sm:rounded-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-hud text-xl text-cian">Instalar PWA</h3>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            {canInstall ? (
              <>
                <p className="text-slate-300">
                  Puedes instalar la aplicación directamente desde tu navegador.
                </p>
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-cian px-5 py-3 font-semibold text-[#0B0F16] hover:brightness-110"
                >
                  <Download className="h-5 w-5" />
                  {installing ? 'Instalando…' : 'Instalar ahora'}
                </button>
              </>
            ) : (
              <div className="space-y-3 text-sm text-slate-300">
                <p><strong>Android (Chrome):</strong> Menú ⋮ → “Agregar a pantalla principal”.</p>
                <p><strong>iOS (Safari):</strong> Compartir ⎋ → “Agregar a pantalla de inicio”.</p>
                <p><strong>Desktop (Chrome/Edge):</strong> Icono de instalar en la barra de direcciones.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
