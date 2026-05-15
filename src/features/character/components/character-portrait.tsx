import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/shared/theme';
import { Text } from '@/shared/ui';

type CharacterPortraitProps = {
  name: string;
  size?: 'md' | 'lg';
};

export function CharacterPortrait({ name, size = 'lg' }: CharacterPortraitProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <View accessibilityLabel={`Retrato de ${name}`} style={[styles.portrait, styles[size]]}>
      <Text style={[styles.initials, size === 'lg' ? styles.initialsLarge : null]}>
        {initials || '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  portrait: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
  },
  md: {
    height: 64,
    width: 64,
  },
  lg: {
    height: 88,
    width: 88,
  },
  initials: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  initialsLarge: {
    fontSize: 28,
  },
});
