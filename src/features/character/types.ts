import { LocalCharacterRunMode } from '@/shared/storage';

export type CharacterStatus = 'alive' | 'dead' | 'missing';

export type CharacterRunMode = LocalCharacterRunMode;

export type TraitType = 'positive' | 'negative';

export type Trait = {
  id: string;
  name: string;
  type: TraitType;
  description: string;
  effects: string[];
  points: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
};

export type Character = {
  id: string;
  ownerId: string;
  name: string;
  profession: string;
  runMode: CharacterRunMode;
  gender: string;
  status: CharacterStatus;
  avatarId?: string | null;
  initialCity: string;
  spawnCity: string;
  currentCity: string;
  daysAlive: number;
  zombiesKilled: number;
  traits: Trait[];
  skills: Skill[];
};
