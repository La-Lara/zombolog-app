import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { spacing } from '@/shared/theme';
import { Button, EmptyState, ErrorState, LoadingState, Screen, Text } from '@/shared/ui';

import { CharacterSummaryCard } from '../components/character-summary-card';
import { ScreenHeader } from '../components/screen-header';
import { SectionMenuItem } from '../components/section-menu-item';
import { useCharacterQuery } from '../hooks/use-character-query';
import { useDeleteCharacterMutation } from '../hooks/use-delete-character-mutation';

export function CharacterDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const characterId = Array.isArray(id) ? id[0] : id;
  const { session } = useSession();
  const characterQuery = useCharacterQuery({
    accessToken: session?.accessToken,
    characterId,
    userId: session?.user.id,
  });
  const deleteCharacterMutation = useDeleteCharacterMutation();

  function handleBack() {
    router.back();
  }

  function handleDelete() {
    if (!characterId) {
      return;
    }

    Alert.alert('Excluir personagem', 'Esta ficha sera removida da sua lista de sobreviventes.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteCharacterMutation.mutate(
            {
              accessToken: session?.accessToken,
              characterId,
              userId: session?.user.id,
            },
            {
              onSuccess: () => router.replace('/home'),
              onError: () =>
                Alert.alert('Erro ao excluir', 'Nao foi possivel excluir o personagem agora.'),
            },
          );
        },
      },
    ]);
  }

  function handleOpenSkills() {
    if (characterId) {
      router.push('./skills');
    }
  }

  function handleOpenTraits() {
    if (characterId) {
      router.push('./traits');
    }
  }

  function handleEdit() {
    if (characterId) {
      router.push({ pathname: '/characters/new', params: { editId: characterId } });
    }
  }

  if (characterQuery.isLoading) {
    return (
      <Screen>
        <ScreenHeader title="Ficha" onBack={handleBack} />
        <LoadingState label="Carregando ficha..." />
      </Screen>
    );
  }

  if (characterQuery.isError) {
    return (
      <Screen>
        <ScreenHeader title="Ficha" onBack={handleBack} />
        <ErrorState
          message="Nao foi possivel carregar a ficha do personagem."
          onRetry={() => void characterQuery.refetch()}
        />
      </Screen>
    );
  }

  if (!characterQuery.data) {
    return (
      <Screen>
        <ScreenHeader title="Ficha" onBack={handleBack} />
        <EmptyState
          description="Esse personagem nao foi encontrado ou ja foi removido."
          title="Ficha indisponivel"
        />
      </Screen>
    );
  }

  const character = characterQuery.data;

  return (
    <Screen scroll>
      <ScreenHeader
        isDeleteDisabled={deleteCharacterMutation.isPending}
        title="Ficha"
        onBack={handleBack}
        onDelete={handleDelete}
      />
      <CharacterSummaryCard character={character} />
      <View style={styles.section}>
        <Text variant="subtitle">Metricas</Text>
        <View style={styles.metrics}>
          <Text variant="caption">Sobrevivencia: {character.daysAlive} dias</Text>
          <Text variant="caption">Combate: {character.zombiesKilled} zumbis abatidos</Text>
          <Text variant="caption">Localizacao: {character.currentCity}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text variant="subtitle">Secoes</Text>
        <SectionMenuItem
          description={`${character.skills.length} habilidades com progresso visual`}
          label="Habilidades"
          onPress={handleOpenSkills}
        />
        <SectionMenuItem
          description={`${character.traits.length} tracos positivos e negativos`}
          label="Tracos"
          onPress={handleOpenTraits}
        />
      </View>
      <Button title="Editar Personagem" onPress={handleEdit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
  },
  metrics: {
    gap: spacing.xs,
  },
});
