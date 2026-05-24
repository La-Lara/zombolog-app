import { LocalCharacter, localCharacterRepository } from '@/shared/storage';

import { characterApi } from './character-api';

describe('characterApi', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('normalizes legacy saved skills into the current skill catalog for display', async () => {
    jest.spyOn(localCharacterRepository, 'getById').mockResolvedValueOnce({
      id: 'character-1',
      ownerId: 'user-1',
      name: 'Eduardo Miller',
      profession: 'Bombeiro',
      runMode: 'Apocalipse',
      gender: 'Masculino',
      status: 'alive',
      avatarId: 'CharacterM',
      initialCity: 'Riverside',
      spawnCity: 'Riverside',
      currentCity: 'Riverside',
      daysAlive: 9,
      zombiesKilled: 67,
      traits: [],
      skills: [
        { id: 'axe', name: 'Machado', category: 'Combate', level: 4, maxLevel: 10 },
        { id: 'trapping', name: 'Armadilhas', category: 'Sobrevivência', level: 2, maxLevel: 10 },
      ],
      syncStatus: 'synced',
      syncVersion: 1,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    } satisfies LocalCharacter);

    const character = await characterApi.getCharacter({
      characterId: 'character-1',
      ownerId: 'user-1',
    });

    expect(character?.profession).toBe('Bombeira(o)');
    expect(character?.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'axes', name: 'Machados', level: 4 }),
        expect.objectContaining({ id: 'hunting', name: 'Caça', level: 2 }),
        expect.objectContaining({ id: 'carpentry', name: 'Carpintaria', level: 0 }),
      ]),
    );
  });
});
