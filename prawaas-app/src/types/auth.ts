export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  category: string;
  designation?: string;
  organization?: string;
  bio?: string;
  isVerified: boolean;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  category: string;
  designation?: string;
  organization?: string;
}

export interface OtpVerification {
  email: string;
  otp: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
