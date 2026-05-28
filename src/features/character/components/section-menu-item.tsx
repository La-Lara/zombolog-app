import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type SectionMenuItemProps = {
  description: string;
  label: string;
  onPress: () => void;
};

export function SectionMenuItem({ description, label, onPress }: SectionMenuItemProps) {
  return (
    <Pressable
      accessibilityLabel={`Abrir ${label}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed ? styles.pressed : null]}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text numberOfLines={2} variant="caption">
          {description}
        </Text>
      </View>
      <Text style={styles.chevron}>{'>'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 56,
    padding: spacing.md,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  label: {
    fontWeight: '700',
  },
  chevron: {
    color: colors.primary,
    fontSize: 22,
    lineHeight: 22,
  },
});
