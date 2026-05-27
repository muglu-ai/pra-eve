import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { AuthState, User, LoginCredentials, RegisterData, OtpVerification } from '../types/auth';
import { AuthService } from '../services/authService';

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' };

interface AuthContextValue extends AuthState {
  login: (creds: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<string>;
  verifyOtp: (data: OtpVerification) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: async () => {},
  register: async () => '',
  verifyOtp: async () => {},
  logout: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const user = await AuthService.getStoredUser();
        if (user && user.isVerified) {
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  const login = useCallback(async (creds: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await AuthService.login(creds);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Login failed' });
      throw err;
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<string> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await AuthService.register(data);
      dispatch({ type: 'SET_LOADING', payload: false });
      return result.email;
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Registration failed' });
      throw err;
    }
  }, []);

  const verifyOtp = useCallback(async (data: OtpVerification) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await AuthService.verifyOtp(data);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Verification failed' });
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    await AuthService.logout();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { ...state, login, register, verifyOtp, logout, clearError } },
    children,
  );
};

export const useAuth = () => useContext(AuthContext);
