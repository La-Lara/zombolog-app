import { act, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { useSessionStore } from '@/features/auth/store/session-store';
import { makeUserSession } from '@/test/factories/session-factory';
import { renderWithProviders } from '@/test/render';

import { charactersApi } from '../api/characters-api';
import { CharacterSummary } from '../types';
import { HomeScreen } from './home-screen';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const character: CharacterSummary = {
  id: 'character-1',
  name: 'Maria Knox',
  profession: 'Carpinteira',
  status: 'alive',
  avatarId: null,
  currentCity: 'Muldraugh',
  daysAlive: 18,
  zombiesKilled: 143,
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSessionStore.setState({
      isHydrated: true,
      session: makeUserSession(),
    });
  });

  it('shows loading while characters are being fetched', () => {
    jest.spyOn(charactersApi, 'listCharacters').mockImplementation(
      () =>
        new Promise(() => {
          // Keep query pending for the loading assertion.
        }),
    );

    const screen = renderWithProviders(<HomeScreen />);

    expect(screen.getByText('Carregando sobreviventes...')).toBeTruthy();
  });

  it('renders characters and navigates to details', async () => {
    jest.spyOn(charactersApi, 'listCharacters').mockResolvedValueOnce([character]);

    const screen = renderWithProviders(<HomeScreen />);

    expect(await screen.findByText('Maria Knox')).toBeTruthy();
    expect(screen.getByText('Carpinteira')).toBeTruthy();
    expect(screen.getByText('Muldraugh')).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: 'Abrir ficha de Maria Knox' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/characters/[id]',
      params: { id: 'character-1' },
    });
  });

  it('shows empty state and navigates to character creation', async () => {
    jest.spyOn(charactersApi, 'listCharacters').mockResolvedValueOnce([]);

    const screen = renderWithProviders(<HomeScreen />);

    expect(await screen.findByText('Nenhum personagem')).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: 'Criar Novo Personagem' }));

    expect(mockPush).toHaveBeenCalledWith('/characters/new');
  });

  it('shows error state and retries the query', async () => {
    const listCharacters = jest
      .spyOn(charactersApi, 'listCharacters')
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce([character]);

    const screen = renderWithProviders(<HomeScreen />);

    expect(await screen.findByText('Nao foi possivel carregar seus personagens.')).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: 'Tentar novamente' }));

    await waitFor(() => {
      expect(listCharacters).toHaveBeenCalledTimes(2);
    });
  });

  it('confirms logout and clears the current session', async () => {
    jest.spyOn(charactersApi, 'listCharacters').mockResolvedValueOnce([character]);
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

    const screen = renderWithProviders(<HomeScreen />);

    expect(await screen.findByText('Maria Knox')).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: 'Sair da conta' }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Sair da conta',
      'Deseja encerrar sua sessao neste dispositivo?',
      expect.any(Array),
    );

    const actions = alertSpy.mock.calls[0][2];
    await act(async () => {
      actions?.[1]?.onPress?.();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(useSessionStore.getState().session).toBeNull();
    });
  });
});
