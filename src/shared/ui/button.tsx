import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
} from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';

import { Text } from './text';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
};

export function Button({
  title,
  variant = 'primary',
  disabled,
  isLoading = false,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      disabled={isDisabled}
      style={(state) => {
        const stateStyle =
          typeof style === 'function' ? style(state as PressableStateCallbackType) : style;

        return [
          styles.base,
          styles[variant],
          state.pressed && !isDisabled ? styles.pressed : null,
          isDisabled ? styles.disabled : null,
          stateStyle,
        ];
      }}
      {...props}
    >
      {isLoading ? <ActivityIndicator color={colors.primary} /> : <Text style={styles.label}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
  },
});
