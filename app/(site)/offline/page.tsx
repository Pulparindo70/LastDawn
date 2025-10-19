export const metadata = {
  title: 'Sin conexión — Último Amanecer',
};

export default function OfflinePage() {
  return (
    <main className="mx-auto grid min-h-[80vh] max-w-3xl place-items-center px-4 py-16">
      <section className="hud-card w-full p-6 md:p-8">
        <h1 className="font-hud text-3xl text-cian">Estás offline</h1>
        <p className="mt-2 text-slate-300">
          No pudimos cargar todo el contenido. Cuando recuperes internet,
          esta página se actualizará automáticamente.
        </p>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-400">
          <li>La landing y recursos clave se guardan para usar sin conexión.</li>
          <li>Si es tu primera visita, puede que veas esta vista como respaldo.</li>
          <li>Instala la app para una mejor experiencia offline.</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-cian px-5 py-3 font-semibold text-[#0B0F16] hover:brightness-110 active:scale-[.98]"
          >
            Reintentar
          </a>
          <a
            href="/#instalar"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-5 py-3 font-semibold text-cian hover:bg-[#112b35] active:scale-[.98]"
          >
            Cómo instalar
          </a>
        </div>

        <div className="mt-8 rounded-xl border border-[#142034] p-4">
          <p className="text-sm text-slate-400">
            Tip: la primera vez que visites la Home completa con internet, el
            contenido quedará cacheado para próximas sesiones sin conexión.
          </p>
        </div>
      </section>
    </main>
  );
}
