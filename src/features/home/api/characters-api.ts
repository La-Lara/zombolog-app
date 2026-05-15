import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';

import { CharacterStatus, CharacterSummary } from '../types';

type CharacterSummaryDto = {
  id: string;
  name: string;
  profession: string;
  status: CharacterStatus;
  avatar_id?: string | null;
  current_city: string;
  days_alive: number;
  zombies_killed: number;
};

type ListCharactersParams = {
  accessToken?: string;
  ownerId: string;
};

function toCharacterSummary(dto: CharacterSummaryDto): CharacterSummary {
  return {
    id: dto.id,
    name: dto.name,
    profession: dto.profession,
    status: dto.status,
    avatarId: dto.avatar_id,
    currentCity: dto.current_city,
    daysAlive: dto.days_alive,
    zombiesKilled: dto.zombies_killed,
  };
}

export const charactersApi = {
  async listCharacters({ accessToken, ownerId }: ListCharactersParams) {
    if (!env.apiBaseUrl) {
      return getLocalCharacters(ownerId);
    }

    const response = await httpClient.get<CharacterSummaryDto[]>(
      `/characters?ownerId=${encodeURIComponent(ownerId)}`,
      {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      },
    );

    return response.map(toCharacterSummary);
  },
};

function getLocalCharacters(ownerId: string): CharacterSummary[] {
  return [
    {
      id: `${ownerId}.maria-knox`,
      name: 'Maria Knox',
      profession: 'Carpinteira',
      status: 'alive',
      avatarId: null,
      currentCity: 'Muldraugh',
      daysAlive: 18,
      zombiesKilled: 143,
    },
    {
      id: `${ownerId}.eduardo-riverside`,
      name: 'Eduardo Miller',
      profession: 'Bombeiro',
      status: 'alive',
      avatarId: null,
      currentCity: 'Riverside',
      daysAlive: 9,
      zombiesKilled: 67,
    },
    {
      id: `${ownerId}.ana-westpoint`,
      name: 'Ana Brooks',
      profession: 'Veterana',
      status: 'missing',
      avatarId: null,
      currentCity: 'West Point',
      daysAlive: 31,
      zombiesKilled: 221,
    },
  ];
}
