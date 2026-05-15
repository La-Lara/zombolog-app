import { useSessionStore } from './session-store';

describe('session store', () => {
  beforeEach(() => {
    useSessionStore.setState({
      isHydrated: false,
      session: null,
    });
  });

  it('persists and clears a session', async () => {
    await useSessionStore.getState().setSession({
      accessToken: 'access',
      refreshToken: 'refresh.survivor',
      user: {
        id: 'user-1',
        displayName: 'Survivor',
        username: 'survivor',
      },
    });

    expect(useSessionStore.getState().session?.user.username).toBe('survivor');

    await useSessionStore.getState().clearSession();

    expect(useSessionStore.getState().session).toBeNull();
  });

  it('hydrates from a stored refresh token', async () => {
    await useSessionStore.getState().setSession({
      accessToken: 'access',
      refreshToken: 'local-refresh-token.hydrated',
      user: {
        id: 'user-1',
        displayName: 'Hydrated',
        username: 'hydrated',
      },
    });
    useSessionStore.setState({
      isHydrated: false,
      session: null,
    });

    await useSessionStore.getState().hydrateSession();

    expect(useSessionStore.getState().isHydrated).toBe(true);
    expect(useSessionStore.getState().session?.user.username).toBe('hydrated');
  });
});
