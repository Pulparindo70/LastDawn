'use client';

import { useState } from 'react';
import { Crosshair, Zap, Flame, Gauge } from 'lucide-react';

type Weapon = {
  id: string;
  name: string;
  rarity: 'Común' | 'Rara' | 'Épica' | 'Exótica';
  dps: number;     // 0–100
  rpm: number;     // 0–100
  accuracy: number;// 0–100
  desc: string;
};

const WEAPONS: Weapon[] = [
  {
    id: 'mx-9',
    name: 'MX-9 Vortex',
    rarity: 'Rara',
    dps: 74,
    rpm: 86,
    accuracy: 62,
    desc: 'SMG con retroceso controlable y daño estable en corta distancia.',
  },
  {
    id: 'xr-12',
    name: 'XR-12 Helios',
    rarity: 'Épica',
    dps: 88,
    rpm: 72,
    accuracy: 70,
    desc: 'Rifle de asalto con munición incendiaria para controlar hordas.',
  },
  {
    id: 'eon-l',
    name: 'EON-L Rail',
    rarity: 'Exótica',
    dps: 96,
    rpm: 45,
    accuracy: 92,
    desc: 'Rifle de riel, perfora armadura y jefes con precisión quirúrgica.',
  },
  {
    id: 'sg-7',
    name: 'SG-7 Cyclone',
    rarity: 'Rara',
    dps: 82,
    rpm: 38,
    accuracy: 48,
    desc: 'Escopeta devastadora a corta distancia; despeja pasillos.',
  },
];

function StatBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span className="inline-flex items-center gap-1">
          <Icon className="h-3.5 w-3.5 text-cian" />
          {label}
        </span>
        <span>{clamped}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#142034]">
        <div
          className="h-2 rounded-full bg-cian"
          style={{ width: `${clamped}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

function RarityBadge({ rarity }: { rarity: Weapon['rarity'] }) {
  const map = {
    'Común': 'border-slate-600 text-slate-300',
    'Rara': 'border-[#1e4a57] text-cian',
    'Épica': 'border-[#5b3a75] text-[#b494ff]',
    'Exótica': 'border-[#6b4b00] text-amber',
  };
  return (
    <span className={`hud-badge ${map[rarity as keyof typeof map]}`}>{rarity}</span>
  );
}

export default function ArsenalPreview() {
  const [active, setActive] = useState(WEAPONS[0].id);

  const selected = WEAPONS.find(w => w.id === active)!;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-hud text-2xl tracking-wide text-cian md:text-3xl">Arsenal</h2>
        <div className="hidden gap-2 md:flex">
          {WEAPONS.map(w => (
            <button
              key={w.id}
              onClick={() => setActive(w.id)}
              className={`rounded-xl border px-3 py-1.5 text-sm transition
                ${active === w.id ? 'border-cian text-cian' : 'border-[#142034] text-slate-300 hover:text-cian'}`}
              aria-current={active === w.id}
            >
              {w.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal: tarjeta grande + rail de tarjetas (mobile) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tarjeta grande (detalle) */}
        <article className="hud-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-xl">{selected.name}</h3>
            <RarityBadge rarity={selected.rarity} />
          </div>

          <p className="mt-3 text-slate-300">{selected.desc}</p>

          <div className="mt-6 grid gap-4">
            <StatBar label="DPS" value={selected.dps} icon={Crosshair} />
            <StatBar label="Cadencia (RPM)" value={selected.rpm} icon={Gauge} />
            <StatBar label="Precisión" value={selected.accuracy} icon={Zap} />
          </div>

          <div className="mt-6 rounded-xl border border-[#142034] p-4 text-sm text-slate-400">
            Consejo: combina <span className="text-cian">EON-L Rail</span> para jefes y
            <span className="text-cian"> MX-9</span> para control de adds.
          </div>
        </article>

        {/* Rail de armas (mobile) / grid simple (desktop) */}
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0">
          {WEAPONS.map(w => (
            <button
              key={w.id}
              onClick={() => setActive(w.id)}
              className={`hud-card min-w-[240px] snap-start p-5 text-left transition
                ${active === w.id ? 'ring-1 ring-cian' : 'opacity-90 hover:opacity-100'}`}
              aria-pressed={active === w.id}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{w.name}</h4>
                <RarityBadge rarity={w.rarity} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
                <div className="rounded-md border border-[#142034] p-2">
                  <Crosshair className="mx-auto h-4 w-4 text-cian" />
                  <div className="mt-1 font-semibold">{w.dps}</div>
                  <div className="opacity-70">DPS</div>
                </div>
                <div className="rounded-md border border-[#142034] p-2">
                  <Flame className="mx-auto h-4 w-4 text-amber" />
                  <div className="mt-1 font-semibold">{w.rpm}</div>
                  <div className="opacity-70">RPM</div>
                </div>
                <div className="rounded-md border border-[#142034] p-2">
                  <Zap className="mx-auto h-4 w-4 text-cian-soft" />
                  <div className="mt-1 font-semibold">{w.accuracy}</div>
                  <div className="opacity-70">Precisión</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
