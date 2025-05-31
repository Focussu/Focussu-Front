// stores/useUserStore.ts
import { create } from "zustand";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  description: string;
  profileImageUrl: string;
}

export interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
