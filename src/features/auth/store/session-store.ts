import { create } from 'zustand';

import { authApi } from '../api/auth-api';
import { sessionStorage } from '../storage/session-storage';
import { UserSession } from '../types';

type SessionState = {
  isHydrated: boolean;
  session: UserSession | null;
  hydrateSession: () => Promise<void>;
  setSession: (session: UserSession) => Promise<void>;
  clearSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  isHydrated: false,
  session: null,

  async hydrateSession() {
    try {
      const refreshToken = await sessionStorage.getRefreshToken();

      if (!refreshToken) {
        return;
      }

      const session = await authApi.refresh(refreshToken);
      set({ session });
      await sessionStorage.setRefreshToken(session.refreshToken);
    } catch {
      await sessionStorage.deleteRefreshToken();
      set({ session: null });
    } finally {
      set({ isHydrated: true });
    }
  },

  async setSession(session) {
    set({ session });
    await sessionStorage.setRefreshToken(session.refreshToken);
  },

  async clearSession() {
    const refreshToken = get().session?.refreshToken;
    set({ session: null });
    await sessionStorage.deleteRefreshToken();

    if (refreshToken) {
      try {
        await authApi.logout(refreshToken);
      } catch {
        // Logout local must succeed even if the backend is unavailable.
      }
    }
  },
}));
