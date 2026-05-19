import { LocalSkill, LocalTrait } from '@/shared/storage';

export type CharacterCreationDraft = {
  name: string;
  profession: string;
  avatarId: string;
  gender: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  spawnCity: string;
  currentCity: string;
  traitIds: string[];
  skills: Record<string, number>;
};

export type CharacterCreationPayload = CharacterCreationDraft & {
  ownerId: string;
};

export type CharacterUpdatePayload = CharacterCreationPayload & {
  characterId: string;
};

export type CreationCatalog = {
  professions: string[];
  cities: string[];
  avatars: string[];
  genders: string[];
  skinTones: string[];
  hairStyles: string[];
  hairColors: string[];
  traits: LocalTrait[];
  skills: LocalSkill[];
};
