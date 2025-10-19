'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trophy, Users } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

type Entry = {
  id: string;
  player: string;
  score: number;
  mode: 'solo' | 'squad';
  date: string; // ISO
};

const MOCK: Entry[] = [
  { id: '1', player: 'RogueWolf', score: 12450, mode: 'solo',  date: '2025-10-16T20:10:00Z' },
  { id: '2', player: 'NeonBlade', score: 11890, mode: 'squad', date: '2025-10-18T17:02:00Z' },
  { id: '3', player: 'EchoFox',  score: 11220, mode: 'solo',  date: '2025-10-19T01:40:00Z' },
  { id: '4', player: 'Spectra',   score: 10980, mode: 'squad', date: '2025-10-18T22:05:00Z' },
  { id: '5', player: 'Tú',        score: 9870,  mode: 'solo',  date: '2025-10-19T03:12:00Z' },
  { id: '6', player: 'Nova',      score: 9650,  mode: 'squad', date: '2025-10-15T09:00:00Z' },
];

type Range = 'daily' | 'weekly' | 'all';
const rangeLabel: Record<Range, string> = {
  daily: 'Diario',
  weekly: 'Semanal',
  all: 'Total',
};

function withinRange(dateISO: string, range: Range) {
  const d = new Date(dateISO).getTime();
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  if (range === 'daily') return now - d <= day;
  if (range === 'weekly') return now - d <= 7 * day;
  return true;
}

export default function LeaderboardSnapshot() {
  const online = useOnlineStatus();
  const [range, setRange] = useState<Range>('daily');
  const [mode, setMode] = useState<'solo' | 'squad' | 'all'>('all');
  const [data, setData] = useState<Entry[]>([]);

  // En el futuro: aquí haríamos fetch a Supabase.
  // Por ahora: mock + "snapshot" (se podría persistir en IndexedDB).
  useEffect(() => {
    setData(MOCK);
  }, []);

  const filtered = useMemo(() => {
    return data
      .filter(e => withinRange(e.date, range))
      .filter(e => (mode === 'all' ? true : e.mode === mode))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [data, range, mode]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-hud text-2xl tracking-wide text-cian md:text-3xl">
          <Trophy className="h-6 w-6" />
          Ranking
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Rango */}
          {(['daily', 'weekly', 'all'] as Range[]).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-xl border px-3 py-1.5 text-sm transition
                ${range === r ? 'border-cian text-cian' : 'border-[#142034] text-slate-300 hover:text-cian'}`}
              aria-current={range === r}
            >
              {rangeLabel[r]}
            </button>
          ))}
          {/* Modo */}
          <div className="ml-1 hidden items-center gap-1 rounded-xl border border-[#142034] px-1 py-1 md:flex">
            <button
              onClick={() => setMode('all')}
              className={`rounded-lg px-2 py-1 text-sm ${mode === 'all' ? 'text-cian' : 'text-slate-300'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setMode('solo')}
              className={`rounded-lg px-2 py-1 text-sm ${mode === 'solo' ? 'text-cian' : 'text-slate-300'}`}
            >
              Solo
            </button>
            <button
              onClick={() => setMode('squad')}
              className={`rounded-lg px-2 py-1 text-sm ${mode === 'squad' ? 'text-cian' : 'text-slate-300'}`}
            >
              Squad
            </button>
          </div>
        </div>
      </div>

      <div className="hud-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#142034] px-4 py-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-cian" />
            <span>{filtered.length} jugadores</span>
          </div>
          <div className="flex items-center gap-2">
            {online === false ? (
              <span className="hud-badge text-amber" title="Mostrando snapshot en offline">
                Snapshot Offline
              </span>
            ) : (
              <span className="hud-badge text-cian" title="Conectado">
                Online
              </span>
            )}
          </div>
        </div>

        <div className="relative w-full overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0">
            <thead className="bg-[#0f1e2a] text-left text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Jugador</th>
                <th className="px-4 py-3">Puntaje</th>
                <th className="px-4 py-3">Modo</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, idx) => {
                const isYou = e.player.toLowerCase() === 'tú';
                return (
                  <tr
                    key={e.id}
                    className={`${idx % 2 ? 'bg-[#0b121d]' : 'bg-transparent'} ${isYou ? 'outline outline-1 outline-cian/30' : ''}`}
                  >
                    <td className="px-4 py-3 text-slate-300">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${isYou ? 'text-cian' : ''}`}>{e.player}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{e.score.toLocaleString('es-MX')}</td>
                    <td className="px-4 py-3 capitalize text-slate-300">{e.mode}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(e.date).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                    Sin registros para este rango.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#142034] px-4 py-3 text-sm text-slate-400">
          <span>Los datos se actualizan al reconectar.</span>
          <a href="/ranking" className="text-cian hover:underline">Ver ranking completo</a>
        </div>
      </div>
    </section>
  );
}
