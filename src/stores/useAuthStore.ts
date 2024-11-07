import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string;
  logout: () => void;
  login: (token: string) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      token: '',
      login: (token: string) => {
        set({ token });
      },
      logout: () => {
        set({ token: '' });
      },
    }),
    {
      name: 'token',
    },
  ),
);

export default useAuthStore;
