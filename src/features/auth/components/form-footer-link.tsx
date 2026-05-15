import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type FormFooterLinkProps = {
  label: string;
  href: '/login' | '/register';
  actionLabel: string;
};

export function FormFooterLink({ label, href, actionLabel }: FormFooterLinkProps) {
  return (
    <View style={styles.container}>
      <Text variant="caption">{label}</Text>
      <Link href={href}>
        <Text variant="link">{actionLabel}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});
