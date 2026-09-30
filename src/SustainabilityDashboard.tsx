import React, { useState } from 'react';
import { Leaf, Zap, Droplets, Recycle, TrendingDown, Award } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string;
  unit: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}

const SustainabilityCard: React.FC<MetricProps> = ({ label, value, unit, change, positive, icon, color }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-400 font-semibold">{label}</span>
      <div style={{ color }} className="opacity-80">{icon}</div>
    </div>
    <div>
      <span className="text-xl font-extrabold text-white">{value}</span>
      <span className="text-xs text-slate-400 ml-1">{unit}</span>
    </div>
    <div className={`text-[11px] font-bold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
      {positive ? '↓' : '↑'} {change} vs. FIFA 2022
    </div>
  </div>
);

export const SustainabilityDashboard: React.FC = () => {
  const [ecoScore] = useState(87);

  const metrics: MetricProps[] = [
    {
      label: 'Carbon Emissions',
      value: '124',
      unit: 'tCO₂e',
      change: '18%',
      positive: true,
      icon: <TrendingDown className="w-4 h-4" />,
      color: '#10b981',
    },
    {
      label: 'Renewable Energy',
      value: '100',
      unit: '% Solar',
      change: '62%',
      positive: true,
      icon: <Zap className="w-4 h-4" />,
      color: '#f59e0b',
    },
    {
      label: 'Water Recycled',
      value: '42,000',
      unit: 'litres',
      change: '31%',
      positive: true,
      icon: <Droplets className="w-4 h-4" />,
      color: '#3b82f6',
    },
    {
      label: 'Waste Composted',
      value: '92.4',
      unit: '%',
      change: '28%',
      positive: true,
      icon: <Recycle className="w-4 h-4" />,
      color: '#a78bfa',
    },
  ];

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (ecoScore / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Sustainability Score — Match Day</span>
          </h4>
          <p className="text-xs text-slate-400">GenAI Carbon & Resource Intelligence</p>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-semibold flex items-center space-x-1">
          <Award className="w-3.5 h-3.5" />
          <span>FIFA Green Venue 2026</span>
        </span>
      </div>

      {/* Circular Score Gauge */}
      <div className="flex items-center space-x-6">
        <div className="relative shrink-0 w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-3xl font-black text-white">{ecoScore}</span>
            <span className="block text-[10px] font-bold text-emerald-400">ECO SCORE</span>
          </div>
        </div>

        <div className="flex-1 space-y-2 text-xs">
          <p className="text-slate-200 font-semibold leading-relaxed">
            MetLife Stadium is performing in the <span className="text-emerald-400 font-bold">top 8%</span> of all FIFA World Cup venues globally.
          </p>
          <p className="text-slate-400 leading-relaxed">
            GenAI autopilot has dynamically adjusted 14 HVAC zones, reduced lighting draw by 11%, and rerouted 3 wastewater streams since kickoff.
          </p>
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Leaf className="w-3 h-3" />
            <span>On track for Net-Zero Match Day</span>
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <SustainabilityCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
};
