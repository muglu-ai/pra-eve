export interface NetworkingSession {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  totalSeats: number;
  bookedSeats: number;
  host: SessionHost;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface SessionHost {
  id: string;
  name: string;
  avatar?: string;
  designation?: string;
  organization?: string;
}

export interface SessionBooking {
  id: string;
  sessionId: string;
  userId: string;
  bookedAt: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  seatNumber?: number;
}

export interface MeetingRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: MeetingParticipant;
  toUser: MeetingParticipant;
  proposedDate: string;
  proposedTime: string;
  duration: number; // minutes
  topic: string;
  message?: string;
  location?: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface MeetingParticipant {
  id: string;
  name: string;
  avatar?: string;
  category: string;
  designation?: string;
  organization?: string;
}

export interface MeetingSlot {
  date: string;
  time: string;
  isAvailable: boolean;
}

export type MeetingTab = 'upcoming' | 'pending' | 'past';
