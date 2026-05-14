import { PropsWithChildren, useEffect } from 'react';

import { useSessionStore } from '../store/session-store';

export function SessionProvider({ children }: PropsWithChildren) {
  const hydrateSession = useSessionStore((state) => state.hydrateSession);

  useEffect(() => {
    void hydrateSession();
  }, [hydrateSession]);

  return children;
}
