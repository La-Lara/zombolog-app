import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { useLogout, useSession } from '@/features/auth';
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
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  function handleLogoutPress() {
    Alert.alert('Sair da conta', 'Deseja encerrar sua sessao neste dispositivo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          void handleConfirmLogout();
        },
      },
    ]);
  }

  async function handleConfirmLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch {
      setIsLoggingOut(false);
      Alert.alert('Nao foi possivel sair', 'Tente novamente em alguns instantes.');
    }
  }

  if (charactersQuery.isLoading) {
    return (
      <Screen>
        <HomeHeader
          displayName={session?.user.displayName}
          isLoggingOut={isLoggingOut}
          onLogoutPress={handleLogoutPress}
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
          isLoggingOut={isLoggingOut}
          onLogoutPress={handleLogoutPress}
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
              isLoggingOut={isLoggingOut}
              onLogoutPress={handleLogoutPress}
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
