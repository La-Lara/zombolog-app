import { httpClient } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { normalizeProfessionName } from '@/shared/config/character-professions';
import { clampSkillLevel, normalizeSkillId } from '@/shared/config/character-skills';
import { normalizeTraitId, resolveCharacterTraits } from '@/shared/config/character-traits';
import { localCharacterRepository, LocalCharacter, LocalSkill, LocalTrait } from '@/shared/storage';

import { creationCatalog } from '../data/creation-catalog';
import {
  CharacterCreationDraft,
  CharacterCreationPayload,
  CharacterRunMode,
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
  run_mode?: string | null;
  avatar_id?: string | null;
  gender?: string | null;
  initial_city?: string | null;
  spawn_city: string;
  current_city: string;
  days_alive?: number | null;
  zombies_killed?: number | null;
  trait_ids?: string[];
  traits?: { id: string }[];
  skills: { id: string; level: number }[] | Record<string, number>;
};

function toRequestBody(payload: CharacterCreationPayload) {
  return {
    owner_id: payload.ownerId,
    name: payload.name.trim(),
    profession: payload.profession,
    run_mode: payload.runMode,
    avatar_id: payload.avatarId,
    gender: payload.gender,
    initial_city: payload.initialCity,
    spawn_city: payload.spawnCity,
    current_city: payload.currentCity,
    days_alive: payload.daysAlive,
    zombies_killed: payload.zombiesKilled,
    trait_ids: payload.traitIds,
    skills: payload.skills,
  };
}

function toDraftFromLocal(character: LocalCharacter): CharacterCreationDraft {
  return {
    ...defaultDraftWithCurrentCatalog(),
    name: character.name,
    profession: normalizeProfessionName(character.profession),
    runMode: character.runMode,
    gender: character.gender,
    avatarId: getCharacterPortrait(character.avatarId).id,
    initialCity: character.initialCity,
    spawnCity: character.spawnCity,
    currentCity: character.currentCity,
    daysAlive: clampMetric(character.daysAlive),
    zombiesKilled: clampMetric(character.zombiesKilled),
    traitIds: character.traits.map((trait) => normalizeTraitId(trait.id)),
    legacyTraits: character.traits,
    skills: toSkillLevels(character.skills),
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
    profession: normalizeProfessionName(character.profession),
    runMode: toRunMode(character.run_mode),
    avatarId: getCharacterPortrait(character.avatar_id).id,
    gender: character.gender ?? creationCatalog.genders[0],
    initialCity: character.initial_city ?? character.spawn_city,
    spawnCity: character.spawn_city,
    currentCity: character.current_city,
    daysAlive: clampMetric(character.days_alive ?? 0),
    zombiesKilled: clampMetric(character.zombies_killed ?? 0),
    traitIds: traitIds.map(normalizeTraitId),
    skills: toSkillLevelsFromRecord(skills),
  };
}

function defaultDraftWithCurrentCatalog(): CharacterCreationDraft {
  return {
    name: '',
    profession: '',
    runMode: '',
    avatarId: creationCatalog.avatars[0],
    gender: creationCatalog.genders[0],
    initialCity: '',
    spawnCity: '',
    currentCity: '',
    daysAlive: 0,
    zombiesKilled: 0,
    traitIds: [],
    skills: defaultSkills(),
  };
}

function toRunMode(runMode?: string | null): CharacterRunMode {
  if (runMode && creationCatalog.runModes.includes(runMode as CharacterRunMode)) {
    return runMode as CharacterRunMode;
  }

  return 'Apocalipse';
}

function defaultSkills() {
  return Object.fromEntries(creationCatalog.skills.map((skill) => [skill.id, 0]));
}

function toSkillLevels(skills: LocalSkill[]) {
  return toSkillLevelsFromRecord(Object.fromEntries(skills.map((skill) => [skill.id, skill.level])));
}

function toSkillLevelsFromRecord(skills: Record<string, number>) {
  const skillLevels = defaultSkills();

  for (const [skillId, level] of Object.entries(skills)) {
    const normalizedSkillId = normalizeSkillId(skillId);

    if (normalizedSkillId in skillLevels) {
      skillLevels[normalizedSkillId] = Math.max(skillLevels[normalizedSkillId] ?? 0, clampSkillLevel(level));
    }
  }

  return skillLevels;
}

function clampMetric(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function toLocalTraits(payload: CharacterCreationPayload, currentTraits: LocalTrait[] = []) {
  return resolveCharacterTraits(payload.traitIds, currentTraits);
}

function toLocalSkills(payload: CharacterCreationPayload, currentSkills: LocalSkill[] = []) {
  const catalogSkillIds = new Set(creationCatalog.skills.map((skill) => skill.id));
  const editableSkills = creationCatalog.skills.map((skill) => ({
    ...skill,
    level: clampSkillLevel(payload.skills[skill.id] ?? 0),
  }));
  const preservedSkills = currentSkills.filter((skill) => !catalogSkillIds.has(normalizeSkillId(skill.id)));

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
        runMode: payload.runMode,
        gender: payload.gender,
        avatarId: payload.avatarId,
        initialCity: payload.initialCity,
        spawnCity: payload.spawnCity,
        currentCity: payload.currentCity,
        daysAlive: payload.daysAlive,
        zombiesKilled: payload.zombiesKilled,
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
        runMode: payload.runMode,
        gender: payload.gender,
        avatarId: payload.avatarId,
        initialCity: payload.initialCity,
        spawnCity: payload.spawnCity,
        currentCity: payload.currentCity,
        daysAlive: payload.daysAlive,
        zombiesKilled: payload.zombiesKilled,
        traits: toLocalTraits(payload, currentCharacter?.traits),
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
