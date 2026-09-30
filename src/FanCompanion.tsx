import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Zap, Utensils, Train, Radio, MessageSquare } from 'lucide-react';
import { mockGates, genAiKnowledgeBase } from './mockData';
import { TransitPlanner } from './TransitPlanner';
import { LiveMatchFeed } from './LiveMatchFeed';
import { ConcessionPreorder } from './ConcessionPreorder';
import canvasConfetti from 'canvas-confetti';

export const FanCompanion: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Welcome to MetLife Stadium! ⚽ I'm your FIFA 2026 GenAI Concierge. Ask me about queue times, fastest gates, food options, transit, or accessibility needs.",
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'food' | 'transit' | 'match'>('chat');

  const handleSend = () => {
    if (!query.trim()) return;
    const userText = query;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      const match = genAiKnowledgeBase.find((kb) => kb.keywords.some((k) => lower.includes(k)));
      const aiResponse = match
        ? match.response
        : "I'm scanning live stadium sensor feeds… Gate A (North) has the shortest queue (~4 mins). Stand 118 offers fast food service with halal & vegan options. Need directions to a specific section?";
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 900);
  };

  const triggerGoalCelebration = () => {
    canvasConfetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-4">
      {/* Tab Row */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'chat' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>AI Concierge</span>
        </button>

        <button
          onClick={() => setActiveTab('food')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'food' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Express Food Order</span>
        </button>

        <button
          onClick={() => setActiveTab('transit')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'transit' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Train className="w-3.5 h-3.5" />
          <span>Transit & Access</span>
        </button>

        <button
          onClick={() => setActiveTab('match')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'match' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-rose-400" />
          <span>Live Match Center</span>
        </button>
      </div>

      {/* Food Tab */}
      {activeTab === 'food' && <ConcessionPreorder />}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Panel */}
          <div className="lg:col-span-7 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl" style={{ height: 560 }}>
            {/* Chat Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Stadium GenAI Concierge</h3>
                  <p className="text-xs text-emerald-400 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    <span>Live Sensor Connected</span>
                  </p>
                </div>
              </div>
              <button
                onClick={triggerGoalCelebration}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs rounded-lg hover:brightness-110 transition-all shadow-md shadow-amber-500/20"
              >
                🎉 GOAL!
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 border-b border-slate-800/60 flex items-center space-x-2 overflow-x-auto text-xs">
              {[
                { label: '⚡ Shortest Gate?', q: 'Which gate has the fastest entry right now?' },
                { label: '🍔 Food & Diet Options', q: 'Where can I find halal or vegan concessions nearby?' },
                { label: '🚆 Transit After Match', q: 'How do I get to NJ Transit after the match?' },
                { label: '♿ Accessible Restroom', q: 'Where is the nearest wheelchair accessible restroom?' },
                { label: '🌱 Eco Info', q: 'Tell me about sustainability at this stadium.' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setQuery(chip.q)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 whitespace-nowrap transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md shadow-amber-500/10'
                      : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-md'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800 w-fit">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Scanning stadium telemetry...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about gates, food, transit, or accessibility..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button onClick={handleSend} className="p-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gate Wayfinding Panel */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-100 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Gate Wait-Time Telemetry</span>
                </h4>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">Live</span>
              </div>
              <div className="space-y-3">
                {mockGates.map((g, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        g.status === 'optimal' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                        : g.status === 'moderate' ? 'bg-amber-500'
                        : 'bg-rose-500 animate-pulse'
                      }`} />
                      <div>
                        <h5 className="text-xs font-semibold text-slate-200">{g.gate}</h5>
                        <p className="text-[11px] text-slate-400">Flow: {g.flowRate}/min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        g.status === 'optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : g.status === 'moderate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        ~{g.queueTimeMin} min
                      </span>
                      {g.accessible && <span className="block text-[10px] text-blue-400 mt-1">♿ Accessible</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-400">GenAI Tip:</strong> Gate A is 70% faster than Gate B right now. North Ramp elevator gives direct access to Sections 100–120.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transit Tab */}
      {activeTab === 'transit' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransitPlanner />
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="font-bold text-slate-100 text-sm">♿ Accessibility Services</h4>
            {[
              { title: 'Motorized Cart Escort', desc: 'Request a golf cart escort from any gate to your seat section.', status: 'Available', color: 'emerald' },
              { title: 'Sign Language Interpreter', desc: 'Live ASL & ISL interpreter service at Info Desk 2 (Sec 114).', status: 'On Duty', color: 'blue' },
              { title: 'Sensory Relief Room', desc: 'Quiet, low-stimulation space for fans with sensory sensitivities. Section 228.', status: 'Open', color: 'purple' },
              { title: 'Audio Description Headsets', desc: 'Free loan at the Accessibility Hub near Gate E.', status: 'Available', color: 'amber' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-start justify-between space-x-3">
                <div>
                  <h5 className="text-xs font-bold text-slate-200">{s.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-${s.color}-500/20 text-${s.color}-400 border border-${s.color}-500/30 whitespace-nowrap`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Match Tab */}
      {activeTab === 'match' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveMatchFeed />
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="font-bold text-slate-100 text-sm">📊 Match AI Analysis</h4>
            {[
              { label: 'Possession', home: 58, away: 42 },
              { label: 'Shots on Target', home: 7, away: 4 },
              { label: 'Passes Completed', home: 423, away: 318 },
              { label: 'Crowd Energy Index', home: 94, away: 88 },
            ].map((stat, i) => {
              const total = stat.home + stat.away;
              const homePct = Math.round((stat.home / total) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span className="text-blue-400">{stat.home}</span>
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="text-rose-400">{stat.away}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full rounded-l-full transition-all duration-700" style={{ width: `${homePct}%` }} />
                    <div className="bg-rose-500 h-full rounded-r-full transition-all duration-700" style={{ width: `${100 - homePct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-amber-400 font-bold">GenAI Prediction:</span> Based on current xG models and crowd momentum data, USA has a <span className="text-blue-400 font-bold">73% win probability</span> if they maintain possession in the final 22 minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
