import { useQuery } from '@tanstack/react-query';

import { charactersApi } from '../api/characters-api';

type UseCharactersQueryParams = {
  accessToken?: string;
  userId?: string;
};

export function useCharactersQuery({ accessToken, userId }: UseCharactersQueryParams) {
  return useQuery({
    queryKey: ['characters', userId],
    queryFn: () =>
      charactersApi.listCharacters({
        accessToken,
        ownerId: userId ?? '',
      }),
    enabled: Boolean(userId),
    staleTime: 60_000,
  });
}
