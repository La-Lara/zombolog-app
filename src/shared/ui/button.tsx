import { Pressable, PressableProps, PressableStateCallbackType, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';

import { Text } from './text';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
};

export function Button({ title, variant = 'primary', disabled, style, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => {
        const stateStyle =
          typeof style === 'function' ? style(state as PressableStateCallbackType) : style;

        return [
          styles.base,
          styles[variant],
          state.pressed && !disabled ? styles.pressed : null,
          disabled ? styles.disabled : null,
          stateStyle,
        ];
      }}
      {...props}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.background,
    fontWeight: '700',
  },
});
