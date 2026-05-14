import { Card, Screen, Text } from '@/shared/ui';

export function CharacterCreationScreen() {
  return (
    <Screen>
      <Text variant="title">Novo Personagem</Text>
      <Card>
        <Text variant="subtitle">Etapa 1 / 6</Text>
        <Text variant="caption">Wizard será implementado na fase Character Creation.</Text>
      </Card>
    </Screen>
  );
}
