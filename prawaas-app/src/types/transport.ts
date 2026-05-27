export interface FloorMapZone {
  id: string;
  name: string;
  type: 'hall' | 'conference' | 'lounge' | 'food' | 'registration' | 'parking' | 'restroom' | 'info';
  exhibitorCount?: number;
  description?: string;
}

export interface LiveUpdate {
  id: string;
  type: 'schedule_change' | 'announcement' | 'shuttle' | 'session_full' | 'weather' | 'general';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  icon: string;
}

export interface TransportInfo {
  id: string;
  type: 'shuttle' | 'metro' | 'bus' | 'taxi' | 'parking';
  name: string;
  description: string;
  schedule?: string;
  route?: string;
  status: 'running' | 'delayed' | 'stopped';
}

export interface EventStats {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'principal' | 'gold' | 'silver' | 'bronze' | 'partner';
  website?: string;
}
