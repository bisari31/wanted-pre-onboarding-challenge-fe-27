import { AUTH_KEY_NAME } from '@/lib/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  credentials: string;
  logout: () => void;
  login: (value: string) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      credentials: '',
      login: (value: string) => {
        set({ credentials: value });
      },
      logout: () => {
        set({ credentials: '' });
      },
    }),
    {
      name: AUTH_KEY_NAME,
    },
  ),
);

export default useAuthStore;
