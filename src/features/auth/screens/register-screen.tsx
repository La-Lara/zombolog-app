import { Link } from 'expo-router';

import { Button, Card, Screen, Text } from '@/shared/ui';

export function RegisterScreen() {
  return (
    <Screen>
      <Card>
        <Text variant="title">Cadastro</Text>
        <Text variant="caption">Cadastro será implementado na fase P1.</Text>
        <Button title="Cadastrar" disabled />
        <Link href="/login">
          <Text variant="link">Entrar</Text>
        </Link>
      </Card>
    </Screen>
  );
}
