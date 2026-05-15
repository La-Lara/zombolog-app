import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';

import { AuthCredentials, RegisterCredentials, UserSession } from '../types';

type UserDto = {
  id: string;
  display_name: string;
  username: string;
};

type AuthResponseDto = {
  access_token: string;
  refresh_token: string;
  user: UserDto;
};

function toUserSession(dto: AuthResponseDto): UserSession {
  return {
    accessToken: dto.access_token,
    refreshToken: dto.refresh_token,
    user: {
      id: dto.user.id,
      displayName: dto.user.display_name,
      username: dto.user.username,
    },
  };
}

export const authApi = {
  async login(credentials: AuthCredentials) {
    if (!env.apiBaseUrl) {
      return createLocalSession({
        displayName: credentials.username,
        username: credentials.username,
      });
    }

    const response = await httpClient.post<AuthResponseDto>('/auth/login', credentials);

    return toUserSession(response);
  },

  async register(credentials: RegisterCredentials) {
    if (!env.apiBaseUrl) {
      return createLocalSession(credentials);
    }

    const response = await httpClient.post<AuthResponseDto>('/auth/register', credentials);

    return toUserSession(response);
  },

  async refresh(refreshToken: string) {
    if (!env.apiBaseUrl) {
      return createLocalSession({
        displayName: 'Sobrevivente',
        username: getUsernameFromRefreshToken(refreshToken),
      });
    }

    const response = await httpClient.post<AuthResponseDto>('/auth/refresh', {
      refreshToken,
    });

    return toUserSession(response);
  },

  async logout(refreshToken: string) {
    if (!env.apiBaseUrl) {
      return;
    }

    await httpClient.post('/auth/logout', { refreshToken });
  },
};

function createLocalSession(user: { displayName: string; username: string }): UserSession {
  const username = user.username.trim().toLowerCase();

  return {
    accessToken: `local-access-token.${username}`,
    refreshToken: `local-refresh-token.${username}`,
    user: {
      id: `local-user.${username}`,
      displayName: user.displayName.trim(),
      username,
    },
  };
}

function getUsernameFromRefreshToken(refreshToken: string) {
  return refreshToken.split('.').at(1) ?? 'survivor';
}
