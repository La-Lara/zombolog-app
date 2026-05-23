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
  runMode: 'Apocalipse',
  gender: 'Feminino',
  status: 'alive',
  avatarId: 'CharacterF',
  initialCity: 'Rosewood',
  spawnCity: 'Rosewood',
  currentCity: 'Muldraugh',
  daysAlive: 18,
  zombiesKilled: 143,
  traits: [
    {
      id: 'organizada',
      name: 'Organizada',
      type: 'positive',
      description: 'Carrega mais suprimentos.',
      effects: ['Capacidade aumentada'],
      points: -4,
    },
    {
      id: 'fumante',
      name: 'Fumante',
      type: 'negative',
      description: 'Precisa de cigarros para controlar ansiedade.',
      effects: [],
      points: 3,
    },
  ],
  skills: [
    {
      id: 'carpentry',
      name: 'Carpintaria',
      category: 'Construção',
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
    expect(screen.getByText('Apocalipse')).toBeTruthy();
    expect(screen.getByText('Feminino')).toBeTruthy();
    expect(screen.getByText('Cidade inicial')).toBeTruthy();
    expect(screen.getByText('Dias de Sobrevivência')).toBeTruthy();
    expect(screen.getByText('18')).toBeTruthy();
    expect(screen.getByText('Zumbis abatidos')).toBeTruthy();
    expect(screen.getByText('143')).toBeTruthy();
    expect(screen.getAllByText('Rosewood').length).toBeGreaterThan(0);
    expect(screen.getByText('Habilidades')).toBeTruthy();
    expect(screen.getByText('Traços')).toBeTruthy();
    expect(screen.getByText('1 positivo (-4), 1 negativo (+3)')).toBeTruthy();
    expect(screen.queryByText('Métricas')).toBeNull();
    expect(screen.queryByText('Spawn')).toBeNull();
    expect(screen.queryByText('Positivos: Organizada (-4)')).toBeNull();
    expect(screen.queryByText('Negativos: Fumante (+3)')).toBeNull();
  });

  it('navigates to skills and traits sections', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    await screen.findByText('Maria Knox');

    fireEvent.press(screen.getByRole('button', { name: 'Abrir Habilidades' }));
    fireEvent.press(screen.getByRole('button', { name: 'Abrir Traços' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/characters/[id]/skills',
      params: { id: 'character-1' },
    });
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/characters/[id]/traits',
      params: { id: 'character-1' },
    });
  });

  it('navigates to character edit with the current id', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    await screen.findByText('Maria Knox');
    fireEvent.press(screen.getByRole('button', { name: 'Editar Personagem' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/characters/new',
      params: { editId: 'character-1' },
    });
  });

  it('shows not found state when the character does not exist', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(null);

    const screen = renderWithProviders(<CharacterDetailsScreen />);

    expect(await screen.findByText('Ficha indisponível')).toBeTruthy();
  });
});
