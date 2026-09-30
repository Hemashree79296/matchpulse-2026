import React, { useState } from 'react';
import type { UserRole } from './types';
import { Sparkles, Shield, Compass, UserCheck, Activity, Globe, Volume2, Trophy, AlertOctagon } from 'lucide-react';

interface NavigationProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const Header: React.FC<NavigationProps> = ({
  activeRole,
  onRoleChange,
  selectedLanguage,
  onLanguageChange
}) => {
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const languages = [
    { code: 'en', label: 'English 🇺🇸' },
    { code: 'es', label: 'Español 🇲🇽' },
    { code: 'fr', label: 'Français 🇫🇷' },
    { code: 'de', label: 'Deutsch 🇩🇪' },
    { code: 'pt', label: 'Português 🇧🇷' },
    { code: 'ar', label: 'العربية 🇸🇦' },
    { code: 'ja', label: '日本語 🇯🇵' }
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onRoleChange('fan')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">MatchPulse</span>
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                  FIFA 2026 AI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">MetLife Stadium • East Rutherford, NJ</p>
            </div>
          </div>

          {/* Persona & Feature Switcher Tabs */}
          <nav className="flex items-center bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
            <button
              onClick={() => onRoleChange('fan')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'fan'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Fan Companion</span>
            </button>

            <button
              onClick={() => onRoleChange('organizer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'organizer'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Command Center</span>
            </button>

            <button
              onClick={() => onRoleChange('volunteer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'volunteer'
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Volunteer</span>
            </button>

            <button
              onClick={() => onRoleChange('ops')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'ops'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Venue Ops AI</span>
            </button>

            <button
              onClick={() => onRoleChange('schedule')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'schedule'
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>16 Venues</span>
            </button>

            <button
              onClick={() => onRoleChange('emergency')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'emergency'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Emergency SOS</span>
            </button>
          </nav>

          {/* Right Utilities (Language & Voice) */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-1 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Globe className="w-4 h-4 text-slate-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Accessibility Audio Toggle */}
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title="Text-to-Speech Accessibility Mode"
              className={`p-2 rounded-lg border text-xs flex items-center space-x-1 transition-all ${
                ttsEnabled
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden xl:inline">{ttsEnabled ? 'Audio On' : 'Audio Off'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
