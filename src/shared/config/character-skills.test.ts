import { characterSkillSections, normalizeSkillId } from './character-skills';

describe('character skills catalog', () => {
  it('keeps the expected sections and skill order', () => {
    expect(characterSkillSections.map((section) => section.title)).toEqual([
      'Combate - Armas de Fogo',
      'Combate - Físico',
      'Criação',
      'Agropecuária',
      'Condicionamento Corporal',
      'Sobrevivência',
    ]);
    expect(characterSkillSections[2].skills.map((skill) => skill.name)).toEqual([
      'Carpintaria',
      'Carving',
      'Costura',
      'Culinária',
      'Elétrica',
      'Forja',
      'Fabricação de Vidro',
      'Lascamento',
      'Alvenaria',
      'Mecânica',
      'Metalurgia',
      'Cerâmica',
    ]);
  });

  it('maps legacy skill ids to the current catalog', () => {
    expect(normalizeSkillId('axe')).toBe('axes');
    expect(normalizeSkillId('trapping')).toBe('hunting');
  });
});
