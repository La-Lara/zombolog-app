import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { localCharacterRepository, LocalCharacter, LocalSkill } from '@/shared/storage';

import { creationCatalog } from '../data/creation-catalog';
import {
  CharacterCreationDraft,
  CharacterCreationPayload,
  CharacterUpdatePayload,
} from '../types';

type CreateCharacterParams = {
  accessToken?: string;
  payload: CharacterCreationPayload;
};

type CreateCharacterResponse = {
  id: string;
};

type CharacterDraftDto = {
  id: string;
  owner_id: string;
  name: string;
  profession: string;
  avatar_id?: string | null;
  gender?: string | null;
  skin_tone?: string | null;
  hair_style?: string | null;
  hair_color?: string | null;
  spawn_city: string;
  current_city: string;
  trait_ids?: string[];
  traits?: { id: string }[];
  skills: { id: string; level: number }[] | Record<string, number>;
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

function toDraftFromLocal(character: LocalCharacter): CharacterCreationDraft {
  return {
    ...defaultDraftWithCurrentCatalog(),
    name: character.name,
    profession: character.profession,
    avatarId: character.avatarId ?? creationCatalog.avatars[0],
    spawnCity: character.spawnCity,
    currentCity: character.currentCity,
    traitIds: character.traits.map((trait) => trait.id),
    skills: {
      ...defaultSkills(),
      ...Object.fromEntries(character.skills.map((skill) => [skill.id, skill.level])),
    },
  };
}

function toDraftFromDto(character: CharacterDraftDto): CharacterCreationDraft {
  const traitIds = character.trait_ids ?? character.traits?.map((trait) => trait.id) ?? [];
  const skills =
    Array.isArray(character.skills) ?
      Object.fromEntries(character.skills.map((skill) => [skill.id, skill.level]))
    : character.skills;

  return {
    ...defaultDraftWithCurrentCatalog(),
    name: character.name,
    profession: character.profession,
    avatarId: character.avatar_id ?? creationCatalog.avatars[0],
    gender: character.gender ?? creationCatalog.genders[0],
    skinTone: character.skin_tone ?? creationCatalog.skinTones[0],
    hairStyle: character.hair_style ?? creationCatalog.hairStyles[0],
    hairColor: character.hair_color ?? creationCatalog.hairColors[0],
    spawnCity: character.spawn_city,
    currentCity: character.current_city,
    traitIds,
    skills: {
      ...defaultSkills(),
      ...skills,
    },
  };
}

function defaultDraftWithCurrentCatalog(): CharacterCreationDraft {
  return {
    name: '',
    profession: '',
    avatarId: creationCatalog.avatars[0],
    gender: creationCatalog.genders[0],
    skinTone: creationCatalog.skinTones[0],
    hairStyle: creationCatalog.hairStyles[0],
    hairColor: creationCatalog.hairColors[0],
    spawnCity: '',
    currentCity: '',
    traitIds: [],
    skills: defaultSkills(),
  };
}

function defaultSkills() {
  return Object.fromEntries(creationCatalog.skills.map((skill) => [skill.id, 0]));
}

function toLocalTraits(payload: CharacterCreationPayload) {
  return creationCatalog.traits.filter((trait) => payload.traitIds.includes(trait.id));
}

function toLocalSkills(payload: CharacterCreationPayload, currentSkills: LocalSkill[] = []) {
  const catalogSkillIds = new Set(creationCatalog.skills.map((skill) => skill.id));
  const editableSkills = creationCatalog.skills.map((skill) => ({
    ...skill,
    level: payload.skills[skill.id] ?? 0,
  }));
  const preservedSkills = currentSkills.filter((skill) => !catalogSkillIds.has(skill.id));

  return [...editableSkills, ...preservedSkills];
}

export const characterCreationApi = {
  async getCharacterDraft({
    accessToken,
    characterId,
    ownerId,
  }: {
    accessToken?: string;
    characterId: string;
    ownerId: string;
  }) {
    if (!env.apiBaseUrl) {
      const character = await localCharacterRepository.getById(ownerId, characterId);
      return character ? toDraftFromLocal(character) : null;
    }

    const response = await httpClient.get<CharacterDraftDto | null>(
      `/characters/${encodeURIComponent(characterId)}`,
      {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      },
    );

    return response ? toDraftFromDto(response) : null;
  },

  async createCharacter({ accessToken, payload }: CreateCharacterParams) {
    if (!env.apiBaseUrl) {
      const character = await localCharacterRepository.create({
        ownerId: payload.ownerId,
        name: payload.name,
        profession: payload.profession,
        avatarId: payload.avatarId,
        spawnCity: payload.spawnCity,
        currentCity: payload.currentCity,
        traits: toLocalTraits(payload),
        skills: toLocalSkills(payload),
      });

      return { id: character.id };
    }

    return httpClient.post<CreateCharacterResponse>('/characters', toRequestBody(payload), {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });
  },

  async updateCharacter({
    accessToken,
    payload,
  }: {
    accessToken?: string;
    payload: CharacterUpdatePayload;
  }) {
    if (!env.apiBaseUrl) {
      const currentCharacter = await localCharacterRepository.getById(payload.ownerId, payload.characterId);
      const character = await localCharacterRepository.update(payload.ownerId, payload.characterId, {
        name: payload.name,
        profession: payload.profession,
        avatarId: payload.avatarId,
        spawnCity: payload.spawnCity,
        currentCity: payload.currentCity,
        traits: toLocalTraits(payload),
        skills: toLocalSkills(payload, currentCharacter?.skills),
      });

      return { id: character?.id ?? payload.characterId };
    }

    await httpClient.put<void>(
      `/characters/${encodeURIComponent(payload.characterId)}`,
      toRequestBody(payload),
      {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      },
    );

    return { id: payload.characterId };
  },
};
