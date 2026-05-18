import * as SecureStore from 'expo-secure-store';

import { CharacterCreationDraft } from '../types';

const keyPrefix = 'zombolog.character-creation-draft';

function getDraftKey(userId: string) {
  return `${keyPrefix}.${userId}`;
}

export const characterCreationDraftStorage = {
  async getDraft(userId: string) {
    const value = await SecureStore.getItemAsync(getDraftKey(userId));
    return value ? (JSON.parse(value) as Partial<CharacterCreationDraft>) : null;
  },

  setDraft(userId: string, draft: CharacterCreationDraft) {
    return SecureStore.setItemAsync(getDraftKey(userId), JSON.stringify(draft));
  },

  deleteDraft(userId: string) {
    return SecureStore.deleteItemAsync(getDraftKey(userId));
  },
};
