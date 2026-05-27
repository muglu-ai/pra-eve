import { FloorMapZone, LiveUpdate, TransportInfo, EventStats } from '../types/transport';

export const eventStats: EventStats[] = [
  { label: 'States & UTs', value: '36', icon: 'flag-outline', color: '#2563EB' },
  { label: 'Industry Delegates', value: '1,500+', icon: 'people-outline', color: '#7C3AED' },
  { label: 'Bus & Car Operators', value: '10,000+', icon: 'bus-outline', color: '#059669' },
  { label: 'Expert Speakers', value: '60+', icon: 'mic-outline', color: '#D97706' },
  { label: 'Leading Exhibitors', value: '300+', icon: 'business-outline', color: '#DC2626' },
  { label: 'Business Visitors', value: '15,000+', icon: 'briefcase-outline', color: '#0D9488' },
];

export const impactMetrics = [
  { label: 'EV Buses Showcased', value: '45+', icon: '🚌', color: '#059669' },
  { label: 'Green Tech Innovations', value: '120+', icon: '🌱', color: '#16A34A' },
  { label: 'CO₂ Saved (tonnes)', value: '85', icon: '🌍', color: '#0D9488' },
  { label: 'B2B Deals Initiated', value: '300+', icon: '🤝', color: '#2563EB' },
];

export const evShowcase = [
  { id: 'ev1', name: 'Tata Starbus EV', type: 'Electric Bus', range: '250 km', charging: '2.5 hrs', capacity: '45 seats', exhibitor: 'Tata Motors', hall: 'Hall 1', highlight: true },
  { id: 'ev2', name: 'Olectra K9', type: 'Electric Bus', range: '300 km', charging: '3 hrs', capacity: '40 seats', exhibitor: 'Olectra Greentech', hall: 'Hall 2', highlight: false },
  { id: 'ev3', name: 'BYD K7M', type: 'Electric Midi Bus', range: '220 km', charging: '2 hrs', capacity: '28 seats', exhibitor: 'BYD India', hall: 'Hall 2', highlight: true },
  { id: 'ev4', name: 'Switch EiV 12', type: 'Electric Bus', range: '280 km', charging: '2.5 hrs', capacity: '40 seats', exhibitor: 'Switch Mobility', hall: 'Hall 2', highlight: false },
  { id: 'ev5', name: 'PMI Foton', type: 'Electric Bus', range: '200 km', charging: '2 hrs', capacity: '35 seats', exhibitor: 'PMI Electro', hall: 'Hall 2', highlight: false },
];

export const aiRecommendations = [
  { id: 'rec1', type: 'session', title: 'EV Captains Roundtable', reason: 'Based on your interest in Electric Vehicles', icon: 'flash-outline', color: '#059669' },
  { id: 'rec2', type: 'person', title: 'Priya Menon — NITI Aayog', reason: 'Policy expert matching your profile', icon: 'person-outline', color: '#7C3AED' },
  { id: 'rec3', type: 'exhibitor', title: 'Olectra Greentech', reason: 'Top EV bus manufacturer in your sector', icon: 'business-outline', color: '#2563EB' },
  { id: 'rec4', type: 'session', title: 'Smart Mobility Solutions', reason: 'Trending session with 85% interest match', icon: 'trending-up-outline', color: '#D97706' },
];

export const sponsorTiers = [
  { tier: 'Principal Partner', sponsors: [{ id: 'sp1', name: 'GSRTC', logo: '' }] },
  { tier: 'Gold Partners', sponsors: [{ id: 'sp2', name: 'Tata Motors', logo: '' }, { id: 'sp3', name: 'Ashok Leyland', logo: '' }] },
  { tier: 'EV Partner', sponsors: [{ id: 'sp4', name: 'Olectra Greentech', logo: '' }, { id: 'sp5', name: 'BYD India', logo: '' }] },
  { tier: 'Technology Partner', sponsors: [{ id: 'sp6', name: 'KPIT Technologies', logo: '' }, { id: 'sp7', name: 'Chalo', logo: '' }] },
];

export const floorMapZones: FloorMapZone[] = [
  { id: 'z1', name: 'Hall 1 — OEM & Buses', type: 'hall', exhibitorCount: 45, description: 'Bus manufacturers, chassis & body builders' },
  { id: 'z2', name: 'Hall 2 — EV & Green Mobility', type: 'hall', exhibitorCount: 38, description: 'Electric vehicles, charging infra, batteries' },
  { id: 'z3', name: 'Hall 3 — Technology & Startups', type: 'hall', exhibitorCount: 52, description: 'Mobility tech, fleet management, ticketing' },
  { id: 'z4', name: 'Conference Centre', type: 'conference', description: 'Main stage, plenary sessions, panels' },
  { id: 'z5', name: 'Networking Lounge', type: 'lounge', description: 'B2B meetings, speed networking, VIP lounge' },
  { id: 'z6', name: 'Food Court', type: 'food', description: 'Multi-cuisine dining area' },
  { id: 'z7', name: 'Registration & Info', type: 'registration', description: 'Badge collection, help desk' },
  { id: 'z8', name: 'Parking Zone', type: 'parking', description: 'EV charging points available' },
];

export const liveUpdates: LiveUpdate[] = [
  {
    id: 'lu1', type: 'announcement', title: 'Welcome to Prawaas 5.0!',
    message: 'Registration desk opens at 9:00 AM. Collect your badge at Hall entrance.',
    timestamp: '2026-07-09T08:00:00Z', priority: 'high', icon: 'megaphone-outline',
  },
  {
    id: 'lu2', type: 'shuttle', title: 'Airport Shuttle Active',
    message: 'Free shuttle buses running every 30 min from Ahmedabad Airport to HEC.',
    timestamp: '2026-07-09T07:00:00Z', priority: 'medium', icon: 'bus-outline',
  },
  {
    id: 'lu3', type: 'schedule_change', title: 'Session Update',
    message: 'EV Captains Roundtable moved to 4:00 PM (from 4:30 PM) in Hall 1.',
    timestamp: '2026-07-10T09:00:00Z', priority: 'high', icon: 'time-outline',
  },
  {
    id: 'lu4', type: 'session_full', title: 'CEO Roundtable — Full',
    message: 'The CEO Roundtable networking session is now fully booked. Waitlist open.',
    timestamp: '2026-07-09T11:00:00Z', priority: 'medium', icon: 'alert-circle-outline',
  },
  {
    id: 'lu5', type: 'general', title: 'EV Charging Available',
    message: 'Free EV charging at Parking Zone. 12 DC fast chargers + 20 AC chargers.',
    timestamp: '2026-07-09T08:30:00Z', priority: 'low', icon: 'flash-outline',
  },
];

export const transportInfo: TransportInfo[] = [
  {
    id: 't1', type: 'shuttle', name: 'Airport Shuttle',
    description: 'Ahmedabad Airport ↔ HEC Gandhinagar', schedule: 'Every 30 min, 7 AM – 9 PM',
    route: 'Airport Terminal 1 → HEC Gate 1', status: 'running',
  },
  {
    id: 't2', type: 'shuttle', name: 'Hotel Shuttle',
    description: 'Partner Hotels ↔ HEC Gandhinagar', schedule: 'Every 45 min, 8 AM – 8 PM',
    route: 'Hotel Zone → HEC Gate 2', status: 'running',
  },
  {
    id: 't3', type: 'metro', name: 'Gandhinagar Metro',
    description: 'Nearest station: Sector 17 (500m walk)', schedule: '6 AM – 11 PM',
    status: 'running',
  },
  {
    id: 't4', type: 'parking', name: 'On-site Parking',
    description: '2000+ spots · 12 DC fast + 20 AC EV chargers', status: 'running',
  },
];
