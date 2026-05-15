import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/shared/theme';
import { Text } from '@/shared/ui';

type CharacterPortraitProps = {
  name: string;
};

export function CharacterPortrait({ name }: CharacterPortraitProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <View accessibilityLabel={`Retrato de ${name}`} style={styles.portrait}>
      <Text style={styles.initials}>{initials || '?'}</Text>
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
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  initials: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
});
