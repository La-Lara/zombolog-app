import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { Text } from '@/shared/ui';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      <Text variant="caption">
        Etapa {currentStep} / {totalSteps}
      </Text>
      <View style={styles.track}>
        {Array.from({ length: totalSteps }, (_step, index) => (
          <View
            key={index}
            style={[styles.segment, index < currentStep ? styles.segmentActive : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  track: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    borderColor: colors.borderMuted,
    borderWidth: 1,
    flex: 1,
    height: 8,
  },
  segmentActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryPressed,
  },
});
