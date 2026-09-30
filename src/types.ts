export type UserRole = 'fan' | 'organizer' | 'volunteer' | 'ops' | 'schedule' | 'emergency';

export interface AlertItem {
  id: string;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  time: string;
  status: 'active' | 'resolving' | 'resolved';
  aiRecommendation: string;
  category: 'crowd' | 'transit' | 'security' | 'sustainability' | 'accessibility';
}

export interface GateStatus {
  gate: string;
  flowRate: number; // people per min
  queueTimeMin: number;
  status: 'optimal' | 'moderate' | 'congested';
  accessible: boolean;
}

export interface StadiumZone {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  tempCelsius: number;
  crowdSentiment: 'excited' | 'calm' | 'agitated';
  concessionWaitMin: number;
  restroomWaitMin: number;
}

export interface MatchInfo {
  matchId: string;
  teams: { home: string; away: string; homeFlag: string; awayFlag: string };
  score: { home: number; away: number };
  stadium: string;
  city: string;
  minute: number;
  status: 'LIVE' | 'UPCOMING' | 'HALFTIME' | 'FINISHED';
  attendance: number;
  weather: { temp: number; condition: string };
}
