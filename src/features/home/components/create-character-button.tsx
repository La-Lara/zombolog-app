import { Button } from '@/shared/ui';

type CreateCharacterButtonProps = {
  onPress: () => void;
};

export function CreateCharacterButton({ onPress }: CreateCharacterButtonProps) {
  return <Button title="Criar Novo Personagem" onPress={onPress} />;
}
