import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type FieldSectionProps = PropsWithChildren<{
  title: string;
  error?: string;
}>;

export function FieldSection({ title, error, children }: FieldSectionProps) {
  return (
    <View style={styles.container}>
      <Text variant="subtitle">{title}</Text>
      <View style={styles.options}>{children}</View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  error: {
    color: colors.danger,
  },
});
