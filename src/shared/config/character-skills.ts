export type CharacterSkillDefinition = {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
};

export type CharacterSkillSection = {
  id: string;
  title: string;
  skills: CharacterSkillDefinition[];
};

const maxLevel = 10;

export const characterSkillSections: CharacterSkillSection[] = [
  {
    id: 'combat-firearms',
    title: 'Combate - Armas de Fogo',
    skills: [
      makeSkill('aiming', 'Mira', 'Combate - Armas de Fogo'),
      makeSkill('reloading', 'Recarga', 'Combate - Armas de Fogo'),
    ],
  },
  {
    id: 'combat-physical',
    title: 'Combate - Físico',
    skills: [
      makeSkill('short-blunt', 'Contundentes Curtos', 'Combate - Físico'),
      makeSkill('long-blunt', 'Contundentes Longos', 'Combate - Físico'),
      makeSkill('spears', 'Lanças', 'Combate - Físico'),
      makeSkill('short-blade', 'Lâminas Curtas', 'Combate - Físico'),
      makeSkill('long-blade', 'Lâminas Longas', 'Combate - Físico'),
      makeSkill('axes', 'Machados', 'Combate - Físico'),
      makeSkill('maintenance', 'Manutenção', 'Combate - Físico'),
    ],
  },
  {
    id: 'crafting',
    title: 'Criação',
    skills: [
      makeSkill('carpentry', 'Carpintaria', 'Criação'),
      makeSkill('carving', 'Carving', 'Criação'),
      makeSkill('tailoring', 'Costura', 'Criação'),
      makeSkill('cooking', 'Culinária', 'Criação'),
      makeSkill('electrical', 'Elétrica', 'Criação'),
      makeSkill('forging', 'Forja', 'Criação'),
      makeSkill('glassmaking', 'Fabricação de Vidro', 'Criação'),
      makeSkill('knapping', 'Lascamento', 'Criação'),
      makeSkill('masonry', 'Alvenaria', 'Criação'),
      makeSkill('mechanics', 'Mecânica', 'Criação'),
      makeSkill('metalworking', 'Metalurgia', 'Criação'),
      makeSkill('pottery', 'Cerâmica', 'Criação'),
    ],
  },
  {
    id: 'farming',
    title: 'Agropecuária',
    skills: [
      makeSkill('farming', 'Agricultura', 'Agropecuária'),
      makeSkill('animal-care', 'Cuidados com animais', 'Agropecuária'),
      makeSkill('butchering', 'Corte de carne', 'Agropecuária'),
    ],
  },
  {
    id: 'body-conditioning',
    title: 'Condicionamento Corporal',
    skills: [
      makeSkill('nimble', 'Agilidade', 'Condicionamento Corporal'),
      makeSkill('fitness', 'Aptidão Física', 'Condicionamento Corporal'),
      makeSkill('sprinting', 'Corrida', 'Condicionamento Corporal'),
      makeSkill('lightfooted', 'Discrição', 'Condicionamento Corporal'),
      makeSkill('strength', 'Força', 'Condicionamento Corporal'),
      makeSkill('sneaking', 'Furtividade', 'Condicionamento Corporal'),
    ],
  },
  {
    id: 'survival',
    title: 'Sobrevivência',
    skills: [
      makeSkill('hunting', 'Caça', 'Sobrevivência'),
      makeSkill('foraging', 'Coleta', 'Sobrevivência'),
      makeSkill('fishing', 'Pescaria', 'Sobrevivência'),
      makeSkill('first-aid', 'Primeiros Socorros', 'Sobrevivência'),
      makeSkill('tracking', 'Rastreamento', 'Sobrevivência'),
    ],
  },
];

export const characterSkills = characterSkillSections.flatMap((section) => section.skills);

const legacySkillIds: Record<string, string> = {
  axe: 'axes',
  trapping: 'hunting',
};

export function normalizeSkillId(skillId: string) {
  return legacySkillIds[skillId] ?? skillId;
}

export function getCharacterSkill(skillId: string) {
  const normalizedSkillId = normalizeSkillId(skillId);

  return characterSkills.find((skill) => skill.id === normalizedSkillId);
}

export function buildCharacterSkills(savedSkills: CharacterSkillDefinition[]) {
  const savedLevels = new Map<string, number>();

  for (const skill of savedSkills) {
    const normalizedSkillId = normalizeSkillId(skill.id);
    const currentLevel = savedLevels.get(normalizedSkillId) ?? 0;
    savedLevels.set(normalizedSkillId, Math.max(currentLevel, clampSkillLevel(skill.level)));
  }

  return characterSkills.map((skill) => ({
    ...skill,
    level: savedLevels.get(skill.id) ?? 0,
  }));
}

export function clampSkillLevel(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.min(Math.floor(value), maxLevel) : 0;
}

function makeSkill(id: string, name: string, category: string): CharacterSkillDefinition {
  return {
    id,
    name,
    category,
    level: 0,
    maxLevel,
  };
}
