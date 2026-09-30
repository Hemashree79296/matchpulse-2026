import React, { useState } from 'react';
import { mockVolunteerTasks } from './mockData';
import { UserCheck, CheckCircle2, MapPin, Languages, Sparkles, HeartHandshake } from 'lucide-react';

export const VolunteerAssistant: React.FC = () => {
  const [tasks, setTasks] = useState(mockVolunteerTasks);
  const [translatedText, setTranslatedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('Spanish');

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    if (targetLang === 'Spanish') {
      setTranslatedText(`¡Hola! Bienvenido al Estadio MetLife. ¿En qué puedo ayudarle hoy? (${inputText})`);
    } else if (targetLang === 'French') {
      setTranslatedText(`Bonjour! Bienvenue au Stade MetLife. Comment puis-je vous aider aujourd'hui? (${inputText})`);
    } else {
      setTranslatedText(`مرحباً بك في ملعب ميتلايف! كيف يمكنني مساعدتك اليوم؟ (${inputText})`);
    }
  };

  const markCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Completed' } : t))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Volunteer Task Dispatch */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Volunteer #104 (Elena R.) - Zone B Field Guide</h3>
              <p className="text-xs text-blue-400 font-medium">Assigned Area: Gate B & Section 110-130</p>
            </div>
          </div>

          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1 rounded-full font-bold">
            Active Shift
          </span>
        </div>

        <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider pt-2">Your GenAI Assigned Tasks</h4>

        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                t.status === 'Completed'
                  ? 'bg-slate-950/50 border-slate-800 opacity-60'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.priority === 'High'
                        ? 'bg-rose-500/20 text-rose-400'
                        : t.priority === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {t.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{t.location}</span>
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-100">{t.title}</h5>
              </div>

              {t.status === 'Completed' ? (
                <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </span>
              ) : (
                <button
                  onClick={() => markCompleted(t.id)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-blue-600/20"
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Multilingual Instant Speech/Text AI Translator */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Languages className="w-5 h-5 text-blue-400" />
            <h4 className="font-bold text-slate-100 text-sm">Multilingual Volunteer AI Interpreter</h4>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Translate fan questions instantly across 12 World Cup languages using GenAI context awareness.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Target Language</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="Arabic">Arabic (العربية)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Enter Fan Prompt or Speak</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. Welcome to MetLife Stadium! Please show your digital match ticket..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleTranslate}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Translate with GenAI Context</span>
            </button>

            {translatedText && (
              <div className="bg-slate-950 border border-blue-500/30 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">AI Translated Output ({targetLang})</span>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">{translatedText}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between text-xs text-blue-300">
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-4 h-4 text-blue-400" />
            <span>Need Supervisor Assistance?</span>
          </div>
          <button className="px-2.5 py-1 bg-blue-500 text-slate-950 font-bold rounded-lg hover:bg-blue-400 transition-colors text-[11px]">
            Call Ops Center
          </button>
        </div>

      </div>

    </div>
  );
};
