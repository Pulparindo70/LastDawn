import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Youtube, Twitter } from 'lucide-react';

export default function CommunityFooter() {
  return (
    <footer className="mt-16 border-t border-[#142034] bg-[#0b0f16]">
      <section id="comunidad" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-hud text-2xl tracking-wide text-cian md:text-3xl">Comunidad</h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Únete al escuadrón, comparte estrategias y reporta anomalías.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://discord.gg/tu-invite"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-5 py-3 font-semibold text-cian hover:bg-[#112b35]"
          >
            <DiscordLogoIcon className="h-5 w-5" />
            Discord
          </a>
          <a
            href="https://youtube.com/@tu-canal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-5 py-3 font-semibold text-cian hover:bg-[#112b35]"
          >
            <Youtube className="h-5 w-5" />
            YouTube
          </a>
          <a
            href="https://x.com/tu-usuario"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-5 py-3 font-semibold text-cian hover:bg-[#112b35]"
          >
            <Twitter className="h-5 w-5" />
            X / Twitter
          </a>
        </div>
      </section>

      <div className="border-t border-[#142034]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-400 md:flex-row">
          <div>© {new Date().getFullYear()} Último Amanecer. Todos los derechos reservados.</div>
          <nav className="flex flex-wrap gap-4">
            <a href="/soporte" className="hover:underline">Soporte</a>
            <a href="/estado" className="hover:underline">Estado del servidor</a>
            <a href="/conduta" className="hover:underline">Código de conducta</a>
            <a href="/privacidad" className="hover:underline">Privacidad</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
