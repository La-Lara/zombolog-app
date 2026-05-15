import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { toAppError } from '@/shared/api/errors';
import { colors, spacing } from '@/shared/theme';
import { Button, PasswordField, Text, TextField } from '@/shared/ui';

import { AuthScreenLayout } from '../components/auth-screen-layout';
import { FormFooterLink } from '../components/form-footer-link';
import { useLoginMutation } from '../hooks/use-login-mutation';
import { LoginFormValues, loginSchema } from '../schemas/auth-schemas';

export function LoginScreen() {
  const loginMutation = useLoginMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const isSubmitting = loginMutation.isPending;
  const mutationError = loginMutation.error ? toAppError(loginMutation.error).message : null;

  return (
    <AuthScreenLayout title="Entrar" subtitle="Acesse suas fichas de sobreviventes.">
      <View style={styles.form}>
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
              placeholder="survivor_1993"
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
              onSubmitEditing={handleSubmit((values) => loginMutation.mutate(values))}
              placeholder="senha"
              returnKeyType="done"
              value={value}
            />
          )}
        />
        {mutationError ? <Text style={styles.error}>{mutationError}</Text> : null}
        <Button
          disabled={!isValid}
          isLoading={isSubmitting}
          title="Entrar"
          onPress={handleSubmit((values) => loginMutation.mutate(values))}
        />
      </View>
      <FormFooterLink label="Novo por aqui?" href="/register" actionLabel="Cadastre-se" />
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
