// stores/authStore.ts
import { create } from 'zustand';
import type { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
  role: 'owner' | 'renter' | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: 'owner' | 'renter' | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
}));