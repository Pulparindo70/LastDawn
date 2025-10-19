'use client';

import { Bell, CalendarDays, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type EventCard = { id: string; title: string; date: string; tag: string; excerpt: string };

const EVENTS: EventCard[] = [
  { id: 'e1', title: 'Oleada: “Noche Carmesí”', date: '2025-10-21', tag: 'Evento', excerpt: 'Multiplicador x2 de puntaje y jefes élite.' },
  { id: 'e2', title: 'Parche 0.3.1 — Balance armas', date: '2025-10-20', tag: 'Update', excerpt: 'Mejoras a rifles de riel, ajustes a escopetas.' },
  { id: 'e3', title: 'Nuevo mapa: Distrito 7', date: '2025-10-24', tag: 'Mapa', excerpt: 'Combates urbanos, verticalidad y emboscadas.' },
];

export default function EventsStrip() {
  const [notifEnabled, setNotifEnabled] = useState(false);

  const requestNotif = async () => {
    try {
      const perm = await Notification.requestPermission();
      setNotifEnabled(perm === 'granted');
    } catch {}
  };

  return (
    <section id="eventos" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-hud text-2xl tracking-wide text-cian md:text-3xl">Eventos & Noticias</h2>
        <button
          onClick={requestNotif}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#143a44] bg-[#0f1e2a] px-4 py-2 text-sm font-semibold text-cian hover:bg-[#112b35] active:scale-[.98]"
        >
          <Bell className="h-4 w-4" />
          {notifEnabled ? 'Notificaciones activas' : 'Activar notificaciones'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {EVENTS.map(e => (
          <article key={e.id} className="hud-card group p-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="hud-badge">{e.tag}</span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-cian" />
                {new Date(e.date).toLocaleDateString('es-MX', { dateStyle: 'medium' })}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{e.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{e.excerpt}</p>
            <a
              href={`/eventos/${e.id}`}
              className="mt-4 inline-flex items-center gap-1 text-cian hover:underline"
            >
              Ver más <ChevronRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
