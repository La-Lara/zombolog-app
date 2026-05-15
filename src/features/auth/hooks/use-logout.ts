import { useQueryClient } from '@tanstack/react-query';

import { useSession } from './use-session';

export function useLogout() {
  const queryClient = useQueryClient();
  const { clearSession } = useSession();

  return async () => {
    queryClient.clear();
    await clearSession();
  };
}
