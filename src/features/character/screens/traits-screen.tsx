import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { colors, spacing } from '@/shared/theme';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '@/shared/ui';

import { ScreenHeader } from '../components/screen-header';
import { TraitDescriptionCard } from '../components/trait-description-card';
import { useCharacterQuery } from '../hooks/use-character-query';
import { Trait } from '../types';

export function TraitsScreen() {
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
        <ScreenHeader title="Tracos" onBack={handleBack} />
        <LoadingState label="Carregando tracos..." />
      </Screen>
    );
  }

  if (characterQuery.isError) {
    return (
      <Screen>
        <ScreenHeader title="Tracos" onBack={handleBack} />
        <ErrorState
          message="Nao foi possivel carregar os tracos."
          onRetry={() => void characterQuery.refetch()}
        />
      </Screen>
    );
  }

  const character = characterQuery.data;
  const positiveTraits = character?.traits.filter((trait) => trait.type === 'positive') ?? [];
  const negativeTraits = character?.traits.filter((trait) => trait.type === 'negative') ?? [];

  return (
    <Screen scroll>
      <ScreenHeader title="Tracos" onBack={handleBack} />
      <View style={styles.titleGroup}>
        <Text variant="subtitle">{character?.name ?? 'Personagem'}</Text>
        <Text variant="caption">Vantagens e desvantagens separadas para leitura rapida.</Text>
      </View>
      {positiveTraits.length || negativeTraits.length ? (
        <>
          <TraitSection title="Positivos" traits={positiveTraits} />
          <TraitSection title="Negativos" traits={negativeTraits} />
        </>
      ) : (
        <EmptyState
          description="Nenhum traco foi registrado para este personagem."
          title="Sem tracos"
        />
      )}
    </Screen>
  );
}

function TraitSection({ title, traits }: { title: string; traits: Trait[] }) {
  return (
    <View style={styles.section}>
      <Text variant="subtitle">{title}</Text>
      {traits.length ? (
        traits.map((trait) => <TraitDescriptionCard key={trait.id} trait={trait} />)
      ) : (
        <Text variant="caption">Nenhum traco nesta categoria.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleGroup: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
});
