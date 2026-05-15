import { z } from 'zod';

const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Informe pelo menos 3 caracteres.')
  .max(30, 'Use no maximo 30 caracteres.')
  .regex(/^[a-zA-Z0-9_]+$/, 'Use apenas letras, numeros e _.')
  .transform((value) => value.toLowerCase());

const passwordSchema = z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.');

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Informe seu usuario.'),
  password: z.string().min(1, 'Informe sua senha.'),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'Informe pelo menos 2 caracteres.')
    .max(40, 'Use no maximo 40 caracteres.'),
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
