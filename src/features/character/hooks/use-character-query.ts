import { useQuery } from '@tanstack/react-query';

import { characterApi } from '../api/character-api';

type UseCharacterQueryParams = {
  accessToken?: string;
  characterId?: string;
  userId?: string;
};

export function useCharacterQuery({ accessToken, characterId, userId }: UseCharacterQueryParams) {
  return useQuery({
    queryKey: ['character', characterId, userId],
    queryFn: () =>
      characterApi.getCharacter({
        accessToken,
        characterId: characterId ?? '',
        ownerId: userId ?? '',
      }),
    enabled: Boolean(characterId && userId),
    staleTime: 60_000,
  });
}
