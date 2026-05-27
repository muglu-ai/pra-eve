import { Platform } from 'react-native';

const memoryStore: Record<string, string> = {};

/**
 * Simple cross-platform secure storage abstraction.
 * On native, this can be swapped with expo-secure-store.
 * On web it uses localStorage with a fallback to in-memory.
 */
export const SecureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      } else {
        memoryStore[key] = value;
      }
    } catch {
      memoryStore[key] = value;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return memoryStore[key] ?? null;
    } catch {
      return memoryStore[key] ?? null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
      delete memoryStore[key];
    } catch {
      delete memoryStore[key];
    }
  },

  async clear(): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      Object.keys(memoryStore).forEach((k) => delete memoryStore[k]);
    } catch {
      Object.keys(memoryStore).forEach((k) => delete memoryStore[k]);
    }
  },
};
