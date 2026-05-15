import { getAuthRedirect } from './auth-navigation';

describe('getAuthRedirect', () => {
  it('waits for session hydration before redirecting', () => {
    expect(
      getAuthRedirect({
        isHydrated: false,
        hasSession: false,
        routeGroup: '(app)',
      }),
    ).toBeNull();
  });

  it('redirects anonymous users away from protected routes', () => {
    expect(
      getAuthRedirect({
        isHydrated: true,
        hasSession: false,
        routeGroup: '(app)',
      }),
    ).toBe('/login');
  });

  it('redirects authenticated users away from auth routes', () => {
    expect(
      getAuthRedirect({
        isHydrated: true,
        hasSession: true,
        routeGroup: '(auth)',
      }),
    ).toBe('/home');
  });
});
