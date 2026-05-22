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
      runMode: 'Outbreak',
      avatarId: 'CharacterF',
      gender: 'Feminino',
      initialCity: 'Rosewood',
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
          runMode: 'Outbreak',
          initialCity: 'Rosewood',
          traitIds: ['organizada'],
        }),
      });
    });
    expect(createCharacterSpy).not.toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith({
      pathname: '/characters/[id]',
      params: { id: 'character-1' },
    });
  });

  it('requires run mode before creating and sends it in the creation payload', async () => {
    const createCharacterSpy = jest
      .spyOn(characterCreationApi, 'createCharacter')
      .mockResolvedValueOnce({ id: 'character-2' });

    const screen = renderWithProviders(<CharacterCreationScreen />);

    expect(await screen.findByText('Novo Personagem')).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText('Nome'), 'Ana Brooks');
    fireEvent.press(screen.getByRole('button', { name: 'Veterana' }));
    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));

    expect(await screen.findByText('Selecione o modo da run.')).toBeTruthy();
    expect(createCharacterSpy).not.toHaveBeenCalled();

    fireEvent.press(screen.getByRole('button', { name: 'Sandbox' }));

    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));
    fireEvent.press(screen.getByRole('button', { name: 'Proximo retrato' }));
    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));
    fireEvent.press(screen.getAllByRole('button', { name: 'Rosewood' })[0]);
    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));
    fireEvent.press(screen.getByRole('button', { name: 'Corajosa (-4)' }));
    fireEvent.press(screen.getByRole('button', { name: 'Fumante (+3)' }));
    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));
    fireEvent.press(screen.getByRole('button', { name: 'Proximo' }));

    expect(screen.getByText('Modo da run')).toBeTruthy();
    expect(screen.getByText('Cidade inicial')).toBeTruthy();
    expect(screen.getAllByText('Sandbox').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rosewood').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Corajosa (-4)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fumante (+3)').length).toBeGreaterThan(0);

    fireEvent.press(screen.getByRole('button', { name: 'Criar Personagem' }));

    await waitFor(() => {
      expect(createCharacterSpy).toHaveBeenCalledWith({
        accessToken: 'test-access-token',
        payload: expect.objectContaining({
          ownerId: 'user-1',
          name: 'Ana Brooks',
          profession: 'Veterana',
          runMode: 'Sandbox',
          avatarId: 'CharacterM',
          gender: 'Feminino',
          initialCity: 'Rosewood',
          spawnCity: 'Rosewood',
          currentCity: 'Rosewood',
          traitIds: ['corajosa', 'fumante'],
        }),
      });
    });
  });
});
