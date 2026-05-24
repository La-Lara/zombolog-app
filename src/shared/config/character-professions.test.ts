import { characterProfessions, normalizeProfessionName } from './character-professions';

describe('character professions catalog', () => {
  it('keeps the expected order and formatted names', () => {
    expect(characterProfessions.map((profession) => profession.name)).toEqual([
      'Desempregada(o)',
      'Assistente Técnica(o)',
      'Bombeira(o)',
      'Carpinteira(o)',
      'Chapista',
      'Chef',
      'Construtora Civil(o)',
      'Doutora(o)',
      'Eletricista',
      'Enfermeira(o)',
      'Engenheira(o)',
      'Fazendeira(o)',
      'Ferreira(o)',
      'Guarda Florestal',
      'Larápia(o)',
      'Lenhadora(o)',
      'Mecânica(o)',
      'Metalúrgica(o)',
      'Personal Trainer',
      'Pescadora(o)',
      'Policial',
      'Pecuarista',
      'Segurança',
      'Costureira(o)',
      'Veterana(o)',
    ]);
  });

  it('normalizes legacy profession names', () => {
    expect(normalizeProfessionName('Bombeiro')).toBe('Bombeira(o)');
    expect(normalizeProfessionName('Carpinteira')).toBe('Carpinteira(o)');
    expect(normalizeProfessionName('Mecanico')).toBe('Mecânica(o)');
  });
});
