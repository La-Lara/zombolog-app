import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { localCharacterRepository } from '@/shared/storage';

import { creationCatalog } from '../data/creation-catalog';
import { CharacterCreationPayload } from '../types';

type CreateCharacterParams = {
  accessToken?: string;
  payload: CharacterCreationPayload;
};

type CreateCharacterResponse = {
  id: string;
};

function toRequestBody(payload: CharacterCreationPayload) {
  return {
    owner_id: payload.ownerId,
    name: payload.name.trim(),
    profession: payload.profession,
    avatar_id: payload.avatarId,
    gender: payload.gender,
    skin_tone: payload.skinTone,
    hair_style: payload.hairStyle,
    hair_color: payload.hairColor,
    spawn_city: payload.spawnCity,
    current_city: payload.currentCity,
    trait_ids: payload.traitIds,
    skills: payload.skills,
  };
}

export const characterCreationApi = {
  async createCharacter({ accessToken, payload }: CreateCharacterParams) {
    if (!env.apiBaseUrl) {
      const character = await localCharacterRepository.create({
        ownerId: payload.ownerId,
        name: payload.name,
        profession: payload.profession,
        avatarId: payload.avatarId,
        spawnCity: payload.spawnCity,
        currentCity: payload.currentCity,
        traits: creationCatalog.traits.filter((trait) => payload.traitIds.includes(trait.id)),
        skills: creationCatalog.skills.map((skill) => ({
          ...skill,
          level: payload.skills[skill.id] ?? 0,
        })),
      });

      return { id: character.id };
    }

    return httpClient.post<CreateCharacterResponse>('/characters', toRequestBody(payload), {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });
  },
};
