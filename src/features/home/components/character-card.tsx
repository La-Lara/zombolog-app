import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { CharacterSummary } from '../types';
import { CharacterMetric } from './character-metric';
import { CharacterPortrait } from './character-portrait';
import { StatusBadge } from './status-badge';

type CharacterCardProps = {
  character: CharacterSummary;
  onPress: (id: string) => void;
};

export function CharacterCard({ character, onPress }: CharacterCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Abrir ficha de ${character.name}`}
      accessibilityRole="button"
      onPress={() => onPress(character.id)}
      style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
    >
      <CharacterPortrait avatarId={character.avatarId} name={character.name} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.nameGroup}>
            <Text numberOfLines={1} style={styles.name}>
              {character.name}
            </Text>
            <Text numberOfLines={1} variant="caption">
              {character.profession}
            </Text>
          </View>
          <StatusBadge status={character.status} />
        </View>
        <View style={styles.metrics}>
          <CharacterMetric label="Dias de Sobrevivência" value={`${character.daysAlive} dias`} />
          <CharacterMetric label="Zumbis" value={character.zombiesKilled} />
          <CharacterMetric label="Cidade" value={character.currentCity} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.sm,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
    minWidth: 0,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  nameGroup: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
