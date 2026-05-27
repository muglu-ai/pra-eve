export interface EventConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: VenueConfig;
  organizer: string;
  logo: string;
  bannerImages: string[];
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
  features: FeatureFlags;
  theme: ThemeConfig;
}

export interface VenueConfig {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  mapUrl: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  website?: string;
}

export interface ContactInfo {
  organization: string;
  address: string;
  phone: string;
  email?: string;
}

export interface FeatureFlags {
  enableQR: boolean;
  enableScanQR: boolean;
  enableResources: boolean;
  enableContactUs: boolean;
  enableDigiyatra: boolean;
  enablePolls: boolean;
  enableMyWallet: boolean;
  enableMyMeetings: boolean;
  enableChatBot: boolean;
}

export interface ThemeConfig {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  cardBackground: string;
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
  badgeColors: Record<string, string>;
}

export interface AgendaDay {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  sessions: Session[];
}

export interface Session {
  id: string;
  time: string;
  title: string;
  hall?: string;
  description?: string;
  speakers?: Speaker[];
  type?: 'plenary' | 'parallel' | 'break' | 'ceremony' | 'networking';
}

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  organization: string;
  avatar: string;
  bio?: string;
}

export interface CommunityPost {
  id: string;
  author: PostAuthor;
  content: string;
  images: string[];
  timestamp: string;
  reactions: Reaction[];
  commentCount: number;
  type: 'post' | 'poll';
  pollOptions?: PollOption[];
}

export interface PostAuthor {
  name: string;
  avatar: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  isSelected?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  isSelected?: boolean;
}

export interface Person {
  id: string;
  name: string;
  avatar: string;
  category: string;
  designation?: string;
  organization?: string;
}

export interface Exhibitor {
  id: string;
  name: string;
  logo: string;
  hall: string;
  booth: string;
  description?: string;
  website?: string;
  category?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant: 'filled' | 'outlined';
  onPress?: () => void;
}

export interface TabConfig {
  key: string;
  label: string;
  icon: string;
  activeIcon: string;
}

export interface FilterChip {
  key: string;
  label: string;
}
