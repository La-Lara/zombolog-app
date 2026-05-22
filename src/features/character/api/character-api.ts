import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { normalizeCharacterTrait, normalizeCharacterTraits } from '@/shared/config/character-traits';
import { localCharacterRepository, LocalCharacter } from '@/shared/storage';

import { Character, CharacterRunMode, CharacterStatus, Skill, Trait, TraitType } from '../types';

type TraitDto = {
  id: string;
  name?: string;
  type?: TraitType;
  description?: string;
  effects?: string[];
  points?: number;
};

type SkillDto = {
  id: string;
  name: string;
  category: string;
  level: number;
  max_level?: number;
};

type CharacterDto = {
  id: string;
  owner_id: string;
  name: string;
  profession: string;
  run_mode?: CharacterRunMode | null;
  gender?: string | null;
  status: CharacterStatus;
  avatar_id?: string | null;
  initial_city?: string | null;
  spawn_city: string;
  current_city: string;
  days_alive?: number | null;
  zombies_killed?: number | null;
  traits: TraitDto[];
  skills: SkillDto[];
};

type CharacterRequestParams = {
  accessToken?: string;
  characterId: string;
  ownerId: string;
};

function toTrait(dto: TraitDto): Trait {
  return (
    normalizeCharacterTrait(dto) ?? {
      id: dto.id,
      name: dto.name ?? dto.id,
      type: dto.type ?? 'positive',
      description: dto.description ?? dto.name ?? dto.id,
      effects: dto.effects ?? [],
      points: dto.points ?? 0,
    }
  );
}

function toSkill(dto: SkillDto): Skill {
  return {
    id: dto.id,
    name: dto.name,
    category: dto.category,
    level: clampMetric(dto.level),
    maxLevel: dto.max_level ?? 10,
  };
}

function toCharacter(dto: CharacterDto): Character {
  return {
    id: dto.id,
    ownerId: dto.owner_id,
    name: dto.name,
    profession: dto.profession,
    runMode: dto.run_mode ?? 'Apocalipse',
    gender: dto.gender ?? 'Não informado',
    status: dto.status,
    avatarId: dto.avatar_id,
    initialCity: dto.initial_city ?? dto.spawn_city,
    spawnCity: dto.spawn_city,
    currentCity: dto.current_city,
    daysAlive: clampMetric(dto.days_alive ?? 0),
    zombiesKilled: clampMetric(dto.zombies_killed ?? 0),
    traits: dto.traits.map(toTrait),
    skills: dto.skills.map(toSkill),
  };
}

function toCharacterFromLocal(character: LocalCharacter): Character {
  return {
    id: character.id,
    ownerId: character.ownerId,
    name: character.name,
    profession: character.profession,
    runMode: character.runMode,
    gender: character.gender,
    status: character.status,
    avatarId: character.avatarId,
    initialCity: character.initialCity,
    spawnCity: character.spawnCity,
    currentCity: character.currentCity,
    daysAlive: clampMetric(character.daysAlive),
    zombiesKilled: clampMetric(character.zombiesKilled),
    traits: normalizeCharacterTraits(character.traits),
    skills: character.skills,
  };
}

function clampMetric(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

export const characterApi = {
  async getCharacter({ accessToken, characterId, ownerId }: CharacterRequestParams) {
    if (!env.apiBaseUrl) {
      const character = await localCharacterRepository.getById(ownerId, characterId);
      return character ? toCharacterFromLocal(character) : null;
    }

    const response = await httpClient.get<CharacterDto | null>(
      `/characters/${encodeURIComponent(characterId)}`,
      {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      },
    );

    return response ? toCharacter(response) : null;
  },

  async deleteCharacter({ accessToken, characterId }: Omit<CharacterRequestParams, 'ownerId'>) {
    if (!env.apiBaseUrl) {
      await localCharacterRepository.markDeleted(characterId);
      return;
    }

    await httpClient.delete<void>(`/characters/${encodeURIComponent(characterId)}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });
  },
};
