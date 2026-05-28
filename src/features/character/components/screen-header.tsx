import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
  onDelete?: () => void;
  isDeleteDisabled?: boolean;
};

export function ScreenHeader({ title, onBack, onDelete, isDeleteDisabled = false }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="Voltar"
        accessibilityRole="button"
        onPress={onBack}
        style={({ pressed }) => [styles.action, pressed ? styles.pressed : null]}
      >
        <Text style={styles.actionLabel}>‹</Text>
      </Pressable>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {onDelete ? (
        <Pressable
          accessibilityLabel="Excluir personagem"
          accessibilityRole="button"
          accessibilityState={{ disabled: isDeleteDisabled }}
          disabled={isDeleteDisabled}
          onPress={onDelete}
          style={({ pressed }) => [
            styles.action,
            styles.deleteAction,
            pressed && !isDeleteDisabled ? styles.pressed : null,
            isDeleteDisabled ? styles.disabled : null,
          ]}
        >
          <Text style={styles.deleteLabel}>×</Text>
        </Pressable>
      ) : (
        <View style={styles.actionPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  action: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  actionPlaceholder: {
    width: 44,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  disabled: {
    opacity: 0.5,
  },
  actionLabel: {
    color: colors.primary,
    fontSize: 30,
    lineHeight: 30,
  },
  deleteAction: {
    borderColor: colors.danger,
  },
  deleteLabel: {
    color: colors.danger,
    fontSize: 28,
    lineHeight: 28,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
