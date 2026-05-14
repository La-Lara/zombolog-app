import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render';

import { authApi } from '../api/auth-api';
import { useSessionStore } from '../store/session-store';
import { LoginScreen } from './login-screen';

describe('LoginScreen', () => {
  beforeEach(() => {
    useSessionStore.setState({
      isHydrated: true,
      session: null,
    });
    jest.restoreAllMocks();
  });

  it('validates required fields', async () => {
    const screen = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(screen.getByLabelText('Usuario'), 'a');
    fireEvent.changeText(screen.getByLabelText('Usuario'), '');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'a');
    fireEvent.changeText(screen.getByLabelText('Senha'), '');

    expect(await screen.findByText('Informe seu usuario.')).toBeTruthy();
    expect(await screen.findByText('Informe sua senha.')).toBeTruthy();
  });

  it('submits valid credentials and stores the session', async () => {
    const screen = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(screen.getByLabelText('Usuario'), 'survivor');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'secret1');
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Entrar' }).props.accessibilityState.disabled,
      ).toBe(false);
    });
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(useSessionStore.getState().session?.user.username).toBe('survivor');
    });
  });

  it('shows API errors without clearing form state', async () => {
    jest.spyOn(authApi, 'login').mockRejectedValueOnce({
      code: 'invalid_credentials',
      message: 'Usuario ou senha invalidos.',
      status: 401,
      retryable: false,
    });

    const screen = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(screen.getByLabelText('Usuario'), 'survivor');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'wrong-password');
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Entrar' }).props.accessibilityState.disabled,
      ).toBe(false);
    });
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Usuario ou senha invalidos.')).toBeTruthy();
    expect(screen.getByDisplayValue('survivor')).toBeTruthy();
  });
});
