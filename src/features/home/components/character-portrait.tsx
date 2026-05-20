import { Image, StyleSheet, View } from 'react-native';

import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { colors, radius } from '@/shared/theme';

type CharacterPortraitProps = {
  avatarId?: string | null;
  name: string;
};

export function CharacterPortrait({ avatarId, name }: CharacterPortraitProps) {
  const portrait = getCharacterPortrait(avatarId);

  return (
    <View accessibilityLabel={`Retrato de ${name}`} style={[styles.portrait, { aspectRatio: portrait.aspectRatio }]}>
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
    height: 64,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
