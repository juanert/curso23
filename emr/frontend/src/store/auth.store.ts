import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  role: 'doctor' | 'admin';
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
