export interface Conversation {
  id: string;
  participants: ChatParticipant[];
  lastMessage: ChatMessage | null;
  unreadCount: number;
  updatedAt: string;
  type: 'direct' | 'group';
  groupName?: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  category?: string;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'meeting_invite' | 'system';
  meetingInvite?: MeetingInvitePayload;
}

export interface MeetingInvitePayload {
  meetingId: string;
  topic: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}
