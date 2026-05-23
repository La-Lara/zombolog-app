import { localCharacterRepository } from '@/shared/storage';

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

  it('persists survival metrics when creating a local character', async () => {
    const createSpy = jest.spyOn(localCharacterRepository, 'create').mockResolvedValueOnce({
      id: 'character-1',
    } as Awaited<ReturnType<typeof localCharacterRepository.create>>);

    await characterCreationApi.createCharacter({ payload: basePayload });

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        daysAlive: 31,
        zombiesKilled: 221,
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
});
