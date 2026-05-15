import { useMutation } from '@tanstack/react-query';

import { authApi } from '../api/auth-api';
import { RegisterFormValues } from '../schemas/auth-schemas';
import { useSession } from './use-session';

export function useRegisterMutation() {
  const { setSession } = useSession();

  return useMutation({
    mutationFn: (values: RegisterFormValues) => authApi.register(values),
    onSuccess: (session) => setSession(session),
  });
}
