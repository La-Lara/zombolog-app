import { fireEvent, waitFor } from '@testing-library/react-native';

import { useSessionStore } from '@/features/auth/store/session-store';
import { makeUserSession } from '@/test/factories/session-factory';
import { renderWithProviders } from '@/test/render';

import { characterApi } from '../api/character-api';
import { Character } from '../types';
import { SkillsScreen } from './skills-screen';

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
  traits: [],
  skills: [{ id: 'aiming', name: 'Mira', category: 'Combate - Armas de Fogo', level: 2, maxLevel: 10 }],
};

describe('SkillsScreen', () => {
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

  it('renders skills grouped in collapsible sections', async () => {
    jest.spyOn(characterApi, 'getCharacter').mockResolvedValueOnce(character);

    const screen = renderWithProviders(<SkillsScreen />);

    expect(await screen.findByText('Maria Knox')).toBeTruthy();
    expect(screen.getByText('Combate - Armas de Fogo')).toBeTruthy();
    expect(screen.getByText('Criação')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Mira')).toBeTruthy();
    });
    expect(screen.queryByText('Carpintaria')).toBeNull();

    fireEvent.press(screen.getByRole('button', { name: 'Expandir Criação' }));

    expect(screen.getByText('Carpintaria')).toBeTruthy();
  });
});
