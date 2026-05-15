import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type HomeHeaderProps = {
  displayName?: string;
  onSettingsPress: () => void;
};

export function HomeHeader({ displayName, onSettingsPress }: HomeHeaderProps) {
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
        accessibilityLabel="Abrir configuracoes"
        accessibilityRole="button"
        onPress={onSettingsPress}
        style={({ pressed }) => [styles.settingsButton, pressed ? styles.pressed : null]}
      >
        <Text style={styles.settingsIcon}>⚙</Text>
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
  settingsButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  pressed: {
    opacity: 0.8,
  },
  settingsIcon: {
    fontSize: 18,
  },
});
