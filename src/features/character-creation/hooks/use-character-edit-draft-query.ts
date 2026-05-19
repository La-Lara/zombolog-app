import { useQuery } from '@tanstack/react-query';

import { characterCreationApi } from '../api/character-creation-api';

type UseCharacterEditDraftQueryParams = {
  accessToken?: string;
  characterId?: string;
  userId?: string;
};

export function useCharacterEditDraftQuery({
  accessToken,
  characterId,
  userId,
}: UseCharacterEditDraftQueryParams) {
  return useQuery({
    queryKey: ['character-edit-draft', characterId, userId],
    queryFn: () =>
      characterCreationApi.getCharacterDraft({
        accessToken,
        characterId: characterId ?? '',
        ownerId: userId ?? '',
      }),
    enabled: Boolean(characterId && userId),
  });
}
