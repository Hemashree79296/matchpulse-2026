import type { MatchInfo, GateStatus, StadiumZone, AlertItem } from './types';

export const mockMatchInfo: MatchInfo = {
  matchId: 'WC2026-M48',
  teams: {
    home: 'USA',
    away: 'MEXICO',
    homeFlag: '🇺🇸',
    awayFlag: '🇲🇽'
  },
  score: { home: 2, away: 1 },
  stadium: 'MetLife Stadium (East Rutherford, NJ)',
  city: 'New York / New Jersey',
  minute: 68,
  status: 'LIVE',
  attendance: 82500,
  weather: { temp: 24, condition: 'Clear Skies ☀️' }
};

export const mockGates: GateStatus[] = [
  { gate: 'Gate A (Main North)', flowRate: 340, queueTimeMin: 4, status: 'optimal', accessible: true },
  { gate: 'Gate B (East Express)', flowRate: 520, queueTimeMin: 14, status: 'congested', accessible: true },
  { gate: 'Gate C (South VIP & Media)', flowRate: 180, queueTimeMin: 2, status: 'optimal', accessible: true },
  { gate: 'Gate D (West Shuttle Hub)', flowRate: 410, queueTimeMin: 8, status: 'moderate', accessible: false },
  { gate: 'Gate E (Accessibility Special Access)', flowRate: 120, queueTimeMin: 1, status: 'optimal', accessible: true },
];

export const mockZones: StadiumZone[] = [
  { id: 'sec-100', name: 'Lower Bowl North (Sec 101-120)', capacity: 20000, currentOccupancy: 19400, tempCelsius: 22.4, crowdSentiment: 'excited', concessionWaitMin: 6, restroomWaitMin: 3 },
  { id: 'sec-200', name: 'Club Level East (Sec 201-230)', capacity: 15000, currentOccupancy: 14200, tempCelsius: 21.0, crowdSentiment: 'excited', concessionWaitMin: 2, restroomWaitMin: 1 },
  { id: 'sec-300', name: 'Upper Deck South (Sec 301-340)', capacity: 30000, currentOccupancy: 29800, tempCelsius: 25.1, crowdSentiment: 'agitated', concessionWaitMin: 18, restroomWaitMin: 12 },
  { id: 'fan-zone', name: 'Outer Fan Plaza & Stage', capacity: 18000, currentOccupancy: 15600, tempCelsius: 26.5, crowdSentiment: 'excited', concessionWaitMin: 8, restroomWaitMin: 5 },
];

export const mockAlerts: AlertItem[] = [
  {
    id: 'alt-001',
    title: 'High Concession Queue Bottleneck',
    location: 'Upper Deck South Plaza (Gate B Corridor)',
    severity: 'high',
    time: '2 mins ago',
    status: 'active',
    aiRecommendation: 'Dispatch 4 roving vendors with mobile POS units to Section 322; broadcast digital signage redirection to Lower Level Stand 14.',
    category: 'crowd'
  },
  {
    id: 'alt-002',
    title: 'Shuttle Bus Delay - Secaucus Express',
    location: 'Outer Transit Hub Bay 4',
    severity: 'medium',
    time: '7 mins ago',
    status: 'resolving',
    aiRecommendation: 'Activate reserve fleet of 6 electric shuttles from Lot K. Send push alert to fans exiting North Gate recommending NJ Transit Rail.',
    category: 'transit'
  },
  {
    id: 'alt-003',
    title: 'Wheelchair Ramp Assist Requested',
    location: 'Gate D Plaza Entry',
    severity: 'low',
    time: '12 mins ago',
    status: 'active',
    aiRecommendation: 'Assign nearest volunteer (Volunteer #104 - Elena R.) to meet fan at Security Bay D3 with motorized cart.',
    category: 'accessibility'
  },
  {
    id: 'alt-004',
    title: 'HVAC Airflow Anomaly',
    location: 'Concourse Level 2 - Section 214',
    severity: 'medium',
    time: '18 mins ago',
    status: 'active',
    aiRecommendation: 'Increase chiller output by 12% in Zone B4; open automated natural ventilation louver #8.',
    category: 'sustainability'
  }
];

export const mockVolunteerTasks = [
  { id: 'vt-101', title: 'Assist Family with Stroller at Gate B', location: 'Gate B Security', priority: 'High', status: 'Pending' },
  { id: 'vt-102', title: 'Multilingual Support (Spanish/English) at Info Desk 3', location: 'Section 114 Info Desk', priority: 'Medium', status: 'In Progress' },
  { id: 'vt-103', title: 'Restroom Accessibility Audit Check', location: 'Upper Concourse West', priority: 'Low', status: 'Completed' }
];

export const genAiKnowledgeBase = [
  {
    keywords: ['gate', 'entry', 'queue', 'line', 'entrance'],
    response: "Gate A (Main North) currently has the lowest wait time (~4 minutes). Gate B is experiencing heavy traffic (~14 minutes wait). If you have accessible seating needs, Gate E is wide open with priority lanes."
  },
  {
    keywords: ['food', 'beer', 'taco', 'drink', 'snack', 'concession', 'eat', 'hungry'],
    response: "For fastest food service, check out 'MetLife Express Grab-N-Go' at Section 118 (Wait: ~2 mins). Halal options are available at Stand 105, and Gluten-Free/Vegan concessions are located near Section 204."
  },
  {
    keywords: ['train', 'bus', 'transit', 'uber', 'parking', 'transport', 'shuttle', 'exit'],
    response: "Post-match transit tip: NJ Transit rail lines will run every 6 minutes from Meadowlands Station. Shuttle express to Secaucus Junction is currently on 8-minute turnaround. Rideshare pickup is located strictly at Lot E-4."
  },
  {
    keywords: ['restroom', 'bathroom', 'toilet', 'accessible'],
    response: "All restrooms on Club Level (200s) have under 2-minute wait times. Family and gender-neutral accessible restrooms are situated next to Sections 108, 128, 214, and 330."
  },
  {
    keywords: ['sustainability', 'recycle', 'trash', 'green', 'eco', 'water'],
    response: "MetLife Stadium is 100% powered by renewable energy for FIFA World Cup 2026. Water refill stations are free near every main tunnel. Please sort compostable packaging into green bins!"
  }
];
