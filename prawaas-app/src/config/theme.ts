import { ThemeConfig } from '../types';

export const defaultTheme: ThemeConfig = {
  primary: '#0D1B4C',
  primaryDark: '#070F2B',
  secondary: '#2563EB',
  accent: '#F97316',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  cardBackground: '#FFFFFF',
  tabBarBackground: '#FFFFFF',
  tabBarActive: '#0D1B4C',
  tabBarInactive: '#94A3B8',
  badgeColors: {
    DELEGATE: '#059669',
    SERVICES: '#D97706',
    SPEAKER: '#7C3AED',
    EXHIBITOR: '#2563EB',
    ORGANIZER: '#DC2626',
    VIP: '#9333EA',
    MEDIA: '#DB2777',
    STARTUP: '#0D9488',
    INVESTOR: '#EA580C',
    ACADEMIA: '#0284C7',
    ADMIN: '#475569',
    GOVERNMENT: '#1D4ED8',
    OEM: '#0891B2',
    TECHNOLOGY: '#6366F1',
    DEFAULT: '#64748B',
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
