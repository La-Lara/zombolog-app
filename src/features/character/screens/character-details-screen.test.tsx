import { fireEvent } from '@testing-library/react-native';

import { useSessionStore } from '@/features/auth/store/session-store';
import { makeUserSession } from '@/test/factories/session-factory';
import { renderWithProviders } from '@/test/render';

import { characterApi } from '../api/character-api';
import { Character } from '../types';
import { CharacterDetailsScreen } from './character-details-screen';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'character-1' }),
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
  }),
}));

const character: Character = {
  id: 'character-1',
  ownerId: 'user-1',
  name: 'Maria Knox',
  profession: 'Carpinteira',
  status: 'alive',
  avatarId: null,
  spawnCity: 'Rosewood',
  currentCity: 'Muldraugh',
  daysAlive: 18,
  zombiesKilled: 143,
  traits: [
    {
      id: 'organized',
      name: 'Organizada',
      type: 'positive',
      description: 'Carrega mais suprimentos.',
      effects: ['Capacidade aumentada'],
      points: -6,
    },
  ],
  skills: [
    {
      id: 'carpentry',
      name: 'Carpintaria',
      category: 'Construcao',
      level: 6,
      maxLevel: 10,
    },
  ],
};

describe('CharacterDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it('renders the loaded character details and section menu', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    expect(await screen.findByText('Maria Knox')).toBeTruthy();
    expect(screen.getByText('Carpinteira')).toBeTruthy();
    expect(screen.getByText('Habilidades')).toBeTruthy();
    expect(screen.getByText('Tracos')).toBeTruthy();
  });

  it('navigates to skills and traits sections', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    await screen.findByText('Maria Knox');

    fireEvent.press(screen.getByRole('button', { name: 'Abrir Habilidades' }));
    fireEvent.press(screen.getByRole('button', { name: 'Abrir Tracos' }));

    expect(mockPush).toHaveBeenCalledWith('./skills');
    expect(mockPush).toHaveBeenCalledWith('./traits');
  });

  it('shows not found state when the character does not exist', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(null);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    expect(await screen.findByText('Ficha indisponivel')).toBeTruthy();
  });
});
