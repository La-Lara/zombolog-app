import { Link } from 'expo-router';

import { Button, EmptyState, Screen, Text } from '@/shared/ui';

export function HomeScreen() {
  return (
    <Screen>
      <Text variant="title">Olá, Sobrevivente</Text>
      <EmptyState
        title="Nenhum personagem"
        description="A lista de personagens será conectada na fase Home."
      />
      <Link href="/characters/new" asChild>
        <Button title="Criar Novo Personagem" />
      </Link>
    </Screen>
  );
}
