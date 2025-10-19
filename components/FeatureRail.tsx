'use client';

import { Shield, Swords, Users, Skull } from 'lucide-react';

const features = [
  {
    icon: Swords,
    title: 'Misiones tácticas',
    desc: 'Operaciones en zonas rojas con objetivos dinámicos.',
  },
  {
    icon: Users,
    title: 'Cooperativo',
    desc: 'Forma escuadras y combina roles para sobrevivir.',
  },
  {
    icon: Skull,
    title: 'Jefes mutantes',
    desc: 'Encuentros épicos con mecánicas únicas.',
  },
  {
    icon: Shield,
    title: 'Progresión',
    desc: 'Mejora armas, mods y habilidades de clase.',
  },
];

export default function FeatureRail() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 font-hud text-2xl tracking-wide text-cian md:text-3xl">
        Gameplay
      </h2>

      {/* Rail en móvil, grid en desktop */}
      <div className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0">
        {features.map(({ icon: Icon, title, desc }) => (
          <article
            key={title}
            className="hud-card min-w-[260px] snap-start p-5"
          >
            <Icon className="mb-3 h-6 w-6 text-cian" />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-300">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
