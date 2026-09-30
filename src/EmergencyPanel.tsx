import React, { useState } from 'react';
import { AlertOctagon, MapPin, Phone, Sparkles, CheckCircle2, ChevronDown, Siren, ShieldAlert, Heart, FlameKindling } from 'lucide-react';

type IncidentType = 'medical' | 'fire' | 'security' | 'crowd' | 'accessibility' | 'other';
type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

interface Incident {
  id: string;
  type: IncidentType;
  severity: SeverityLevel;
  location: string;
  description: string;
  reportedAt: string;
  status: 'open' | 'dispatched' | 'resolved';
  aiResponse: string;
}

const incidentTypes: { type: IncidentType; label: string; emoji: string; color: string }[] = [
  { type: 'medical', label: 'Medical Emergency', emoji: '🚑', color: 'rose' },
  { type: 'fire', label: 'Fire / Smoke', emoji: '🔥', color: 'orange' },
  { type: 'security', label: 'Security Threat', emoji: '🚨', color: 'red' },
  { type: 'crowd', label: 'Crowd Crush Risk', emoji: '👥', color: 'amber' },
  { type: 'accessibility', label: 'Accessibility Assist', emoji: '♿', color: 'blue' },
  { type: 'other', label: 'Other Incident', emoji: '⚠️', color: 'slate' },
];

const aiResponses: Record<IncidentType, string> = {
  medical: 'Nearest AED is 42m away at Section 118 Column B. Medical team (Team 4) alerted — ETA 90 seconds. Clear 3m radius around patient. Direct crowd via Gate A North corridor.',
  fire: 'Activating Fire Suppression Zone 3. Evacuation route: North Gate → Meadowlands Bridge. Notifying NFPD. Sectoring off Sections 310–320. All fans in affected zone: please exit calmly.',
  security: 'Security incident logged. Dispatching 3 officers (Badge #218, #341, #502) to location. VIP suites locked down. CCTV feeds forwarded to command center. Do NOT engage suspect.',
  crowd: 'Crowd density exceeds 98% in reported zone. Activating one-way crowd flow protocol. Redirecting additional fans via alternate concourse. Opening emergency egress Gate F.',
  accessibility: 'Nearest volunteer with mobility cart: Elena R. (Volunteer #104) — 2 minutes away. Accessible restroom 30m at Section 228. Priority elevator reserved at North Concourse.',
  other: 'Incident logged and escalating to Venue Operations Center. Duty manager alerted. Please hold at location and wait for venue staff. ID #INC-2026-0042 assigned.',
};

const locations = [
  'Section 101 – Row 14', 'Section 214 – Concourse Level', 'Section 322 – Upper Deck',
  'Gate B – Security Checkpoint', 'Fan Plaza – East Stage', 'Parking Lot E – Transit Hub',
  'VIP Suite Level – West Wing', 'Medical Bay – Level 1', 'Main Concourse – Stand 7',
];

const liveIncidents: Incident[] = [
  {
    id: 'inc-001',
    type: 'crowd',
    severity: 'high',
    location: 'Section 322 – Upper Deck South',
    description: 'Overcrowding near concession stand after goal scored.',
    reportedAt: '3 mins ago',
    status: 'dispatched',
    aiResponse: aiResponses.crowd,
  },
  {
    id: 'inc-002',
    type: 'medical',
    severity: 'medium',
    location: 'Section 118 – Lower Bowl North',
    description: 'Fan reports dizziness, possible heat-related illness.',
    reportedAt: '8 mins ago',
    status: 'dispatched',
    aiResponse: aiResponses.medical,
  },
  {
    id: 'inc-003',
    type: 'accessibility',
    severity: 'low',
    location: 'Gate D – Plaza Entry',
    description: 'Wheelchair user requires escort to accessible seating.',
    reportedAt: '15 mins ago',
    status: 'resolved',
    aiResponse: aiResponses.accessibility,
  },
];

export const EmergencyPanel: React.FC<{ mode: 'fan' | 'organizer' | 'volunteer' }> = ({ mode }) => {
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('medium');
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>(liveIncidents);

  const handleSubmit = () => {
    if (!selectedType || !selectedLocation) return;
    const response = aiResponses[selectedType];
    setAiResponse(response);
    setSubmitted(true);

    // Add to live feed
    const newInc: Incident = {
      id: `inc-${Date.now()}`,
      type: selectedType,
      severity,
      location: selectedLocation,
      description: description || 'No description provided.',
      reportedAt: 'Just now',
      status: 'open',
      aiResponse: response,
    };
    setIncidents((prev) => [newInc, ...prev]);
  };

  const resolveIncident = (id: string) => {
    setIncidents((prev) => prev.map((i) => i.id === id ? { ...i, status: 'resolved' as const } : i));
  };

  const severityColor: Record<SeverityLevel, string> = {
    low: 'blue', medium: 'amber', high: 'orange', critical: 'rose',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Report Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-rose-500/30 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">
                {mode === 'fan' ? 'Report an Incident' : mode === 'volunteer' ? 'Volunteer Incident Report' : 'Emergency Command — File Incident'}
              </h4>
              <p className="text-xs text-slate-400">AI-triaged and auto-dispatched to nearest response team</p>
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Incident Type Grid */}
              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Incident Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {incidentTypes.map((it) => (
                    <button
                      key={it.type}
                      onClick={() => setSelectedType(it.type)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedType === it.type
                          ? `bg-${it.color}-500/20 border-${it.color}-500 shadow-md`
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl block mb-1">{it.emoji}</span>
                      <span className="text-xs font-bold text-slate-200">{it.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="">Select nearest location...</option>
                  {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Severity</label>
                <div className="flex space-x-2">
                  {(['low', 'medium', 'high', 'critical'] as SeverityLevel[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                        severity === s
                          ? `bg-${severityColor[s]}-500/20 border-${severityColor[s]}-500 text-${severityColor[s]}-400`
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Brief Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe what you see..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedType || !selectedLocation}
                className={`w-full py-3 font-black text-sm rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  selectedType && selectedLocation
                    ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <AlertOctagon className="w-5 h-5" />
                <span>Submit Emergency Report</span>
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold text-sm">Incident Reported — Response Dispatched</span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span className="text-xs font-bold text-rose-300">GenAI Emergency Action Plan</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{aiResponse}</p>
              </div>
              <button
                onClick={() => { setSubmitted(false); setSelectedType(null); setSelectedLocation(''); setDescription(''); }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all border border-slate-700"
              >
                Report Another Incident
              </button>
            </div>
          )}
        </div>

        {/* Right: Live Incident Feed */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
              <Siren className="w-4 h-4 text-rose-400" />
              <span>Live Incident Feed</span>
            </h4>
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-1 rounded-full font-bold">
              {incidents.filter((i) => i.status !== 'resolved').length} Active
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {incidents.map((inc) => {
              const typeInfo = incidentTypes.find((t) => t.type === inc.type)!;
              return (
                <div
                  key={inc.id}
                  className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                    inc.status === 'resolved' ? 'bg-slate-950/40 border-slate-800/60 opacity-60' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{typeInfo.emoji}</span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">{typeInfo.label}</h5>
                        <p className="text-[10px] text-slate-400">{inc.location}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className={`block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inc.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400'
                        : inc.status === 'dispatched' ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {inc.status === 'resolved' ? '✓ Resolved' : inc.status === 'dispatched' ? '🚀 Dispatched' : '⚡ Open'}
                      </span>
                      <span className="block text-[10px] text-slate-500">{inc.reportedAt}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">{inc.description}</p>
                  {inc.status !== 'resolved' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => resolveIncident(inc.id)}
                        className="text-[11px] px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-bold hover:bg-emerald-500/30 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
