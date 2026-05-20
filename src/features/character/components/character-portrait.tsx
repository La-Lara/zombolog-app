import { Image, StyleSheet, View } from 'react-native';

import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { colors, radius } from '@/shared/theme';

type CharacterPortraitProps = {
  avatarId?: string | null;
  name: string;
  size?: 'md' | 'lg';
};

export function CharacterPortrait({ avatarId, name, size = 'lg' }: CharacterPortraitProps) {
  const portrait = getCharacterPortrait(avatarId);

  return (
    <View accessibilityLabel={`Retrato de ${name}`} style={[styles.portrait, styles[size]]}>
      <Image resizeMode="cover" source={portrait.source} style={styles.image} />
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
    overflow: 'hidden',
  },
  md: {
    height: 64,
    width: 64,
  },
  lg: {
    height: 88,
    width: 88,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
