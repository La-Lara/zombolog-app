import { useEffect, useState } from 'react';

import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { clampSkillLevel, normalizeSkillId } from '@/shared/config/character-skills';
import { normalizeTraitId } from '@/shared/config/character-traits';

import { defaultCharacterCreationDraft } from '../data/creation-catalog';
import { characterCreationDraftStorage } from '../storage/character-creation-draft-storage';
import { CharacterCreationDraft } from '../types';

export function useCharacterCreationDraft(userId?: string) {
  const [draft, setDraft] = useState<CharacterCreationDraft>(defaultCharacterCreationDraft);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function hydrateDraft() {
      if (!userId) {
        setIsHydrated(true);
        return;
      }

      const storedDraft = await characterCreationDraftStorage.getDraft(userId);
      const sanitizedDraft = sanitizeStoredDraft(storedDraft);

      if (!isActive) {
        return;
      }

      setDraft({
        ...defaultCharacterCreationDraft,
        ...sanitizedDraft,
        skills: {
          ...defaultCharacterCreationDraft.skills,
          ...sanitizedDraft?.skills,
        },
      });
      setIsHydrated(true);
    }

    hydrateDraft();

    return () => {
      isActive = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId || !isHydrated) {
      return;
    }

    void characterCreationDraftStorage.setDraft(userId, draft);
  }, [draft, isHydrated, userId]);

  async function clearDraft() {
    setDraft(defaultCharacterCreationDraft);

    if (userId) {
      await characterCreationDraftStorage.deleteDraft(userId);
    }
  }

  return {
    draft,
    setDraft,
    isHydrated,
    clearDraft,
  };
}

function sanitizeStoredDraft(storedDraft: Partial<CharacterCreationDraft> | null) {
  if (!storedDraft) {
    return null;
  }

  return {
    name: storedDraft.name,
    profession: storedDraft.profession,
    runMode: storedDraft.runMode,
    avatarId: getCharacterPortrait(storedDraft.avatarId).id,
    gender: storedDraft.gender,
    initialCity: storedDraft.initialCity ?? storedDraft.spawnCity,
    spawnCity: storedDraft.spawnCity,
    currentCity: storedDraft.currentCity,
    daysAlive: sanitizeMetric(storedDraft.daysAlive),
    zombiesKilled: sanitizeMetric(storedDraft.zombiesKilled),
    traitIds: uniqueValues(storedDraft.traitIds?.map(normalizeTraitId) ?? []),
    skills: sanitizeSkills(storedDraft.skills),
  } satisfies Partial<CharacterCreationDraft>;
}

function uniqueValues(values: string[]) {
  return [...new Set(values)];
}

function sanitizeMetric(value: number | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return Math.floor(value);
}

function sanitizeSkills(skills: Record<string, number> | undefined) {
  if (!skills) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(skills).map(([skillId, level]) => [normalizeSkillId(skillId), clampSkillLevel(level)]),
  );
}
