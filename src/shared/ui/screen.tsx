import { PropsWithChildren, RefObject } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spacing } from '@/shared/theme';

import { AppBackground } from './app-background';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  scrollRef?: RefObject<ScrollView | null>;
}>;

export function Screen({ children, scroll = false, scrollRef }: ScreenProps) {
  const content = <View style={styles.content}>{children}</View>;

  return (
    <AppBackground>
      <SafeAreaView style={styles.safeArea}>
        {scroll ? (
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
