import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { Button } from '@/shared/ui';

type WizardFooterProps = {
  canGoBack: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  submitTitle?: string;
  onBack: () => void;
  onNext: () => void;
};

export function WizardFooter({
  canGoBack,
  isLastStep,
  isSubmitting,
  submitTitle = 'Criar Personagem',
  onBack,
  onNext,
}: WizardFooterProps) {
  return (
    <View style={styles.container}>
      <Button disabled={!canGoBack || isSubmitting} title="Voltar" variant="secondary" onPress={onBack} />
      <Button
        isLoading={isSubmitting}
        title={isLastStep ? submitTitle : 'Proximo'}
        onPress={onNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
