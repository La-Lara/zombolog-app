import { StyleSheet, View } from 'react-native';

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
          <Text style={styles.points}>{trait.points > 0 ? `+${trait.points}` : trait.points}</Text>
        </View>
      </View>
      <Text variant="caption">{trait.description}</Text>
      {trait.effects.length > 0 ? (
        <View style={styles.effects}>
          {trait.effects.map((effect) => (
            <Text key={effect} variant="caption">
              {effect}
            </Text>
          ))}
        </View>
      ) : null}
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
  effects: {
    borderColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
    paddingTop: spacing.sm,
  },
});
