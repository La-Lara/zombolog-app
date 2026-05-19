import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { localCharacterRepository } from '@/shared/storage';

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

async function getLocalCharacters(ownerId: string): Promise<CharacterSummary[]> {
  const characters = await localCharacterRepository.listByOwner(ownerId);

  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    profession: character.profession,
    status: character.status,
    avatarId: character.avatarId,
    currentCity: character.currentCity,
    daysAlive: character.daysAlive,
    zombiesKilled: character.zombiesKilled,
  }));
}
