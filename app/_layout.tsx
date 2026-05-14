import { Redirect, Slot, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppProviders } from '@/shared/providers/app-providers';
import { useSession } from '@/features/auth';

function RootNavigationBoundary() {
  const segments = useSegments();
  const { isHydrated, session } = useSession();
  const routeGroup = segments[0];
  const isAuthRoute = routeGroup === '(auth)';

  if (!isHydrated) {
    return null;
  }

  if (!session && !isAuthRoute) {
    return <Redirect href="/login" />;
  }

  if (session && isAuthRoute) {
    return <Redirect href="/home" />;
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
