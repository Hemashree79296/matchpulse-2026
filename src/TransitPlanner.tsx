import React, { useState } from 'react';
import { Train, Bus, Car, Clock, Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';

interface Route {
  id: string;
  type: 'rail' | 'shuttle' | 'rideshare' | 'walk';
  name: string;
  duration: string;
  departure: string;
  crowdLevel: 'low' | 'medium' | 'high';
  aiTip: string;
  icon: React.ReactNode;
  recommended?: boolean;
  delay?: string;
}

const routeData: Route[] = [
  {
    id: 'r1',
    type: 'rail',
    name: 'NJ Transit Rail → Secaucus Junction',
    duration: '18 min',
    departure: 'Every 6 min from Meadowlands Station',
    crowdLevel: 'medium',
    aiTip: 'Best option post-match. Trains run express — skip Secaucus, ride direct to Penn Station NYC.',
    icon: <Train className="w-5 h-5" />,
    recommended: true,
  },
  {
    id: 'r2',
    type: 'shuttle',
    name: 'Electric Shuttle → Parking Lot K',
    duration: '8 min',
    departure: 'Continuous from Bay 3 & 4',
    crowdLevel: 'low',
    aiTip: 'Reserve fleet of 6 zero-emission shuttles activated. Leaves every 4 minutes from Gate D shuttle hub.',
    icon: <Bus className="w-5 h-5" />,
    delay: '2 min delay on Bay 4',
  },
  {
    id: 'r3',
    type: 'rideshare',
    name: 'Rideshare (Uber / Lyft)',
    duration: '25–40 min',
    departure: 'Designated pickup: Lot E-4 (East)',
    crowdLevel: 'high',
    aiTip: 'AI predicts 3.2× surge pricing for 45 mins post-match. Wait 55 minutes for ~1.1× rates. Use east exit (Gate C) to reach Lot E-4 faster.',
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 'r4',
    type: 'walk',
    name: 'Walk to Meadowlands Station',
    duration: '12 min',
    departure: 'Exit via Gate A North Ramp',
    crowdLevel: 'low',
    aiTip: 'Scenic route via Fan Plaza is clear. Fastest walking path: North Gate → Bridge Walkway → Station Concourse.',
    icon: <Clock className="w-5 h-5" />,
  },
];

const crowdBadge = (level: string) => {
  if (level === 'low') return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Low Crowd</span>;
  if (level === 'medium') return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Moderate</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">High Crowd</span>;
};

export const TransitPlanner: React.FC = () => {
  const [selected, setSelected] = useState<string>('r1');
  const [destination, setDestination] = useState('NYC Penn Station');

  const selectedRoute = routeData.find((r) => r.id === selected)!;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Train className="w-4 h-4 text-blue-400" />
            <span>GenAI Transit Route Planner</span>
          </h4>
          <p className="text-xs text-slate-400">Real-time transit intelligence for post-match departure</p>
        </div>
        <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-semibold">
          Live Traffic Feed
        </span>
      </div>

      {/* Destination Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Going to:</span>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option>NYC Penn Station</option>
          <option>Newark Airport (EWR)</option>
          <option>Times Square, NYC</option>
          <option>Hoboken Terminal</option>
          <option>Jersey City Downtown</option>
          <option>Meadowlands Parking Lot A–K</option>
        </select>
      </div>

      {/* Route Cards */}
      <div className="space-y-2">
        {routeData.map((route) => (
          <div
            key={route.id}
            onClick={() => setSelected(route.id)}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selected === route.id
                ? 'bg-slate-800 border-blue-500 shadow-md shadow-blue-500/10'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  selected === route.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {route.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="text-xs font-bold text-slate-200">{route.name}</h5>
                    {route.recommended && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        ⚡ AI Pick
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{route.departure}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <span className="block text-xs font-extrabold text-slate-100">{route.duration}</span>
                {crowdBadge(route.crowdLevel)}
              </div>
            </div>

            {route.delay && (
              <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{route.delay}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Recommendation Panel */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-xs font-bold text-blue-300">GenAI Route Intelligence</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs text-blue-200 font-semibold">{selectedRoute.name}</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">{selectedRoute.aiTip}</p>
      </div>
    </div>
  );
};
