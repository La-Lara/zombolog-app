import { type LocalTrait, type LocalTraitType } from '@/shared/storage';

type TraitCatalogInput = {
  id: string;
  name: string;
  type: LocalTraitType;
  points: number;
};

const positiveTraits: TraitCatalogInput[] = [
  { id: 'demonio-da-velocidade', name: 'Demônio da Velocidade', type: 'positive', points: -1 },
  { id: 'artesa', name: 'Artesã', type: 'positive', points: -2 },
  { id: 'maos-ageis', name: 'Mãos Ágeis', type: 'positive', points: -2 },
  { id: 'leitora-rapida', name: 'Leitora Rápida', type: 'positive', points: -2 },
  { id: 'socorrista', name: 'Socorrista', type: 'positive', points: -2 },
  { id: 'jardineira', name: 'Jardineira', type: 'positive', points: -2 },
  { id: 'inventiva', name: 'Inventiva', type: 'positive', points: -2 },
  { id: 'estomago-de-ferro', name: 'Estômago de Ferro', type: 'positive', points: -2 },
  { id: 'estomago-pequeno', name: 'Estômago Pequeno', type: 'positive', points: -2 },
  { id: 'hidratada', name: 'Hidratada', type: 'positive', points: -2 },
  { id: 'pedreira', name: 'Pedreira', type: 'positive', points: -2 },
  { id: 'nutricionista', name: 'Nutricionista', type: 'positive', points: -2 },
  { id: 'aventureira', name: 'Aventureira', type: 'positive', points: -2 },
  { id: 'entalhadora', name: 'Entalhadora', type: 'positive', points: -2 },
  { id: 'olhos-de-gata', name: 'Olhos de Gata', type: 'positive', points: -3 },
  { id: 'criativa', name: 'Criativa', type: 'positive', points: -3 },
  { id: 'cozinheira', name: 'Cozinheira', type: 'positive', points: -3 },
  { id: 'mecanica-amadora', name: 'Mecânica Amadora', type: 'positive', points: -3 },
  { id: 'madrugadora', name: 'Madrugadora', type: 'positive', points: -3 },
  { id: 'viciada-em-adrenalina', name: 'Viciada em Adrenalina', type: 'positive', points: -4 },
  { id: 'pescadora', name: 'Pescadora', type: 'positive', points: -4 },
  { id: 'jogadora-de-beisebol', name: 'Jogadora de Beisebol', type: 'positive', points: -4 },
  { id: 'corajosa', name: 'Corajosa', type: 'positive', points: -4 },
  { id: 'visao-de-aguia', name: 'Visão de Águia', type: 'positive', points: -4 },
  { id: 'graciosa', name: 'Graciosa', type: 'positive', points: -4 },
  { id: 'herbalista', name: 'Herbalista', type: 'positive', points: -4 },
  { id: 'discreta', name: 'Discreta', type: 'positive', points: -4 },
  { id: 'organizada', name: 'Organizada', type: 'positive', points: -4 },
  { id: 'saudavel', name: 'Saudável', type: 'positive', points: -4 },
  { id: 'corredora', name: 'Corredora', type: 'positive', points: -4 },
  { id: 'costureira', name: 'Costureira', type: 'positive', points: -4 },
  { id: 'inventora', name: 'Inventora', type: 'positive', points: -4 },
  { id: 'ginasta', name: 'Ginasta', type: 'positive', points: -5 },
  { id: 'atiradora-de-precisao', name: 'Atiradora de Precisão', type: 'positive', points: -5 },
  { id: 'ferreira', name: 'Ferreira', type: 'positive', points: -6 },
  { id: 'brigadora', name: 'Brigadora', type: 'positive', points: -6 },
  { id: 'saude-de-ferro', name: 'Saúde de Ferro', type: 'positive', points: -6 },
  { id: 'aprendiz-rapida', name: 'Aprendiz Rápida', type: 'positive', points: -6 },
  { id: 'em-forma', name: 'Em Forma', type: 'positive', points: -6 },
  { id: 'escoteira', name: 'Escoteira', type: 'positive', points: -6 },
  { id: 'trilheira', name: 'Trilheira', type: 'positive', points: -6 },
  { id: 'audicao-agucada', name: 'Audição Aguçada', type: 'positive', points: -6 },
  { id: 'robusta', name: 'Robusta', type: 'positive', points: -6 },
  { id: 'sobrevivencialista', name: 'Sobrevivencialista', type: 'positive', points: -8 },
  { id: 'habilidosa', name: 'Habilidosa', type: 'positive', points: -8 },
  { id: 'cacadora', name: 'Caçadora', type: 'positive', points: -8 },
  { id: 'pele-grossa', name: 'Pele Grossa', type: 'positive', points: -8 },
  { id: 'atletica', name: 'Atlética', type: 'positive', points: -10 },
  { id: 'forte', name: 'Forte', type: 'positive', points: -10 },
];

const negativeTraits: TraitCatalogInput[] = [
  { id: 'motorista-lento', name: 'Motorista Lento', type: 'negative', points: 1 },
  { id: 'maos-lentas', name: 'Mãos de Lentas', type: 'negative', points: 2 },
  { id: 'desastrada', name: 'Desastrada', type: 'negative', points: 2 },
  { id: 'covarde', name: 'Covarde', type: 'negative', points: 2 },
  { id: 'metabolismo-rapido', name: 'Metabolismo Rápido', type: 'negative', points: 2 },
  { id: 'sedenta', name: 'Sedenta', type: 'negative', points: 2 },
  { id: 'miope', name: 'Míope', type: 'negative', points: 2 },
  { id: 'metabolismo-lento', name: 'Metabolismo Lento', type: 'negative', points: 2 },
  { id: 'leitora-lenta', name: 'Leitora Lenta', type: 'negative', points: 2 },
  { id: 'estomago-fraco', name: 'Estômago Fraco', type: 'negative', points: 2 },
  { id: 'recuperacao-lenta', name: 'Recuperação Lenta', type: 'negative', points: 3 },
  { id: 'fumante', name: 'Fumante', type: 'negative', points: 3 },
  { id: 'agorafobica', name: 'Agorafóbica', type: 'negative', points: 4 },
  { id: 'claustrofobica', name: 'Claustrofóbica', type: 'negative', points: 4 },
  { id: 'chamativa', name: 'Chamativa', type: 'negative', points: 4 },
  { id: 'dificuldade-auditiva', name: 'Dificuldade Auditiva', type: 'negative', points: 4 },
  { id: 'comilona', name: 'Comilona', type: 'negative', points: 4 },
  { id: 'propensa-a-doencas', name: 'Propensa a Doenças', type: 'negative', points: 4 },
  { id: 'dorminhoca', name: 'Dorminhoca', type: 'negative', points: 4 },
  { id: 'medo-de-sangue', name: 'Medo de Sangue', type: 'negative', points: 5 },
  { id: 'lutadora-relutante', name: 'Lutadora Relutante', type: 'negative', points: 5 },
  { id: 'pouco-folego', name: 'Pouco Fôlego', type: 'negative', points: 5 },
  { id: 'desorganizada', name: 'Desorganizada', type: 'negative', points: 6 },
  { id: 'fora-de-forma', name: 'Fora de Forma', type: 'negative', points: 6 },
  { id: 'sono-inquieto', name: 'Sono Inquieto', type: 'negative', points: 6 },
  { id: 'aprendizagem-lenta', name: 'Aprendizagem Lenta', type: 'negative', points: 6 },
  { id: 'fraca', name: 'Fraca', type: 'negative', points: 6 },
  { id: 'pele-fina', name: 'Pele Fina', type: 'negative', points: 8 },
  { id: 'analfabeta', name: 'Analfabeta', type: 'negative', points: 10 },
  { id: 'pele-e-osso', name: 'Pele e Osso', type: 'negative', points: 10 },
  { id: 'sedentaria', name: 'Sedentária', type: 'negative', points: 10 },
  { id: 'surda', name: 'Surda', type: 'negative', points: 12 },
];

const legacyTraitIds: Record<string, string> = {
  brave: 'corajosa',
  'eagle-eyed': 'visao-de-aguia',
  'fast-reader': 'leitora-rapida',
  fit: 'em-forma',
  'high-thirst': 'sedenta',
  organized: 'organizada',
  smoker: 'fumante',
  'slow-reader': 'leitora-lenta',
};

export const characterTraits: LocalTrait[] = [...positiveTraits, ...negativeTraits].map((trait) => ({
  ...trait,
  description: `${trait.name} (${formatTraitPoints(trait.points)})`,
  effects: [],
}));

export function formatTraitPoints(points: number) {
  return points > 0 ? `+${points}` : `${points}`;
}

export function normalizeTraitId(id: string) {
  return legacyTraitIds[id] ?? id;
}

export function getCharacterTrait(id: string) {
  return characterTraits.find((trait) => trait.id === normalizeTraitId(id));
}

export function normalizeCharacterTrait(value: unknown): LocalTrait | null {
  if (typeof value === 'string') {
    return getCharacterTrait(value) ?? null;
  }

  if (!value || typeof value !== 'object') {
    return null;
  }

  const trait = value as Partial<LocalTrait>;

  if (!trait.id || typeof trait.id !== 'string') {
    return null;
  }

  const catalogTrait = getCharacterTrait(trait.id);

  if (catalogTrait) {
    return catalogTrait;
  }

  if (
    typeof trait.name === 'string' &&
    (trait.type === 'positive' || trait.type === 'negative') &&
    typeof trait.points === 'number'
  ) {
    return {
      id: trait.id,
      name: trait.name,
      type: trait.type,
      description: typeof trait.description === 'string' ? trait.description : trait.name,
      effects: Array.isArray(trait.effects) ? trait.effects.filter((effect) => typeof effect === 'string') : [],
      points: trait.points,
    };
  }

  return null;
}

export function normalizeCharacterTraits(values: unknown): LocalTrait[] {
  if (!Array.isArray(values)) {
    return [];
  }

  const normalizedTraits = values.map(normalizeCharacterTrait).filter((trait): trait is LocalTrait => Boolean(trait));
  const seenIds = new Set<string>();

  return normalizedTraits.filter((trait) => {
    const id = normalizeTraitId(trait.id);

    if (seenIds.has(id)) {
      return false;
    }

    seenIds.add(id);
    return true;
  });
}

export function resolveCharacterTraits(traitIds: string[], fallbackTraits: LocalTrait[] = []) {
  const fallbackById = new Map(fallbackTraits.map((trait) => [normalizeTraitId(trait.id), trait]));

  return normalizeCharacterTraits(
    traitIds.map((traitId) => getCharacterTrait(traitId) ?? fallbackById.get(normalizeTraitId(traitId)) ?? traitId),
  );
}
