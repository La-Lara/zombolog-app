import { PropsWithChildren, useMemo, useState } from 'react';

import { SessionContext } from '../hooks/use-session';
import { UserSession } from '../types';

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<UserSession | null>(null);

  const value = useMemo(
    () => ({
      isHydrated: true,
      session,
      signIn: setSession,
      signOut: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
