import { fireEvent, waitFor } from '@testing-library/react-native';

import { useSessionStore } from '@/features/auth/store/session-store';
import { makeUserSession } from '@/test/factories/session-factory';
import { renderWithProviders } from '@/test/render';

import { characterCreationApi } from '../api/character-creation-api';
import { CharacterCreationScreen } from './character-creation-screen';

const mockReplace = jest.fn();
const mockBack = jest.fn();
let mockParams: { editId?: string } = {};

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockParams,
  useRouter: () => ({
    back: mockBack,
    replace: mockReplace,
  }),
}));

describe('CharacterCreationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockParams = {};
    useSessionStore.setState({
      isHydrated: true,
      session: makeUserSession({
        user: {
          id: 'user-1',
          displayName: 'Sobrevivente',
          username: 'survivor',
        },
      }),
    });
  });

  it('loads the current character and updates it instead of creating a duplicate', async () => {
    mockParams = { editId: 'character-1' };
    jest.spyOn(characterCreationApi, 'getCharacterDraft').mockResolvedValueOnce({
      name: 'Maria Knox',
      profession: 'Carpinteira',
      avatarId: 'survivor-a',
      gender: 'Feminino',
      skinTone: 'Medio',
      hairStyle: 'Curto',
      hairColor: 'Preto',
      spawnCity: 'Rosewood',
      currentCity: 'Muldraugh',
      traitIds: ['organized'],
      skills: { carpentry: 6 },
    });
    const createCharacterSpy = jest.spyOn(characterCreationApi, 'createCharacter');
    const updateCharacterSpy = jest
      .spyOn(characterCreationApi, 'updateCharacter')
      .mockResolvedValueOnce({ id: 'character-1' });

    const screen = renderWithProviders(<CharacterCreationScreen />);

    expect(await screen.findByText('Editar Personagem')).toBeTruthy();
    expect(screen.getByDisplayValue('Maria Knox')).toBeTruthy();

    for (let step = 0; step < 5; step += 1) {
      fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));
    }

    fireEvent.press(screen.getByRole('button', { name: 'Salvar Personagem' }));

    await waitFor(() => {
      expect(updateCharacterSpy).toHaveBeenCalledWith({
        accessToken: 'test-access-token',
        payload: expect.objectContaining({
          characterId: 'character-1',
          ownerId: 'user-1',
          name: 'Maria Knox',
          profession: 'Carpinteira',
        }),
      });
    });
    expect(createCharacterSpy).not.toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith({
      pathname: '/characters/[id]',
      params: { id: 'character-1' },
    });
  });
});
