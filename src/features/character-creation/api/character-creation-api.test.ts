import { LocalCharacter, localCharacterRepository } from '@/shared/storage';

import { characterCreationApi } from './character-creation-api';

const basePayload = {
  ownerId: 'user-1',
  name: 'Ana Brooks',
  profession: 'Veterana',
  runMode: 'Sandbox' as const,
  avatarId: 'CharacterF',
  gender: 'Feminino',
  initialCity: 'West Point',
  spawnCity: 'West Point',
  currentCity: 'Muldraugh',
  daysAlive: 31,
  zombiesKilled: 221,
  traitIds: ['corajosa'],
  skills: { aiming: 3 },
};

describe('characterCreationApi', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('persists survival metrics and catalog skills when creating a local character', async () => {
    const createSpy = jest.spyOn(localCharacterRepository, 'create').mockResolvedValueOnce({
      id: 'character-1',
    } as Awaited<ReturnType<typeof localCharacterRepository.create>>);

    await characterCreationApi.createCharacter({ payload: basePayload });

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        daysAlive: 31,
        zombiesKilled: 221,
        skills: expect.arrayContaining([
          expect.objectContaining({ id: 'aiming', level: 3, name: 'Mira' }),
          expect.objectContaining({ id: 'carpentry', level: 0, name: 'Carpintaria' }),
        ]),
      }),
    );
  });

  it('persists survival metrics when updating a local character', async () => {
    jest.spyOn(localCharacterRepository, 'getById').mockResolvedValueOnce(null);
    const updateSpy = jest.spyOn(localCharacterRepository, 'update').mockResolvedValueOnce({
      id: 'character-1',
    } as Awaited<ReturnType<typeof localCharacterRepository.update>>);

    await characterCreationApi.updateCharacter({
      payload: {
        ...basePayload,
        characterId: 'character-1',
      },
    });

    expect(updateSpy).toHaveBeenCalledWith(
      'user-1',
      'character-1',
      expect.objectContaining({
        daysAlive: 31,
        zombiesKilled: 221,
      }),
    );
  });

  it('loads legacy local skill ids into the new editable skill catalog', async () => {
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

    const draft = await characterCreationApi.getCharacterDraft({
      characterId: 'character-1',
      ownerId: 'user-1',
    });

    expect(draft?.skills.axes).toBe(4);
    expect(draft?.skills.hunting).toBe(2);
  });
});
