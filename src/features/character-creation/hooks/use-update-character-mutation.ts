import { useMutation, useQueryClient } from '@tanstack/react-query';

import { characterCreationApi } from '../api/character-creation-api';
import { CharacterUpdatePayload } from '../types';

type UpdateCharacterMutationParams = {
  accessToken?: string;
  payload: CharacterUpdatePayload;
};

export function useUpdateCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateCharacterMutationParams) => characterCreationApi.updateCharacter(params),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['characters', variables.payload.ownerId] }),
        queryClient.invalidateQueries({
          queryKey: ['character', variables.payload.characterId, variables.payload.ownerId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['character-edit-draft', variables.payload.characterId, variables.payload.ownerId],
        }),
      ]);
    },
  });
}
