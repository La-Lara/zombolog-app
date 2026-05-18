import { useMutation, useQueryClient } from '@tanstack/react-query';

import { characterCreationApi } from '../api/character-creation-api';
import { CharacterCreationPayload } from '../types';

type CreateCharacterMutationParams = {
  accessToken?: string;
  payload: CharacterCreationPayload;
};

export function useCreateCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCharacterMutationParams) => characterCreationApi.createCharacter(params),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['characters', variables.payload.ownerId] });
    },
  });
}
