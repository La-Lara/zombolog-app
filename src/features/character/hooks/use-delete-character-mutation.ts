import { useMutation, useQueryClient } from '@tanstack/react-query';

import { characterApi } from '../api/character-api';

type DeleteCharacterParams = {
  accessToken?: string;
  characterId: string;
  userId?: string;
};

export function useDeleteCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accessToken, characterId }: DeleteCharacterParams) =>
      characterApi.deleteCharacter({ accessToken, characterId }),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['characters', variables.userId] }),
        queryClient.removeQueries({ queryKey: ['character', variables.characterId] }),
      ]);
    },
  });
}
