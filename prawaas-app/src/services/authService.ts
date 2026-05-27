import { User, LoginCredentials, RegisterData, OtpVerification } from '../types/auth';
import { SecureStorage } from './storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const DEMO_USERS: Record<string, User & { password: string }> = {
  'demo@prawaas.com': {
    id: 'u1',
    name: 'Tarun Sharma',
    email: 'demo@prawaas.com',
    phone: '+91 98765 43210',
    category: 'DELEGATE',
    designation: 'Transport Director',
    organization: 'Gujarat SRTU',
    isVerified: true,
    password: 'demo1234',
    token: 'demo-token-prawaas-2026',
  },
};

/**
 * Auth service — currently uses local demo data.
 * Replace method bodies with real API calls for production.
 */
export const AuthService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await simulateNetwork();

    const demoUser = DEMO_USERS[credentials.email.toLowerCase()];
    if (!demoUser || demoUser.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const { password, ...user } = demoUser;
    await SecureStorage.setItem(TOKEN_KEY, user.token || '');
    await SecureStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async register(data: RegisterData): Promise<{ email: string }> {
    await simulateNetwork();

    if (DEMO_USERS[data.email.toLowerCase()]) {
      throw new Error('An account with this email already exists');
    }

    const newUser: User & { password: string } = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: data.category,
      designation: data.designation,
      organization: data.organization,
      isVerified: false,
      password: data.password,
      token: `token-${Date.now()}`,
    };

    DEMO_USERS[data.email.toLowerCase()] = newUser;
    return { email: data.email };
  },

  async verifyOtp(verification: OtpVerification): Promise<User> {
    await simulateNetwork();

    const demoUser = DEMO_USERS[verification.email.toLowerCase()];
    if (!demoUser) {
      throw new Error('User not found');
    }

    if (verification.otp !== '123456') {
      throw new Error('Invalid OTP. Use 123456 for demo.');
    }

    demoUser.isVerified = true;
    const { password, ...user } = demoUser;
    await SecureStorage.setItem(TOKEN_KEY, user.token || '');
    await SecureStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async resendOtp(email: string): Promise<void> {
    await simulateNetwork();
  },

  async getStoredUser(): Promise<User | null> {
    const json = await SecureStorage.getItem(USER_KEY);
    if (!json) return null;
    try {
      return JSON.parse(json) as User;
    } catch {
      return null;
    }
  },

  async getToken(): Promise<string | null> {
    return SecureStorage.getItem(TOKEN_KEY);
  },

  async logout(): Promise<void> {
    await SecureStorage.removeItem(TOKEN_KEY);
    await SecureStorage.removeItem(USER_KEY);
  },

  async updateProfile(user: Partial<User>): Promise<User> {
    await simulateNetwork();
    const currentJson = await SecureStorage.getItem(USER_KEY);
    if (!currentJson) throw new Error('Not authenticated');
    const current = JSON.parse(currentJson) as User;
    const updated = { ...current, ...user };
    await SecureStorage.setItem(USER_KEY, JSON.stringify(updated));
    return updated;
  },
};

function simulateNetwork(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 600));
}
