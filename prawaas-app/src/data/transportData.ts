import { FloorMapZone, LiveUpdate, TransportInfo, EventStats } from '../types/transport';

export const eventStats: EventStats[] = [
  { label: 'States & UTs', value: '36', icon: 'flag-outline', color: '#2563EB' },
  { label: 'Industry Delegates', value: '1,500+', icon: 'people-outline', color: '#7C3AED' },
  { label: 'Bus & Car Operators', value: '10,000+', icon: 'bus-outline', color: '#059669' },
  { label: 'Expert Speakers', value: '60+', icon: 'mic-outline', color: '#D97706' },
  { label: 'Leading Exhibitors', value: '300+', icon: 'business-outline', color: '#DC2626' },
  { label: 'Business Visitors', value: '15,000+', icon: 'briefcase-outline', color: '#0D9488' },
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
    id: 'lu2', type: 'shuttle', title: 'Shuttle from Airport',
    message: 'Free shuttle buses run every 30 min from Ahmedabad Airport to HEC Gandhinagar.',
    timestamp: '2026-07-09T07:00:00Z', priority: 'medium', icon: 'bus-outline',
  },
  {
    id: 'lu3', type: 'schedule_change', title: 'Session Update',
    message: 'EV Captains Roundtable moved to 4:00 PM (from 4:30 PM) in Hall 1.',
    timestamp: '2026-07-10T09:00:00Z', priority: 'high', icon: 'time-outline',
  },
  {
    id: 'lu4', type: 'session_full', title: 'CEO Roundtable — Full',
    message: 'The CEO Roundtable networking session is now fully booked. Waitlist available.',
    timestamp: '2026-07-09T11:00:00Z', priority: 'medium', icon: 'alert-circle-outline',
  },
  {
    id: 'lu5', type: 'general', title: 'Charging Stations',
    message: 'Free EV charging available at Parking Zone. See floor map for locations.',
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
    description: '2000+ spots with EV charging at Parking Zone', status: 'running',
  },
];
