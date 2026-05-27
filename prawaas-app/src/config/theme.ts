import { ThemeConfig } from '../types';

export const defaultTheme: ThemeConfig = {
  primary: '#1B0A5C',
  primaryDark: '#0F0636',
  secondary: '#4A3AFF',
  accent: '#FF6B35',
  background: '#F5F5FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  cardBackground: '#FFFFFF',
  tabBarBackground: '#FFFFFF',
  tabBarActive: '#1B0A5C',
  tabBarInactive: '#9CA3AF',
  badgeColors: {
    DELEGATE: '#10B981',
    SERVICES: '#F59E0B',
    SPEAKER: '#6366F1',
    EXHIBITOR: '#3B82F6',
    ORGANIZER: '#EF4444',
    VIP: '#8B5CF6',
    MEDIA: '#EC4899',
    STARTUP: '#14B8A6',
    INVESTOR: '#F97316',
    ACADEMIA: '#0EA5E9',
    ADMIN: '#64748B',
    DEFAULT: '#6B7280',
  },
};

export const createTheme = (overrides: Partial<ThemeConfig> = {}): ThemeConfig => ({
  ...defaultTheme,
  ...overrides,
  badgeColors: {
    ...defaultTheme.badgeColors,
    ...overrides.badgeColors,
  },
});
