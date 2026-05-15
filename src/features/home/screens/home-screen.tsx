import { useRouter } from 'expo-router';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { colors, spacing } from '@/shared/theme';
import { ErrorState, LoadingState, Screen, Text } from '@/shared/ui';

import { CharacterCard } from '../components/character-card';
import { CreateCharacterButton } from '../components/create-character-button';
import { EmptyCharactersState } from '../components/empty-characters-state';
import { HomeHeader } from '../components/home-header';
import { useCharactersQuery } from '../hooks/use-characters-query';
import { CharacterSummary } from '../types';

export function HomeScreen() {
  const router = useRouter();
  const { session } = useSession();
  const charactersQuery = useCharactersQuery({
    accessToken: session?.accessToken,
    userId: session?.user.id,
  });

  const characters = charactersQuery.data ?? [];

  function handleOpenCharacter(id: string) {
    router.push({ pathname: '/characters/[id]', params: { id } });
  }

  function handleCreateCharacter() {
    router.push('/characters/new');
  }

  function handleSettingsPress() {
    // Settings are planned, but the header action is part of the Home spec.
  }

  if (charactersQuery.isLoading) {
    return (
      <Screen>
        <HomeHeader
          displayName={session?.user.displayName}
          onSettingsPress={handleSettingsPress}
        />
        <LoadingState label="Carregando sobreviventes..." />
      </Screen>
    );
  }

  if (charactersQuery.isError) {
    return (
      <Screen>
        <HomeHeader
          displayName={session?.user.displayName}
          onSettingsPress={handleSettingsPress}
        />
        <ErrorState
          message="Nao foi possivel carregar seus personagens."
          onRetry={() => void charactersQuery.refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={<EmptyCharactersState onCreatePress={handleCreateCharacter} />}
        ListFooterComponent={
          characters.length > 0 ? (
            <View style={styles.footer}>
              <CreateCharacterButton onPress={handleCreateCharacter} />
            </View>
          ) : null
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <HomeHeader
              displayName={session?.user.displayName}
              onSettingsPress={handleSettingsPress}
            />
            <Text variant="subtitle">Personagens</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        data={characters}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={charactersQuery.isRefetching}
            tintColor={colors.primary}
            onRefresh={() => void charactersQuery.refetch()}
          />
        }
        renderItem={({ item }: { item: CharacterSummary }) => (
          <CharacterCard character={item} onPress={handleOpenCharacter} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.lg,
  },
  footer: {
    paddingTop: spacing.sm,
  },
});
