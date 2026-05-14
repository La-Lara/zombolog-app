export type AuthRedirectTarget = '/login' | '/home';

type AuthRedirectInput = {
  isHydrated: boolean;
  hasSession: boolean;
  routeGroup?: string;
};

export function getAuthRedirect({
  isHydrated,
  hasSession,
  routeGroup,
}: AuthRedirectInput): AuthRedirectTarget | null {
  if (!isHydrated) {
    return null;
  }

  const isAuthRoute = routeGroup === '(auth)';

  if (!hasSession && !isAuthRoute) {
    return '/login';
  }

  if (hasSession && isAuthRoute) {
    return '/home';
  }

  return null;
}
