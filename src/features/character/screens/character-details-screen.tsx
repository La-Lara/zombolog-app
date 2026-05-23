import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { formatTraitPoints } from '@/shared/config/character-traits';
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

    Alert.alert('Excluir personagem', 'Esta ficha será removida da sua lista de sobreviventes.', [
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
                Alert.alert('Erro ao excluir', 'Não foi possível excluir o personagem agora.'),
            },
          );
        },
      },
    ]);
  }

  function handleOpenSkills() {
    if (characterId) {
      router.push({ pathname: '/characters/[id]/skills', params: { id: characterId } });
    }
  }

  function handleOpenTraits() {
    if (characterId) {
      router.push({ pathname: '/characters/[id]/traits', params: { id: characterId } });
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
          message="Não foi possível carregar a ficha do personagem."
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
          description="Esse personagem não foi encontrado ou já foi removido."
          title="Ficha indisponível"
        />
      </Screen>
    );
  }

  const character = characterQuery.data;
  const positiveTraits = character.traits.filter((trait) => trait.type === 'positive');
  const negativeTraits = character.traits.filter((trait) => trait.type === 'negative');

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
        <Text variant="subtitle">Seções</Text>
        <SectionMenuItem
          description={`${character.skills.length} habilidades com progresso visual`}
          label="Habilidades"
          onPress={handleOpenSkills}
        />
        <SectionMenuItem
          description={formatTraitsSummary(positiveTraits, negativeTraits)}
          label="Traços"
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
});

function formatTraitsSummary(
  positiveTraits: { points: number }[],
  negativeTraits: { points: number }[],
) {
  const positivePoints = positiveTraits.reduce((total, trait) => total + trait.points, 0);
  const negativePoints = negativeTraits.reduce((total, trait) => total + trait.points, 0);

  return `${formatTraitCount(positiveTraits.length, 'positivo')} (${formatTraitPoints(positivePoints)}), ${formatTraitCount(negativeTraits.length, 'negativo')} (${formatTraitPoints(negativePoints)})`;
}

function formatTraitCount(count: number, label: 'positivo' | 'negativo') {
  return `${count} ${count === 1 ? label : `${label}s`}`;
}
