import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render';

import { useSessionStore } from '../store/session-store';
import { RegisterScreen } from './register-screen';

describe('RegisterScreen', () => {
  beforeEach(() => {
    useSessionStore.setState({
      isHydrated: true,
      session: null,
    });
  });

  it('validates fields before submit', async () => {
    const screen = renderWithProviders(<RegisterScreen />);

    fireEvent.changeText(screen.getByLabelText('Nome de exibicao'), 'A');
    fireEvent.changeText(screen.getByLabelText('Usuario'), 'invalid-user');
    fireEvent.changeText(screen.getByLabelText('Senha'), '123');
    fireEvent.press(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(await screen.findByText('Informe pelo menos 2 caracteres.')).toBeTruthy();
    expect(await screen.findByText('Use apenas letras, numeros e _.')).toBeTruthy();
    expect(await screen.findByText('A senha deve ter pelo menos 6 caracteres.')).toBeTruthy();
  });

  it('creates a session after a valid registration', async () => {
    const screen = renderWithProviders(<RegisterScreen />);

    fireEvent.changeText(screen.getByLabelText('Nome de exibicao'), 'Ana Survivor');
    fireEvent.changeText(screen.getByLabelText('Usuario'), 'Ana_1993');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'secret1');
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Cadastrar' }).props.accessibilityState.disabled,
      ).toBe(false);
    });
    fireEvent.press(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(useSessionStore.getState().session?.user.username).toBe('ana_1993');
    });
  });
});
