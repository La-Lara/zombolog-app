import { PropsWithChildren } from 'react';
import { Text as NativeText, StyleSheet, TextProps as NativeTextProps } from 'react-native';

import { colors, typography } from '@/shared/theme';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'link';

type TextProps = PropsWithChildren<
  NativeTextProps & {
    variant?: TextVariant;
  }
>;

export function Text({ children, style, variant = 'body', ...props }: TextProps) {
  return (
    <NativeText {...props} style={[styles.base, styles[variant], style]}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    letterSpacing: 0,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: typography.subtitle,
    fontWeight: '700',
  },
  body: {
    fontSize: typography.body,
  },
  caption: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  link: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
  },
});
