import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';

import { Button } from './button';
import { Text } from './text';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text variant="subtitle">Algo deu errado</Text>
      <Text variant="caption">{message}</Text>
      {onRetry ? <Button title="Tentar novamente" variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
});
