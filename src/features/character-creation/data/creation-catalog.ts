import { characterPortraits } from '@/shared/config/character-portraits';
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
  skills: [
    { id: 'fitness', name: 'Condicionamento', category: 'Físico', level: 0, maxLevel: 10 },
    { id: 'strength', name: 'Força', category: 'Físico', level: 0, maxLevel: 10 },
    { id: 'sprinting', name: 'Corrida', category: 'Físico', level: 0, maxLevel: 10 },
    { id: 'carpentry', name: 'Carpintaria', category: 'Construção', level: 0, maxLevel: 10 },
    { id: 'cooking', name: 'Culinária', category: 'Sobrevivência', level: 0, maxLevel: 10 },
    { id: 'aiming', name: 'Mira', category: 'Combate', level: 0, maxLevel: 10 },
  ],
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
  traitIds: [],
  skills: Object.fromEntries(creationCatalog.skills.map((skill) => [skill.id, 0])),
};
