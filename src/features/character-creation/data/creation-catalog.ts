import { characterPortraits } from '@/shared/config/character-portraits';

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
  genders: ['Feminino', 'Masculino', 'Nao informado'],
  traits: [
    {
      id: 'fast-reader',
      name: 'Leitura Rapida',
      type: 'positive',
      description: 'Conclui livros em menos tempo.',
      effects: ['Velocidade de leitura aumentada'],
      points: -2,
    },
    {
      id: 'fit',
      name: 'Em Forma',
      type: 'positive',
      description: 'Comeca com melhor condicionamento.',
      effects: ['Condicionamento inicial aumentado'],
      points: -6,
    },
    {
      id: 'organized',
      name: 'Organizada',
      type: 'positive',
      description: 'Aproveita melhor espaco de recipientes.',
      effects: ['Capacidade de recipientes aumentada'],
      points: -6,
    },
    {
      id: 'lucky',
      name: 'Sortudo',
      type: 'positive',
      description: 'Encontra itens uteis com mais frequencia.',
      effects: ['Chance de loot raro aumentada'],
      points: -4,
    },
    {
      id: 'high-thirst',
      name: 'Muita Sede',
      type: 'negative',
      description: 'Precisa beber agua com mais frequencia.',
      effects: ['Consumo de agua aumentado'],
      points: 6,
    },
    {
      id: 'slow-reader',
      name: 'Leitor Lento',
      type: 'negative',
      description: 'Demora mais para concluir livros.',
      effects: ['Velocidade de leitura reduzida'],
      points: 2,
    },
    {
      id: 'smoker',
      name: 'Fumante',
      type: 'negative',
      description: 'Precisa de cigarros para controlar ansiedade.',
      effects: ['Estresse aumenta sem fumar'],
      points: 4,
    },
  ],
  skills: [
    { id: 'fitness', name: 'Condicionamento', category: 'Fisico', level: 0, maxLevel: 10 },
    { id: 'strength', name: 'Forca', category: 'Fisico', level: 0, maxLevel: 10 },
    { id: 'sprinting', name: 'Corrida', category: 'Fisico', level: 0, maxLevel: 10 },
    { id: 'carpentry', name: 'Carpintaria', category: 'Construcao', level: 0, maxLevel: 10 },
    { id: 'cooking', name: 'Culinaria', category: 'Sobrevivencia', level: 0, maxLevel: 10 },
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
