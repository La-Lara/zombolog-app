import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { CharacterStatus } from '../types';

const statusLabel: Record<CharacterStatus, string> = {
  alive: 'Vivo',
  dead: 'Morto',
  missing: 'Desaparecido',
};

export function StatusBadge({ status }: { status: CharacterStatus }) {
  return (
    <View style={[styles.badge, styles[status]]}>
      <Text style={styles.label}>{statusLabel[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  alive: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  dead: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  missing: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.warning,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
