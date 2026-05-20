import type { ImageSourcePropType } from 'react-native';

export type CharacterPortraitId = 'CharacterF' | 'CharacterM';

export type CharacterPortraitOption = {
  id: CharacterPortraitId;
  label: string;
  source: ImageSourcePropType;
};

export const characterPortraits: CharacterPortraitOption[] = [
  {
    id: 'CharacterF',
    label: 'CharacterF',
    source: require('../../../assets/characters/CharacterF.jpg') as ImageSourcePropType,
  },
  {
    id: 'CharacterM',
    label: 'CharacterM',
    source: require('../../../assets/characters/CharacterM.jpg') as ImageSourcePropType,
  },
];

export function getCharacterPortrait(avatarId?: string | null) {
  return characterPortraits.find((portrait) => portrait.id === avatarId) ?? characterPortraits[0];
}
