import React, { useState } from 'react';
import type { UserRole } from './types';
import { Header } from './Header';
import { FanCompanion } from './FanCompanion';
import { OrganizerCommand } from './OrganizerCommand';
import { VolunteerAssistant } from './VolunteerAssistant';
import { VenueOpsAi } from './VenueOpsAi';
import { TournamentSchedule } from './TournamentSchedule';
import { EmergencyPanel } from './EmergencyPanel';
import { mockMatchInfo } from './mockData';
import { Trophy, MapPin } from 'lucide-react';

export const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('fan');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Header with Switcher */}
      <Header
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Live Match Bar Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Match Score & Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full text-rose-400 text-xs font-extrabold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>LIVE • {mockMatchInfo.minute}'</span>
            </div>

            <div className="flex items-center space-x-3 text-sm font-extrabold text-white">
              <span className="flex items-center space-x-1">
                <span>{mockMatchInfo.teams.homeFlag}</span>
                <span>{mockMatchInfo.teams.home}</span>
              </span>
              <span className="bg-slate-800 px-3 py-0.5 rounded-lg text-amber-400 text-base font-black border border-slate-700">
                {mockMatchInfo.score.home} - {mockMatchInfo.score.away}
              </span>
              <span className="flex items-center space-x-1">
                <span>{mockMatchInfo.teams.away}</span>
                <span>{mockMatchInfo.teams.awayFlag}</span>
              </span>
            </div>
          </div>

          {/* Stadium Details */}
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{mockMatchInfo.stadium}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Attendance: {mockMatchInfo.attendance.toLocaleString()}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{mockMatchInfo.weather.condition} ({mockMatchInfo.weather.temp}°C)</span>
          </div>

        </div>
      </div>

      {/* Main Persona Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeRole === 'fan' && <FanCompanion />}
        {activeRole === 'organizer' && <OrganizerCommand />}
        {activeRole === 'volunteer' && <VolunteerAssistant />}
        {activeRole === 'ops' && <VenueOpsAi />}
        {activeRole === 'schedule' && <TournamentSchedule />}
        {activeRole === 'emergency' && <EmergencyPanel mode="fan" />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        <p>MatchPulse 2026 • GenAI Solution for FIFA World Cup Stadium Operations & Fan Experience</p>
      </footer>

    </div>
  );
};

export default App;
