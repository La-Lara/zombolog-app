import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { Skill } from '../types';

type SkillMeterProps = {
  skill: Skill;
  showCategory?: boolean;
};

export function SkillMeter({ skill, showCategory = true }: SkillMeterProps) {
  const maxLevel = Math.max(skill.maxLevel, 1);
  const filledSlots = Math.min(Math.max(skill.level, 0), maxLevel);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.name}>{skill.name}</Text>
          {showCategory ? <Text variant="caption">{skill.category}</Text> : null}
        </View>
        <Text style={styles.level}>
          {filledSlots}/{maxLevel}
        </Text>
      </View>
      <View accessibilityLabel={`${skill.name} nivel ${filledSlots} de ${maxLevel}`} style={styles.track}>
        {Array.from({ length: maxLevel }, (_slot, index) => (
          <View
            key={`${skill.id}-${index}`}
            style={[styles.slot, index < filledSlots ? styles.slotFilled : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  titleGroup: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  name: {
    fontWeight: '700',
  },
  level: {
    color: colors.primary,
    fontWeight: '700',
  },
  track: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  slot: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    flex: 1,
    height: 12,
  },
  slotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
