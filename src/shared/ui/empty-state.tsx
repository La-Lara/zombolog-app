import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';

import { Text } from './text';

type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text variant="subtitle">{title}</Text>
      {description ? <Text variant="caption">{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
});
