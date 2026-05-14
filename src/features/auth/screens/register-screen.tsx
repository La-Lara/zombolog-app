import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { toAppError } from '@/shared/api/errors';
import { colors, spacing } from '@/shared/theme';
import { Button, PasswordField, Text, TextField } from '@/shared/ui';

import { AuthScreenLayout } from '../components/auth-screen-layout';
import { FormFooterLink } from '../components/form-footer-link';
import { useRegisterMutation } from '../hooks/use-register-mutation';
import { RegisterFormValues, registerSchema } from '../schemas/auth-schemas';

export function RegisterScreen() {
  const registerMutation = useRegisterMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      displayName: '',
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const isSubmitting = registerMutation.isPending;
  const mutationError = registerMutation.error ? toAppError(registerMutation.error).message : null;

  return (
    <AuthScreenLayout title="Cadastro" subtitle="Crie uma conta para manter suas fichas seguras.">
      <View style={styles.form}>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextField
              editable={!isSubmitting}
              error={errors.displayName?.message}
              label="Nome de exibicao"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Ana Sobrevivente"
              returnKeyType="next"
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextField
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
              error={errors.username?.message}
              label="Usuario"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="ana_survivor"
              returnKeyType="next"
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <PasswordField
              editable={!isSubmitting}
              error={errors.password?.message}
              label="Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit((values) => registerMutation.mutate(values))}
              placeholder="senha segura"
              returnKeyType="done"
              value={value}
            />
          )}
        />
        {mutationError ? <Text style={styles.error}>{mutationError}</Text> : null}
        <Button
          disabled={!isValid}
          isLoading={isSubmitting}
          title="Cadastrar"
          onPress={handleSubmit((values) => registerMutation.mutate(values))}
        />
      </View>
      <FormFooterLink label="Ja tem conta?" href="/login" actionLabel="Entrar" />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.sm,
  },
  error: {
    color: colors.danger,
  },
});
