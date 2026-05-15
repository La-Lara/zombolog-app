import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/shared/theme';

import { Text } from './text';

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, editable = true, style, ...props },
  ref,
) {
  return (
    <View style={styles.container}>
      <Text variant="caption">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        ref={ref}
        editable={editable}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, !editable ? styles.disabled : null, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export function PasswordField(props: TextFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.passwordWrapper}>
      <TextField
        {...props}
        secureTextEntry={!isVisible}
        style={[styles.passwordInput, props.style]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
        style={styles.toggle}
        onPress={() => setIsVisible((value) => !value)}
      >
        <Text variant="caption">{isVisible ? 'Ocultar' : 'Mostrar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputError: {
    borderColor: colors.danger,
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: colors.danger,
    fontSize: typography.caption,
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 88,
  },
  toggle: {
    minHeight: 44,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: spacing.xs,
    top: 24,
  },
});
