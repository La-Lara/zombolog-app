import { UserSession } from '@/features/auth';

export function makeUserSession(overrides: Partial<UserSession> = {}): UserSession {
  return {
    accessToken: 'test-access-token',
    user: {
      id: 'user-1',
      displayName: 'Sobrevivente',
      username: 'survivor',
    },
    ...overrides,
  };
}
