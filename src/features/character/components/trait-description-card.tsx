import { StyleSheet, View } from 'react-native';

import { formatTraitPoints } from '@/shared/config/character-traits';
import { colors, radius, spacing } from '@/shared/theme';
import { Card, Text } from '@/shared/ui';

import { Trait } from '../types';

type TraitDescriptionCardProps = {
  trait: Trait;
};

export function TraitDescriptionCard({ trait }: TraitDescriptionCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{trait.name}</Text>
        <View style={[styles.pointsBadge, trait.type === 'positive' ? styles.positive : styles.negative]}>
          <Text style={styles.points}>{formatTraitPoints(trait.points)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontWeight: '700',
  },
  pointsBadge: {
    alignItems: 'center',
    borderRadius: radius.sm,
    minWidth: 40,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  positive: {
    backgroundColor: 'rgba(143, 191, 111, 0.16)',
  },
  negative: {
    backgroundColor: 'rgba(214, 107, 95, 0.16)',
  },
  points: {
    fontSize: 12,
    fontWeight: '700',
  },
});
