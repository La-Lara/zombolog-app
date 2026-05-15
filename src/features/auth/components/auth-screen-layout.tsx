import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';
import { Card, Screen, Text } from '@/shared/ui';

type AuthScreenLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

export function AuthScreenLayout({ title, subtitle, children }: AuthScreenLayoutProps) {
  return (
    <Screen scroll>
      <View style={styles.container}>
        <ProjectLogo />
        <Card style={styles.card}>
          <Text variant="title">{title}</Text>
          <Text variant="caption">{subtitle}</Text>
          {children}
        </Card>
      </View>
    </Screen>
  );
}

function ProjectLogo() {
  return (
    <View style={styles.logo}>
      <Text style={styles.logoMark}>PZ</Text>
      <Text variant="caption">Survivor Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  logo: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoMark: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  card: {
    gap: spacing.md,
  },
});
