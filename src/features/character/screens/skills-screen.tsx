import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { colors, spacing } from '@/shared/theme';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '@/shared/ui';

import { ScreenHeader } from '../components/screen-header';
import { SkillMeter } from '../components/skill-meter';
import { useCharacterQuery } from '../hooks/use-character-query';
import { Skill } from '../types';

export function SkillsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const characterId = Array.isArray(id) ? id[0] : id;
  const { session } = useSession();
  const characterQuery = useCharacterQuery({
    accessToken: session?.accessToken,
    characterId,
    userId: session?.user.id,
  });

  function handleBack() {
    router.back();
  }

  if (characterQuery.isLoading) {
    return (
      <Screen>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <LoadingState label="Carregando habilidades..." />
      </Screen>
    );
  }

  if (characterQuery.isError) {
    return (
      <Screen>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <ErrorState
          message="Nao foi possivel carregar as habilidades."
          onRetry={() => void characterQuery.refetch()}
        />
      </Screen>
    );
  }

  const character = characterQuery.data;

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={
          <EmptyState
            description="Nenhuma habilidade foi registrada para este personagem."
            title="Sem habilidades"
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Habilidades" onBack={handleBack} />
            <View style={styles.titleGroup}>
              <Text variant="subtitle">{character?.name ?? 'Personagem'}</Text>
              <Text variant="caption">Progressao por niveis, no estilo de ficha do Project Zomboid.</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.content}
        data={character?.skills ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Skill }) => <SkillMeter skill={item} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.md,
  },
  titleGroup: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
});
