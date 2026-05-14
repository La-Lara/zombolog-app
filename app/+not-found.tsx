import { Link } from 'expo-router';

import { Screen, Text } from '@/shared/ui';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Text variant="title">Rota não encontrada</Text>
      <Link href="/home">
        <Text variant="link">Voltar para home</Text>
      </Link>
    </Screen>
  );
}
