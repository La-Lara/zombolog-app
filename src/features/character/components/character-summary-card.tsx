import { Image, StyleSheet, View } from 'react-native';

import { getCharacterProfession } from '@/shared/config/character-professions';
import { spacing } from '@/shared/theme';
import { Card, Text } from '@/shared/ui';

import { Character } from '../types';
import { CharacterPortrait } from './character-portrait';
import { MetricRow } from './metric-row';
import { StatusBadge } from './status-badge';

type CharacterSummaryCardProps = {
  character: Character;
};

export function CharacterSummaryCard({ character }: CharacterSummaryCardProps) {
  const profession = getCharacterProfession(character.profession);

  return (
    <Card>
      <View style={styles.header}>
        <CharacterPortrait avatarId={character.avatarId} name={character.name} />
        <View style={styles.identity}>
          <Text numberOfLines={2} variant="subtitle">
            {character.name}
          </Text>
          <View style={styles.profession}>
            <Image accessibilityLabel={`Ícone ${profession.name}`} source={profession.icon} style={styles.professionIcon} />
            <Text numberOfLines={1} variant="caption">
              {profession.name}
            </Text>
          </View>
          <StatusBadge status={character.status} />
        </View>
      </View>
      <View style={styles.metrics}>
        <MetricRow label="Dias de Sobrevivência" value={character.daysAlive} />
        <MetricRow label="Zumbis abatidos" value={character.zombiesKilled} />
        <MetricRow label="Modo da run" value={character.runMode} />
        <MetricRow label="Genero" value={character.gender} />
        <MetricRow label="Cidade inicial" value={character.initialCity} />
        <MetricRow label="Cidade atual" value={character.currentCity} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  identity: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  profession: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  professionIcon: {
    height: 24,
    width: 24,
  },
});
