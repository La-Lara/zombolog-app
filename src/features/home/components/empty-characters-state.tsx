import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { EmptyState } from '@/shared/ui';

import { CreateCharacterButton } from './create-character-button';

type EmptyCharactersStateProps = {
  onCreatePress: () => void;
};

export function EmptyCharactersState({ onCreatePress }: EmptyCharactersStateProps) {
  return (
    <View style={styles.container}>
      <EmptyState
        title="Nenhum personagem"
        description="Crie sua primeira ficha para acompanhar dias de sobrevivência, cidade atual e progresso da campanha."
      />
      <CreateCharacterButton onPress={onCreatePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
});
