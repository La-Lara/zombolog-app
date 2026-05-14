import { loginSchema, registerSchema } from './auth-schemas';

describe('auth schemas', () => {
  it('trims login username and requires password', () => {
    expect(
      loginSchema.parse({
        username: ' survivor ',
        password: 'secret',
      }),
    ).toEqual({
      username: 'survivor',
      password: 'secret',
    });

    expect(() => loginSchema.parse({ username: 'survivor', password: '' })).toThrow();
  });

  it('validates and normalizes register fields', () => {
    expect(
      registerSchema.parse({
        displayName: ' Ana ',
        username: 'Ana_1993',
        password: 'secret1',
      }),
    ).toEqual({
      displayName: 'Ana',
      username: 'ana_1993',
      password: 'secret1',
    });

    expect(() =>
      registerSchema.parse({
        displayName: 'A',
        username: 'ana-invalid',
        password: '123',
      }),
    ).toThrow();
  });
});
