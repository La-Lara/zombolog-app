import { useEffect, useState } from 'react';

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

      if (!isActive) {
        return;
      }

      setDraft({
        ...defaultCharacterCreationDraft,
        ...storedDraft,
        skills: {
          ...defaultCharacterCreationDraft.skills,
          ...storedDraft?.skills,
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
