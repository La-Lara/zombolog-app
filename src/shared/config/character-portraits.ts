import type { ImageSourcePropType } from 'react-native';

export type CharacterPortraitId = 'CharacterF' | 'CharacterM';

export type CharacterPortraitOption = {
  id: CharacterPortraitId;
  label: string;
  aspectRatio: number;
  source: ImageSourcePropType;
};

export const characterPortraits: CharacterPortraitOption[] = [
  {
    id: 'CharacterF',
    label: 'CharacterF',
    aspectRatio: 269 / 353,
    source: require('../../../assets/characters/CharacterF.jpg') as ImageSourcePropType,
  },
  {
    id: 'CharacterM',
    label: 'CharacterM',
    aspectRatio: 267 / 372,
    source: require('../../../assets/characters/CharacterM.jpg') as ImageSourcePropType,
  },
];

export function getCharacterPortrait(avatarId?: string | null) {
  return characterPortraits.find((portrait) => portrait.id === avatarId) ?? characterPortraits[0];
}
