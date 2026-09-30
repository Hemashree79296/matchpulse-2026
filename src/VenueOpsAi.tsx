import React, { useState } from 'react';
import { Leaf, Cpu, Server, ShieldCheck, Thermometer, Radio } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { SustainabilityDashboard } from './SustainabilityDashboard';

const energyUsageData = [
  { zone: 'Pitch Lights', kwh: 420 },
  { zone: 'HVAC', kwh: 310 },
  { zone: 'Screens', kwh: 190 },
  { zone: 'VIP Suites', kwh: 140 },
  { zone: 'Broadcast', kwh: 260 },
];

export const VenueOpsAi: React.FC = () => {
  const [ecoModeActive, setEcoModeActive] = useState(true);
  const [aiAutopilot, setAiAutopilot] = useState(true);
  const [activeView, setActiveView] = useState<'energy' | 'sustainability'>('sustainability');

  return (
    <div className="space-y-6">
      {/* Autopilot Banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-slate-900 to-slate-900 border border-purple-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between shadow-xl gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
              <span>Venue GenAI Autopilot Agent</span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] px-2 py-0.5 rounded-full">Active</span>
            </h3>
            <p className="text-xs text-slate-400">Autonomous energy, air quality & smart grid balancing — FIFA World Cup 2026</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setEcoModeActive(!ecoModeActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${ecoModeActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
          >
            🌱 Eco-Grid: {ecoModeActive ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setAiAutopilot(!aiAutopilot)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${aiAutopilot ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-slate-800 text-slate-400'}`}
          >
            🤖 Autopilot: {aiAutopilot ? 'ENABLED' : 'MANUAL'}
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-semibold gap-1 w-fit">
        <button onClick={() => setActiveView('sustainability')} className={`px-4 py-2 rounded-lg transition-all ${activeView === 'sustainability' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
          🌿 Sustainability AI
        </button>
        <button onClick={() => setActiveView('energy')} className={`px-4 py-2 rounded-lg transition-all ${activeView === 'energy' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
          ⚡ Energy Breakdown
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {activeView === 'sustainability' ? (
            <SustainabilityDashboard />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-100 flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Microgrid Energy Draw (kWh)</span>
                </h4>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  -18% vs 2022
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyUsageData}>
                    <XAxis dataKey="zone" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }} />
                    <Bar dataKey="kwh" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Solar Gen</span>
                  <span className="text-sm font-extrabold text-amber-400">1,480 kWh</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Water Recycled</span>
                  <span className="text-sm font-extrabold text-blue-400">42,000 L</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block">Composted</span>
                  <span className="text-sm font-extrabold text-emerald-400">92.4%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Facility Node Health */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-100 flex items-center space-x-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Facility Node Health</span>
            </h4>
            <span className="text-xs text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">1,240 Online</span>
          </div>

          {[
            { icon: <Radio className="w-4 h-4 text-emerald-400" />, title: '5G Ultra-Wideband Mesh', sub: '4ms latency • 82k connections', status: 'Optimal', color: 'emerald' },
            { icon: <Thermometer className="w-4 h-4 text-amber-400" />, title: 'Smart HVAC Chiller Plant', sub: 'Auto-balanced by thermal GenAI model', status: 'Optimal', color: 'emerald' },
            { icon: <ShieldCheck className="w-4 h-4 text-blue-400" />, title: 'RFID Gate Turnstiles', sub: 'Gate B throttled — preventing choke', status: 'Balanced', color: 'amber' },
            { icon: <Leaf className="w-4 h-4 text-emerald-400" />, title: 'Solar Microgrid Inverters', sub: '1,480 kWh generated since 15:00', status: 'Optimal', color: 'emerald' },
          ].map((node, i) => (
            <div key={i} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {node.icon}
                <div>
                  <h5 className="text-xs font-bold text-slate-200">{node.title}</h5>
                  <p className="text-[11px] text-slate-400">{node.sub}</p>
                </div>
              </div>
              <span className={`text-xs font-bold text-${node.color}-400`}>{node.status}</span>
            </div>
          ))}

          <div className="p-3.5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-1">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">GenAI Autopilot Log</span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "Sec 300 fans adjusted at 19:24 EST — thermal spike detected. Energy saving: 14%. Gate B RFID throttled to 340/min. Shuttle Bay 4 reserve fleet activated."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
