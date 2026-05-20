import { LocalCharacterRunMode, LocalSkill, LocalTrait } from '@/shared/storage';

export type CharacterRunMode = LocalCharacterRunMode;

export type CharacterCreationDraft = {
  name: string;
  profession: string;
  runMode: CharacterRunMode | '';
  avatarId: string;
  gender: string;
  initialCity: string;
  spawnCity: string;
  currentCity: string;
  traitIds: string[];
  skills: Record<string, number>;
};

export type CharacterCreationPayload = Omit<CharacterCreationDraft, 'runMode'> & {
  ownerId: string;
  runMode: CharacterRunMode;
};

export type CharacterUpdatePayload = CharacterCreationPayload & {
  characterId: string;
};

export type CreationCatalog = {
  professions: string[];
  runModes: CharacterRunMode[];
  cities: string[];
  avatars: string[];
  genders: string[];
  traits: LocalTrait[];
  skills: LocalSkill[];
};
