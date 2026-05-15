import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type CharacterMetricProps = {
  label: string;
  value: number | string;
};

export function CharacterMetric({ label, value }: CharacterMetricProps) {
  return (
    <View style={styles.container}>
      <Text variant="caption">{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    minWidth: 84,
  },
  value: {
    fontWeight: '700',
  },
});
