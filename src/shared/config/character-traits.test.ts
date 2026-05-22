import {
  getCharacterTrait,
  normalizeCharacterTraits,
  normalizeTraitId,
  resolveCharacterTraits,
} from './character-traits';

describe('character traits catalog', () => {
  it('normalizes legacy ids to the current catalog', () => {
    expect(normalizeTraitId('fast-reader')).toBe('leitora-rapida');
    expect(getCharacterTrait('organized')).toMatchObject({
      id: 'organizada',
      name: 'Organizada',
      points: -4,
      type: 'positive',
    });
  });

  it('reads old string and object formats without duplicating traits', () => {
    expect(
      normalizeCharacterTraits([
        'fast-reader',
        {
          id: 'leitora-rapida',
          name: 'Leitora Rapida',
          type: 'positive',
          description: 'Legado',
          effects: [],
          points: -2,
        },
        {
          id: 'custom-legacy',
          name: 'Legado Customizado',
          type: 'negative',
          description: 'Mantido para compatibilidade.',
          effects: ['Formato antigo'],
          points: 1,
        },
      ]),
    ).toEqual([
      expect.objectContaining({ id: 'leitora-rapida', name: 'Leitora Rápida' }),
      expect.objectContaining({ id: 'custom-legacy', name: 'Legado Customizado' }),
    ]);
  });

  it('resolves selected ids with legacy fallbacks for edit summaries and persistence', () => {
    expect(
      resolveCharacterTraits(['custom-legacy', 'smoker'], [
        {
          id: 'custom-legacy',
          name: 'Legado Customizado',
          type: 'negative',
          description: 'Mantido para compatibilidade.',
          effects: [],
          points: 1,
        },
      ]),
    ).toEqual([
      expect.objectContaining({ id: 'custom-legacy', name: 'Legado Customizado' }),
      expect.objectContaining({ id: 'fumante', name: 'Fumante', points: 3 }),
    ]);
  });
});
