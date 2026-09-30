import React, { useState } from 'react';
import type { AlertItem } from './types';
import { mockAlerts, mockZones } from './mockData';
import { Shield, AlertTriangle, CheckCircle2, Bot, ArrowUpRight, Flame, Users, Thermometer, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { StadiumHeatmap } from './StadiumHeatmap';

const crowdTrendData = [
  { time: '18:00', density: 35 },
  { time: '18:15', density: 48 },
  { time: '18:30', density: 68 },
  { time: '18:45', density: 89 },
  { time: '19:00', density: 98 },
  { time: '19:15', density: 94 },
  { time: '19:30', density: 96 },
  { time: '19:45 ⚠️', density: 99 },
];

export const OrganizerCommand: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(alerts[0]);
  const [isExecutingAi, setIsExecutingAi] = useState(false);
  const [activeView, setActiveView] = useState<'analytics' | 'heatmap'>('analytics');

  const handleResolveAlert = (id: string) => {
    setIsExecutingAi(true);
    setTimeout(() => {
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a)));
      setIsExecutingAi(false);
      setSelectedAlert(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Attendance', value: '82,500', sub: '↑ 99.4% Capacity', icon: <Users className="w-6 h-6" />, color: 'emerald' },
          { label: 'Active Anomalies', value: `${alerts.filter((a) => a.status !== 'resolved').length} Alerts`, sub: 'AI Dispatching', icon: <AlertTriangle className="w-6 h-6" />, color: 'amber' },
          { label: 'Avg Concourse Temp', value: '23.2°C', sub: 'HVAC Eco-Mode', icon: <Thermometer className="w-6 h-6" />, color: 'blue' },
          { label: 'AI Auto-Resolutions', value: '94.8%', sub: 'Latency < 2s', icon: <Bot className="w-6 h-6" />, color: 'purple' },
        ].map((k, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">{k.label}</p>
              <h3 className={`text-xl font-extrabold mt-1 text-${k.color}-400`}>{k.value}</h3>
              <span className={`text-[11px] text-${k.color}-400 mt-1 block`}>{k.sub}</span>
            </div>
            <div className={`w-12 h-12 bg-${k.color}-500/10 border border-${k.color}-500/20 rounded-xl flex items-center justify-center text-${k.color}-400`}>
              {k.icon}
            </div>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-semibold gap-1 w-fit">
        <button onClick={() => setActiveView('analytics')} className={`px-4 py-2 rounded-lg transition-all ${activeView === 'analytics' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
          📊 Analytics
        </button>
        <button onClick={() => setActiveView('heatmap')} className={`px-4 py-2 rounded-lg transition-all ${activeView === 'heatmap' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
          🗺️ Stadium Heatmap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {activeView === 'analytics' ? (
            <>
              {/* Crowd Trend Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-100 flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>Crowd Density & Predictive Flow</span>
                    </h4>
                    <p className="text-xs text-slate-400">Computer Vision Feed (%)</p>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-semibold">Live Sync</span>
                </div>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={crowdTrendData}>
                      <defs>
                        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="density" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#dg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Zone Matrix */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <h4 className="font-bold text-slate-100 mb-4 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Concourse Zone Matrix</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockZones.map((z) => {
                    const pct = Math.round((z.currentOccupancy / z.capacity) * 100);
                    return (
                      <div key={z.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-200 truncate mr-2">{z.name}</h5>
                          <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md ${pct > 95 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                            {pct}%
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 ${pct > 95 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 pt-1.5">
                          <span>🍔 {z.concessionWaitMin}m wait</span>
                          <span>🌡️ {z.tempCelsius}°C</span>
                          <span className="capitalize text-amber-400">{z.crowdSentiment}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <StadiumHeatmap />
          )}
        </div>

        {/* AI Decision Hub */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-100 flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>GenAI Decision Hub</span>
            </h4>
            <span className="bg-purple-500/10 text-purple-400 text-xs px-2.5 py-1 rounded-full border border-purple-500/20 font-medium">Auto-Triage</span>
          </div>

          <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1 flex-1">
            {alerts.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedAlert(a)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedAlert?.id === a.id ? 'bg-slate-800 border-purple-500 shadow-md'
                  : a.status === 'resolved' ? 'bg-slate-950/40 border-slate-800 opacity-50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    a.severity === 'high' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : a.severity === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>{a.severity}</span>
                  <span className="text-[10px] text-slate-400">{a.time}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-200 mt-2">{a.title}</h5>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{a.location}</p>
              </div>
            ))}
          </div>

          {selectedAlert && (
            <div className="bg-slate-950 border border-purple-500/30 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <h5 className="text-xs font-bold text-purple-300">AI Recommended Action</h5>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                {selectedAlert.aiRecommendation}
              </p>
              <div className="flex justify-end">
                {selectedAlert.status === 'resolved' ? (
                  <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" /><span>Resolved</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolveAlert(selectedAlert.id)}
                    disabled={isExecutingAi}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-1.5"
                  >
                    {isExecutingAi
                      ? <><Sparkles className="w-4 h-4 animate-spin" /><span>Dispatching...</span></>
                      : <><ArrowUpRight className="w-4 h-4" /><span>Approve & Dispatch</span></>}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
