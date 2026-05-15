import { useMutation } from '@tanstack/react-query';

import { authApi } from '../api/auth-api';
import { LoginFormValues } from '../schemas/auth-schemas';
import { useSession } from './use-session';

export function useLoginMutation() {
  const { setSession } = useSession();

  return useMutation({
    mutationFn: (values: LoginFormValues) => authApi.login(values),
    onSuccess: (session) => setSession(session),
  });
}
