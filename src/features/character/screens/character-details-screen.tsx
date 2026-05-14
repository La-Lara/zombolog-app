import { useLocalSearchParams } from 'expo-router';

import { Card, Screen, Text } from '@/shared/ui';

export function CharacterDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Text variant="title">Ficha do Personagem</Text>
      <Card>
        <Text variant="subtitle">ID: {id}</Text>
        <Text variant="caption">Detalhe completo será implementado na fase Character.</Text>
      </Card>
    </Screen>
  );
}
