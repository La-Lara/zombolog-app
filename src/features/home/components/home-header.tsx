import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type HomeHeaderProps = {
  displayName?: string;
  isLoggingOut?: boolean;
  onLogoutPress: () => void;
};

export function HomeHeader({ displayName, isLoggingOut = false, onLogoutPress }: HomeHeaderProps) {
  const greetingName = displayName?.trim() || 'Sobrevivente';

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text variant="caption">Zona segura</Text>
        <Text numberOfLines={1} variant="title">
          Ola, {greetingName}
        </Text>
      </View>
      <Pressable
        accessibilityLabel="Sair da conta"
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoggingOut, busy: isLoggingOut }}
        disabled={isLoggingOut}
        onPress={onLogoutPress}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && !isLoggingOut ? styles.pressed : null,
          isLoggingOut ? styles.disabled : null,
        ]}
      >
        <Text style={styles.logoutLabel}>{isLoggingOut ? 'Saindo' : 'Sair'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 72,
    paddingHorizontal: spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.6,
  },
  logoutLabel: {
    color: colors.danger,
    fontWeight: '700',
  },
});
