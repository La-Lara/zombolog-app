import { createContext, useContext } from 'react';

import { UserSession } from '../types';

export type SessionContextValue = {
  isHydrated: boolean;
  session: UserSession | null;
  signIn: (session: UserSession) => void;
  signOut: () => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession() {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error('useSession must be used inside SessionProvider');
  }

  return value;
}
