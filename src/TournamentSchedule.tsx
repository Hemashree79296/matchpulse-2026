import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Filter, Sparkles, Navigation, Info } from 'lucide-react';

export interface TournamentMatch {
  id: string;
  stage: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  country: 'USA' | 'MEX' | 'CAN';
  teamA: { name: string; flag: string; code: string };
  teamB: { name: string; flag: string; code: string };
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  expectedAttendance: number;
  aiOpsBrief: string;
}

const tournamentMatches: TournamentMatch[] = [
  {
    id: 'M48',
    stage: 'Quarter-Final',
    date: 'July 11, 2026',
    time: '20:00 EST',
    stadium: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'USA',
    teamA: { name: 'USA', flag: '🇺🇸', code: 'USA' },
    teamB: { name: 'Mexico', flag: '🇲🇽', code: 'MEX' },
    status: 'LIVE',
    expectedAttendance: 82500,
    aiOpsBrief: 'High rivalry index. Heightened security corridors active between Gates B and D. NJ Transit extra expresses on standby.'
  },
  {
    id: 'M49',
    stage: 'Quarter-Final',
    date: 'July 11, 2026',
    time: '17:00 CST',
    stadium: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'MEX',
    teamA: { name: 'Brazil', flag: '🇧🇷', code: 'BRA' },
    teamB: { name: 'Spain', flag: '🇪🇸', code: 'ESP' },
    status: 'UPCOMING',
    expectedAttendance: 87523,
    aiOpsBrief: 'Pre-monsoon humidity mitigation active. High-flow hydration misting tunnels engaged at Calzada de Tlalpan entrances.'
  },
  {
    id: 'M50',
    stage: 'Quarter-Final',
    date: 'July 12, 2026',
    time: '18:00 PST',
    stadium: 'BC Place',
    city: 'Vancouver',
    country: 'CAN',
    teamA: { name: 'Canada', flag: '🇨🇦', code: 'CAN' },
    teamB: { name: 'Germany', flag: '🇩🇪', code: 'GER' },
    status: 'UPCOMING',
    expectedAttendance: 54500,
    aiOpsBrief: 'Skytrain Stadium-Chinatown station synchronized with AI crowd release pacing. Retractable roof set to open.'
  },
  {
    id: 'M51',
    stage: 'Quarter-Final',
    date: 'July 12, 2026',
    time: '21:00 CDT',
    stadium: 'AT&T Stadium',
    city: 'Dallas / Arlington',
    country: 'USA',
    teamA: { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
    teamB: { name: 'France', flag: '🇫🇷', code: 'FRA' },
    status: 'UPCOMING',
    expectedAttendance: 92000,
    aiOpsBrief: 'Extreme summer heat protocol: Autonomous HVAC chilling stadium bowl 4 hours prior. Regional shuttle grid prioritized.'
  },
  {
    id: 'M52',
    stage: 'Semi-Final',
    date: 'July 15, 2026',
    time: '20:00 EDT',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'USA',
    teamA: { name: 'TBD', flag: '🏳️', code: 'TBD' },
    teamB: { name: 'TBD', flag: '🏳️', code: 'TBD' },
    status: 'UPCOMING',
    expectedAttendance: 75000,
    aiOpsBrief: 'MARTA rail coordination engine synced to stadium gate turnstiles. Automated waste sorting robots deployed.'
  },
  {
    id: 'M54',
    stage: 'Final',
    date: 'July 19, 2026',
    time: '19:00 EST',
    stadium: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'USA',
    teamA: { name: 'TBD', flag: '🏆', code: 'TBD' },
    teamB: { name: 'TBD', flag: '🏆', code: 'TBD' },
    status: 'UPCOMING',
    expectedAttendance: 82500,
    aiOpsBrief: 'Tournament Grand Final protocol: Global broadcast mesh, drone surveillance perimeter, multi-lingual concierge fleet activated.'
  }
];

export const TournamentSchedule: React.FC = () => {
  const [filterCountry, setFilterCountry] = useState<string>('ALL');
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch>(tournamentMatches[0]);

  const filtered = tournamentMatches.filter(m => 
    filterCountry === 'ALL' ? true : m.country === filterCountry
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">FIFA World Cup 2026 • Multi-Venue Tournament Intelligence</h3>
            <p className="text-xs text-slate-400">GenAI real-time operational briefs across 16 Host Cities in USA, Mexico & Canada</p>
          </div>
        </div>

        {/* Country filter buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterCountry('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterCountry === 'ALL' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Venues (16)
          </button>
          <button
            onClick={() => setFilterCountry('USA')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterCountry === 'USA' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            USA 🇺🇸
          </button>
          <button
            onClick={() => setFilterCountry('MEX')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterCountry === 'MEX' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mexico 🇲🇽
          </button>
          <button
            onClick={() => setFilterCountry('CAN')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterCountry === 'CAN' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Canada 🇨🇦
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Match List */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.map((m) => {
            const isSelected = selectedMatch.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold text-amber-400">{m.stage} • Match #{m.id}</span>
                  <div className="flex items-center space-x-2">
                    {m.status === 'LIVE' && (
                      <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-extrabold text-[10px] animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                    <span>{m.date} • {m.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{m.teamA.flag}</span>
                    <span className="text-sm font-bold text-white">{m.teamA.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-500 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                    VS
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-white">{m.teamB.name}</span>
                    <span className="text-2xl">{m.teamB.flag}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{m.stadium} ({m.city})</span>
                  </span>
                  <span>Cap: {m.expectedAttendance.toLocaleString()} fans</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Match GenAI Operational Overview */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-slate-100 text-sm">Venue Operations AI Briefing</h4>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">{selectedMatch.stadium}</span>
              <span className="text-xs text-amber-400 font-semibold">{selectedMatch.city}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Autonomous Stadium Triage Protocol</span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedMatch.aiOpsBrief}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-300">Host City Infrastructure Readiness</h5>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Intelligent Transit Mesh</span>
                <span className="text-emerald-400 font-bold">Synchronized (100%)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Renewable Grid Reserve</span>
                <span className="text-amber-400 font-bold">98.2% Capacity</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[98%]" />
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Multilingual Volunteer Nodes</span>
                <span className="text-blue-400 font-bold">450 Active Guides</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[92%]" />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-2 text-xs text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              MatchPulse cross-communicates between host stadium operations centers across North America, ensuring joint crowd management standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
