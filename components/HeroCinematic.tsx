'use client';

import { motion } from 'framer-motion';
import { Play, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function HeroCinematic() {
  return (
    <section className="relative isolate">
      {/* Backdrop — reemplaza src por tu video o imagen */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Video (opcional) */}
        {/* <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.avif"
        >
          <source src="/hero-loop.webm" type="video/webm" />
        </video> */}
        {/* Fallback con gradiente + “fog” */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1525] via-[#0b0f16] to-black" />
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(60%_40%_at_50%_20%,rgba(0,229,255,.25),transparent_60%)]" />
        <svg className="absolute -bottom-20 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 opacity-30" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="g" cx="0.5" cy="0.5">
              <stop offset="0" stopColor="#00E5FF" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#g)" />
        </svg>
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-start justify-center px-4 py-16">
        <motion.h1
          className="max-w-3xl font-hud text-4xl leading-tight md:text-6xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cian">Operación: Último Amanecer</span>
          <br />
          La humanidad retrocede. Tú no.
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Shooter cooperativo de hordas. Arsenal infinito. Ranking global.
          Funciona <span className="text-cian-soft">offline</span>.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Link
            href="#jugar"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-cian px-5 py-3 font-semibold text-[#c8c8c8] shadow-hud hover:brightness-110 active:scale-[.98]"
          >
            <Rocket className="h-5 w-5" />
            Jugar ahora
          </Link>
          <Link
            href="#trailer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-5 py-3 font-semibold text-cian hover:bg-[#112b35] active:scale-[.98]"
          >
            <Play className="h-5 w-5" />
            Ver tráiler
          </Link>

          {/* Badges */}
          <span className="hud-badge">Offline</span>
          <span className="hud-badge">Coop 1–4</span>
          <span className="hud-badge">Ranking</span>
        </motion.div>

        <div className="mt-12 animate-glow text-sm text-muted">
          Próxima Oleada: 20:00 UTC
        </div>
      </div>
    </section>
  );
}
