import React, { useState, useEffect } from 'react';
import { Zap, Goal, CreditCard, RefreshCw } from 'lucide-react';

interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub' | 'var' | 'kickoff' | 'halftime';
  team: 'home' | 'away';
  player: string;
  detail?: string;
}

const events: MatchEvent[] = [
  { id: 'e1', minute: 1, type: 'kickoff', team: 'home', player: 'Kickoff', detail: 'USA kicks off' },
  { id: 'e2', minute: 14, type: 'yellow_card', team: 'away', player: 'H. Lozano', detail: 'Foul on Turner' },
  { id: 'e3', minute: 28, type: 'goal', team: 'home', player: 'C. Pulisic', detail: 'Long-range strike! ⚽' },
  { id: 'e4', minute: 35, type: 'var', team: 'away', player: 'VAR Review', detail: 'Offside check — goal stands' },
  { id: 'e5', minute: 43, type: 'goal', team: 'away', player: 'R. Jiménez', detail: 'Header from corner! ⚽' },
  { id: 'e6', minute: 45, type: 'halftime', team: 'home', player: 'Half Time', detail: 'USA 1 – MEX 1' },
  { id: 'e7', minute: 52, type: 'sub', team: 'home', player: 'G. Reyna ↑ / R. Dest ↓', detail: 'Tactical change' },
  { id: 'e8', minute: 61, type: 'goal', team: 'home', player: 'T. Weah', detail: 'Clinical finish! ⚽' },
  { id: 'e9', minute: 68, type: 'yellow_card', team: 'home', player: 'W. McKennie', detail: 'Dissent' },
];

const typeConfig: Record<string, { emoji: string; color: string }> = {
  goal: { emoji: '⚽', color: 'text-amber-400' },
  yellow_card: { emoji: '🟨', color: 'text-yellow-400' },
  red_card: { emoji: '🟥', color: 'text-rose-400' },
  sub: { emoji: '🔄', color: 'text-blue-400' },
  var: { emoji: '📺', color: 'text-purple-400' },
  kickoff: { emoji: '🏁', color: 'text-emerald-400' },
  halftime: { emoji: '⏸️', color: 'text-slate-400' },
};

export const LiveMatchFeed: React.FC = () => {
  const [minute, setMinute] = useState(68);
  const [score, setScore] = useState({ home: 2, away: 1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setMinute((m) => (m < 90 ? m + 1 : m));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Live Score Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-2">
        <div className="flex items-center justify-center space-x-1">
          <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-extrabold text-rose-400 uppercase tracking-widest">Live</span>
          <span className="text-xs font-bold text-slate-400">{minute}'</span>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <span className="text-2xl">🇺🇸</span>
            <p className="text-xs font-bold text-slate-300 mt-1">USA</p>
          </div>
          <div className="text-4xl font-black text-white tracking-tight">
            {score.home} <span className="text-slate-500 text-2xl">–</span> {score.away}
          </div>
          <div className="text-center">
            <span className="text-2xl">🇲🇽</span>
            <p className="text-xs font-bold text-slate-300 mt-1">MEX</p>
          </div>
        </div>
        <p className="text-xs text-slate-500">MetLife Stadium • FIFA World Cup 2026 QF</p>
      </div>

      {/* Events Timeline */}
      <div>
        <h5 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Match Events</h5>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {[...events].reverse().map((ev) => {
            const cfg = typeConfig[ev.type];
            return (
              <div
                key={ev.id}
                className={`flex items-start space-x-3 p-2.5 rounded-xl border transition-all ${
                  ev.type === 'goal'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : ev.type === 'halftime'
                    ? 'bg-slate-800/50 border-slate-700'
                    : 'bg-slate-950 border-slate-800/60'
                }`}
              >
                {/* Minute Badge */}
                <span className="text-[11px] font-black text-slate-400 w-8 shrink-0 pt-0.5 text-right">
                  {ev.minute === 1 ? 'KO' : ev.minute === 45 && ev.type === 'halftime' ? 'HT' : `${ev.minute}'`}
                </span>

                {/* Event icon */}
                <span className="text-base shrink-0">{cfg.emoji}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${cfg.color}`}>{ev.player}</span>
                    <span className={`text-[10px] font-semibold ${ev.team === 'home' ? 'text-blue-400' : 'text-rose-400'}`}>
                      {ev.team === 'home' ? '🇺🇸 USA' : '🇲🇽 MEX'}
                    </span>
                  </div>
                  {ev.detail && (
                    <p className="text-[11px] text-slate-400 mt-0.5">{ev.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
