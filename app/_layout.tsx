import { Redirect, Slot, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppProviders } from '@/shared/providers/app-providers';
import { getAuthRedirect, useSession } from '@/features/auth';

function RootNavigationBoundary() {
  const segments = useSegments();
  const { isHydrated, session } = useSession();
  const redirectTarget = getAuthRedirect({
    isHydrated,
    hasSession: Boolean(session),
    routeGroup: segments[0],
  });

  if (!isHydrated) {
    return null;
  }

  if (redirectTarget) {
    return <Redirect href={redirectTarget} />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="light" />
      <RootNavigationBoundary />
    </AppProviders>
  );
}
