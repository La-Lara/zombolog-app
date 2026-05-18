export type LocalCharacterStatus = 'alive' | 'dead' | 'missing';

export type LocalTraitType = 'positive' | 'negative';

export type LocalTrait = {
  id: string;
  name: string;
  type: LocalTraitType;
  description: string;
  effects: string[];
  points: number;
};

export type LocalSkill = {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
};

export type LocalCharacter = {
  id: string;
  ownerId: string;
  name: string;
  profession: string;
  status: LocalCharacterStatus;
  avatarId?: string | null;
  spawnCity: string;
  currentCity: string;
  daysAlive: number;
  zombiesKilled: number;
  traits: LocalTrait[];
  skills: LocalSkill[];
};

const deletedCharacterIds = new Set<string>();
const createdCharactersByOwnerId = new Map<string, LocalCharacter[]>();

function makeCharacters(ownerId: string): LocalCharacter[] {
  return [
    {
      id: `${ownerId}.maria-knox`,
      ownerId,
      name: 'Maria Knox',
      profession: 'Carpinteira',
      status: 'alive',
      avatarId: null,
      spawnCity: 'Rosewood',
      currentCity: 'Muldraugh',
      daysAlive: 18,
      zombiesKilled: 143,
      traits: [
        {
          id: 'fast-reader',
          name: 'Leitura Rapida',
          type: 'positive',
          description: 'Aprende com livros em menos tempo, ideal para bases longas.',
          effects: ['Velocidade de leitura aumentada'],
          points: -2,
        },
        {
          id: 'organized',
          name: 'Organizada',
          type: 'positive',
          description: 'Carrega suprimentos com melhor aproveitamento de inventario.',
          effects: ['Capacidade de recipientes aumentada'],
          points: -6,
        },
        {
          id: 'high-thirst',
          name: 'Muita Sede',
          type: 'negative',
          description: 'Precisa beber agua com mais frequencia durante exploracoes.',
          effects: ['Consumo de agua aumentado'],
          points: 6,
        },
      ],
      skills: [
        { id: 'carpentry', name: 'Carpintaria', category: 'Construcao', level: 6, maxLevel: 10 },
        { id: 'cooking', name: 'Culinaria', category: 'Sobrevivencia', level: 3, maxLevel: 10 },
        { id: 'foraging', name: 'Coleta', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'sprinting', name: 'Corrida', category: 'Fisico', level: 2, maxLevel: 10 },
        { id: 'nimble', name: 'Agilidade', category: 'Combate', level: 2, maxLevel: 10 },
        { id: 'long-blunt', name: 'Contundente Longo', category: 'Combate', level: 5, maxLevel: 10 },
        { id: 'maintenance', name: 'Manutencao', category: 'Tecnica', level: 4, maxLevel: 10 },
      ],
    },
    {
      id: `${ownerId}.eduardo-riverside`,
      ownerId,
      name: 'Eduardo Miller',
      profession: 'Bombeiro',
      status: 'alive',
      avatarId: null,
      spawnCity: 'Riverside',
      currentCity: 'Riverside',
      daysAlive: 9,
      zombiesKilled: 67,
      traits: [
        {
          id: 'fit',
          name: 'Em Forma',
          type: 'positive',
          description: 'Mantem melhor folego em fugas, buscas e combate corpo a corpo.',
          effects: ['Condicionamento inicial aumentado'],
          points: -6,
        },
        {
          id: 'lucky',
          name: 'Sortudo',
          type: 'positive',
          description: 'Encontra itens uteis com um pouco mais de frequencia.',
          effects: ['Chance de loot rara aumentada'],
          points: -4,
        },
        {
          id: 'slow-reader',
          name: 'Leitor Lento',
          type: 'negative',
          description: 'Demora mais para concluir livros tecnicos.',
          effects: ['Velocidade de leitura reduzida'],
          points: 2,
        },
      ],
      skills: [
        { id: 'fitness', name: 'Condicionamento', category: 'Fisico', level: 7, maxLevel: 10 },
        { id: 'strength', name: 'Forca', category: 'Fisico', level: 6, maxLevel: 10 },
        { id: 'axe', name: 'Machado', category: 'Combate', level: 4, maxLevel: 10 },
        { id: 'sprinting', name: 'Corrida', category: 'Fisico', level: 5, maxLevel: 10 },
        { id: 'first-aid', name: 'Primeiros Socorros', category: 'Sobrevivencia', level: 2, maxLevel: 10 },
        { id: 'mechanics', name: 'Mecanica', category: 'Tecnica', level: 1, maxLevel: 10 },
      ],
    },
    {
      id: `${ownerId}.ana-westpoint`,
      ownerId,
      name: 'Ana Brooks',
      profession: 'Veterana',
      status: 'missing',
      avatarId: null,
      spawnCity: 'West Point',
      currentCity: 'West Point',
      daysAlive: 31,
      zombiesKilled: 221,
      traits: [
        {
          id: 'brave',
          name: 'Corajosa',
          type: 'positive',
          description: 'Controla melhor o panico em confrontos perigosos.',
          effects: ['Panico reduzido'],
          points: -4,
        },
        {
          id: 'eagle-eyed',
          name: 'Olhos de Aguia',
          type: 'positive',
          description: 'Percebe ameacas e oportunidades a uma distancia maior.',
          effects: ['Campo de visao aumentado'],
          points: -6,
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
        { id: 'aiming', name: 'Mira', category: 'Combate', level: 6, maxLevel: 10 },
        { id: 'reloading', name: 'Recarga', category: 'Combate', level: 5, maxLevel: 10 },
        { id: 'sneaking', name: 'Furtividade', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'lightfooted', name: 'Passos Leves', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'tailoring', name: 'Costura', category: 'Tecnica', level: 3, maxLevel: 10 },
        { id: 'trapping', name: 'Armadilhas', category: 'Sobrevivencia', level: 2, maxLevel: 10 },
      ],
    },
  ];
}

export function listLocalCharacters(ownerId: string) {
  const createdCharacters = createdCharactersByOwnerId.get(ownerId) ?? [];

  return [...createdCharacters, ...makeCharacters(ownerId)].filter(
    (character) => !deletedCharacterIds.has(character.id),
  );
}

export function getLocalCharacter(ownerId: string, characterId: string) {
  return listLocalCharacters(ownerId).find((character) => character.id === characterId) ?? null;
}

export function deleteLocalCharacter(characterId: string) {
  deletedCharacterIds.add(characterId);
}

export type CreateLocalCharacterInput = Pick<
  LocalCharacter,
  'ownerId' | 'name' | 'profession' | 'avatarId' | 'spawnCity' | 'currentCity' | 'traits' | 'skills'
>;

export function createLocalCharacter(input: CreateLocalCharacterInput) {
  const createdCharacters = createdCharactersByOwnerId.get(input.ownerId) ?? [];
  const id = `${input.ownerId}.${slugify(input.name)}.${Date.now()}`;
  const character: LocalCharacter = {
    ...input,
    id,
    status: 'alive',
    daysAlive: 0,
    zombiesKilled: 0,
  };

  createdCharactersByOwnerId.set(input.ownerId, [character, ...createdCharacters]);

  return character;
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'survivor';
}
