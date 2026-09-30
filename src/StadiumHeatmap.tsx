import React, { useState } from 'react';

interface Zone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  pct: number; // occupancy %
  rx?: number;
  ry?: number;
  ellipse?: boolean;
}

const zones: Zone[] = [
  { id: 'north-lower', label: 'North Lower', x: 160, y: 60, w: 280, h: 70, pct: 97 },
  { id: 'south-lower', label: 'South Lower', x: 160, y: 470, w: 280, h: 70, pct: 94 },
  { id: 'east-lower', label: 'East Lower', x: 490, y: 160, w: 80, h: 280, pct: 88 },
  { id: 'west-lower', label: 'West Lower', x: 30, y: 160, w: 80, h: 280, pct: 85 },
  { id: 'north-upper', label: 'North Upper', x: 120, y: 20, w: 360, h: 50, pct: 99 },
  { id: 'south-upper', label: 'South Upper', x: 120, y: 530, w: 360, h: 50, pct: 92 },
  { id: 'east-upper', label: 'East Upper', x: 560, y: 120, w: 55, h: 360, pct: 76 },
  { id: 'west-upper', label: 'West Upper', x: -10, y: 120, w: 55, h: 360, pct: 82 },
];

const getHeatColor = (pct: number): string => {
  if (pct >= 97) return '#ef4444'; // red - critical
  if (pct >= 92) return '#f97316'; // orange - high
  if (pct >= 85) return '#eab308'; // yellow - moderate
  return '#22c55e';               // green - optimal
};

const getHeatOpacity = (pct: number): number => {
  return 0.35 + (pct / 100) * 0.5;
};

export const StadiumHeatmap: React.FC = () => {
  const [hovered, setHovered] = useState<Zone | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-100 text-sm">Live Crowd Density Heatmap</h4>
          <p className="text-xs text-slate-400">MetLife Stadium — GenAI Computer Vision Overlay</p>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span><span className="text-slate-400">Optimal</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block"></span><span className="text-slate-400">Moderate</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-sm bg-orange-500 inline-block"></span><span className="text-slate-400">High</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block"></span><span className="text-slate-400">Critical</span></span>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="-20 0 650 610"
          className="w-full h-auto"
          style={{ maxHeight: 340 }}
        >
          {/* Outer stadium shell */}
          <ellipse cx="300" cy="300" rx="310" ry="290" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          {/* Inner pitch */}
          <rect x="130" y="120" width="340" height="360" rx="60" ry="60" fill="#166534" stroke="#15803d" strokeWidth="2" />
          {/* Pitch markings */}
          <ellipse cx="300" cy="300" rx="80" ry="70" fill="none" stroke="#15803d" strokeWidth="1.5" opacity="0.7" />
          <line x1="300" y1="120" x2="300" y2="480" stroke="#15803d" strokeWidth="1.5" opacity="0.7" />
          <rect x="190" y="120" width="220" height="50" rx="4" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.7"/>
          <rect x="190" y="430" width="220" height="50" rx="4" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.7"/>
          <circle cx="300" cy="300" r="5" fill="#15803d" opacity="0.8" />

          {/* Heatmap Zone Overlays */}
          {zones.map((z) => (
            <rect
              key={z.id}
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx={8}
              fill={getHeatColor(z.pct)}
              opacity={getHeatOpacity(z.pct)}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHovered(z)}
              onMouseLeave={() => setHovered(null)}
              style={{ filter: hovered?.id === z.id ? 'brightness(1.4)' : undefined }}
            />
          ))}

          {/* Percentage labels */}
          {zones.map((z) => (
            <text
              key={`lbl-${z.id}`}
              x={z.x + z.w / 2}
              y={z.y + z.h / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="white"
              opacity={0.9}
              style={{ pointerEvents: 'none' }}
            >
              {z.pct}%
            </text>
          ))}

          {/* Compass indicator */}
          <text x="300" y="18" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">N</text>
          <text x="300" y="598" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">S</text>
          <text x="615" y="304" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">E</text>
          <text x="-12" y="304" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">W</text>
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-2 left-2 bg-slate-950/95 border border-slate-700 rounded-xl px-3 py-2 text-xs shadow-xl pointer-events-none">
            <p className="font-bold text-slate-100">{hovered.label}</p>
            <p style={{ color: getHeatColor(hovered.pct) }} className="font-extrabold text-sm">{hovered.pct}% Occupied</p>
            <p className="text-slate-400 mt-0.5">
              {hovered.pct >= 97 ? '🔴 Redirect fans to alternate sections' :
               hovered.pct >= 92 ? '🟠 Monitor closely — approaching capacity' :
               hovered.pct >= 85 ? '🟡 Moderate — within safe parameters' :
               '🟢 Optimal flow — no action needed'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
