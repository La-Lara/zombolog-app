import { UserSession } from '@/features/auth';

export function makeUserSession(overrides: Partial<UserSession> = {}): UserSession {
  return {
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token',
    user: {
      id: 'user-1',
      displayName: 'Sobrevivente',
      username: 'survivor',
    },
    ...overrides,
  };
}
