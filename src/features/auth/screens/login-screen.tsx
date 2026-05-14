import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button, Card, Screen, Text } from '@/shared/ui';

export function LoginScreen() {
  return (
    <Screen>
      <Card style={styles.card}>
        <Text variant="title">Project Zomboid</Text>
        <Text variant="caption">Login será implementado na fase P1.</Text>
        <Button title="Entrar" disabled />
        <Link href="/register">
          <Text variant="link">Cadastre-se</Text>
        </Link>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
