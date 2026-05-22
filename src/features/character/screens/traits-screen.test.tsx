import { useSessionStore } from '@/features/auth/store/session-store';
import { makeUserSession } from '@/test/factories/session-factory';
import { renderWithProviders } from '@/test/render';

import { characterApi } from '../api/character-api';
import { Character } from '../types';
import { TraitsScreen } from './traits-screen';

const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'character-1' }),
  useRouter: () => ({
    back: mockBack,
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
      id: 'corajosa',
      name: 'Corajosa',
      type: 'positive',
      description: 'Corajosa (-4)',
      effects: [],
      points: -4,
    },
    {
      id: 'fumante',
      name: 'Fumante',
      type: 'negative',
      description: 'Fumante (+3)',
      effects: [],
      points: 3,
    },
  ],
  skills: [],
};

describe('TraitsScreen', () => {
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

  it('shows saved positive and negative traits with their points', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<TraitsScreen />);

    expect(await screen.findByText('Ficha de Traços')).toBeTruthy();
    expect(await screen.findByText('Maria Knox')).toBeTruthy();
    expect(screen.getByText('Traços positivos')).toBeTruthy();
    expect(screen.getByText('Traços negativos')).toBeTruthy();
    expect(screen.getByText('Corajosa')).toBeTruthy();
    expect(screen.getByText('-4')).toBeTruthy();
    expect(screen.getByText('Fumante')).toBeTruthy();
    expect(screen.getByText('+3')).toBeTruthy();
  });
});
