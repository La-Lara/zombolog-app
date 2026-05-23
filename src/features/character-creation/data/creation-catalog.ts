import { characterPortraits } from '@/shared/config/character-portraits';
import { characterSkills, characterSkillSections } from '@/shared/config/character-skills';
import { characterTraits } from '@/shared/config/character-traits';

import { CreationCatalog, CharacterCreationDraft } from '../types';

export const characterRunModes = [
  'Apocalipse',
  'Outbreak',
  'Rising',
  'Extinction',
  'Sandbox',
  'Desafio: Um Dia De Cão',
] as const;

export const creationCatalog: CreationCatalog = {
  professions: ['Desempregado', 'Carpinteira', 'Bombeiro', 'Veterana', 'Enfermeira', 'Mecanico'],
  runModes: [...characterRunModes],
  cities: [
    'Muldraugh',
    'Brandenburg',
    'Echo Creek',
    'Ekron',
    'Fallas Lake',
    'Irvington',
    'March Ridge',
    'Riverside',
    'Rosewood',
    'Valley Station',
    'West Point',
  ],
  avatars: characterPortraits.map((portrait) => portrait.id),
  genders: ['Feminino', 'Masculino', 'Não informado'],
  traits: characterTraits,
  skills: characterSkills,
  skillSections: characterSkillSections,
};

export const defaultCharacterCreationDraft: CharacterCreationDraft = {
  name: '',
  profession: '',
  runMode: '',
  avatarId: creationCatalog.avatars[0],
  gender: creationCatalog.genders[0],
  initialCity: '',
  spawnCity: '',
  currentCity: '',
  daysAlive: 0,
  zombiesKilled: 0,
  traitIds: [],
  skills: Object.fromEntries(creationCatalog.skills.map((skill) => [skill.id, 0])),
};
