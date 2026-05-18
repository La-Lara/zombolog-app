import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { toAppError } from '@/shared/api/errors';
import { colors, radius, spacing } from '@/shared/theme';
import { Card, LoadingState, Screen, Text, TextField } from '@/shared/ui';

import { FieldSection } from '../components/field-section';
import { OptionChip } from '../components/option-chip';
import { StepIndicator } from '../components/step-indicator';
import { WizardFooter } from '../components/wizard-footer';
import { creationCatalog } from '../data/creation-catalog';
import { useCharacterCreationDraft } from '../hooks/use-character-creation-draft';
import { useCreateCharacterMutation } from '../hooks/use-create-character-mutation';
import {
  appearanceStepSchema,
  basicInfoStepSchema,
  characterCreationSchema,
  locationStepSchema,
  skillsStepSchema,
  traitsStepSchema,
} from '../schemas/character-creation-schemas';
import { CharacterCreationDraft } from '../types';

const totalSteps = 6;

export function CharacterCreationScreen() {
  const router = useRouter();
  const { session } = useSession();
  const userId = session?.user.id;
  const { draft, setDraft, isHydrated, clearDraft } = useCharacterCreationDraft(userId);
  const createCharacterMutation = useCreateCharacterMutation();
  const [stepIndex, setStepIndex] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const isLastStep = stepIndex === totalSteps - 1;
  const selectedTraits = useMemo(
    () => creationCatalog.traits.filter((trait) => draft.traitIds.includes(trait.id)),
    [draft.traitIds],
  );
  const mutationError = createCharacterMutation.error
    ? toAppError(createCharacterMutation.error).message
    : null;

  function updateDraft(values: Partial<CharacterCreationDraft>) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      ...values,
    }));
    setStepError(null);
  }

  function validateCurrentStep() {
    const result = getStepSchema(stepIndex).safeParse(draft);

    if (!result.success) {
      setStepError(result.error.issues[0]?.message ?? 'Revise os dados desta etapa.');
      return false;
    }

    setStepError(null);
    return true;
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex((currentStep) => currentStep - 1);
      setStepError(null);
      return;
    }

    if (hasDraftData(draft)) {
      Alert.alert('Descartar rascunho?', 'Os dados preenchidos ficam salvos se voce continuar no wizard.', [
        { text: 'Continuar editando', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => router.back() },
      ]);
      return;
    }

    router.back();
  }

  function handleNext() {
    if (!validateCurrentStep()) {
      return;
    }

    if (!isLastStep) {
      setStepIndex((currentStep) => currentStep + 1);
      return;
    }

    const finalResult = characterCreationSchema.safeParse(draft);

    if (!finalResult.success || !userId) {
      setStepError(finalResult.error?.issues[0]?.message ?? 'Sessao invalida para criar personagem.');
      return;
    }

    createCharacterMutation.mutate(
      {
        accessToken: session?.accessToken,
        payload: {
          ...finalResult.data,
          ownerId: userId,
        },
      },
      {
        onSuccess: async (createdCharacter) => {
          await clearDraft();
          router.replace({
            pathname: '/characters/[id]',
            params: { id: createdCharacter.id },
          });
        },
      },
    );
  }

  if (!isHydrated) {
    return (
      <Screen>
        <LoadingState label="Carregando rascunho..." />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Voltar"
          accessibilityRole="button"
          onPress={handleBack}
          style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
        >
          <Text style={styles.backLabel}>{'<'}</Text>
        </Pressable>
        <Text style={styles.title}>Novo Personagem</Text>
        <View style={styles.headerSpacer} />
      </View>

      <StepIndicator currentStep={stepIndex + 1} totalSteps={totalSteps} />

      <Card>
        {renderStep({
          draft,
          selectedTraits,
          stepIndex,
          updateDraft,
        })}
        {stepError ? <Text style={styles.error}>{stepError}</Text> : null}
        {mutationError ? <Text style={styles.error}>{mutationError}</Text> : null}
      </Card>

      <WizardFooter
        canGoBack={stepIndex > 0}
        isLastStep={isLastStep}
        isSubmitting={createCharacterMutation.isPending}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Screen>
  );
}

type RenderStepParams = {
  draft: CharacterCreationDraft;
  selectedTraits: typeof creationCatalog.traits;
  stepIndex: number;
  updateDraft: (values: Partial<CharacterCreationDraft>) => void;
};

function renderStep({ draft, selectedTraits, stepIndex, updateDraft }: RenderStepParams) {
  if (stepIndex === 0) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Informacoes Basicas</Text>
        <TextField
          label="Nome"
          onChangeText={(name) => updateDraft({ name })}
          placeholder="Maria Knox"
          value={draft.name}
        />
        <FieldSection title="Profissao">
          {creationCatalog.professions.map((profession) => (
            <OptionChip
              key={profession}
              label={profession}
              selected={draft.profession === profession}
              onPress={() => updateDraft({ profession })}
            />
          ))}
        </FieldSection>
      </View>
    );
  }

  if (stepIndex === 1) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Aparencia</Text>
        <View style={styles.portraitPreview}>
          <Text style={styles.portraitInitial}>{getInitials(draft.name)}</Text>
          <Text variant="caption">{draft.avatarId}</Text>
        </View>
        <OptionGroup
          options={creationCatalog.avatars}
          selected={draft.avatarId}
          title="Retrato"
          onSelect={(avatarId) => updateDraft({ avatarId })}
        />
        <OptionGroup
          options={creationCatalog.genders}
          selected={draft.gender}
          title="Genero"
          onSelect={(gender) => updateDraft({ gender })}
        />
        <OptionGroup
          options={creationCatalog.skinTones}
          selected={draft.skinTone}
          title="Tom de pele"
          onSelect={(skinTone) => updateDraft({ skinTone })}
        />
        <OptionGroup
          options={creationCatalog.hairStyles}
          selected={draft.hairStyle}
          title="Cabelo"
          onSelect={(hairStyle) => updateDraft({ hairStyle })}
        />
        <OptionGroup
          options={creationCatalog.hairColors}
          selected={draft.hairColor}
          title="Cor do cabelo"
          onSelect={(hairColor) => updateDraft({ hairColor })}
        />
      </View>
    );
  }

  if (stepIndex === 2) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Localizacao</Text>
        <FieldSection title="Cidade inicial">
          {creationCatalog.cities.map((spawnCity) => (
            <OptionChip
              key={spawnCity}
              label={spawnCity}
              selected={draft.spawnCity === spawnCity}
              onPress={() =>
                updateDraft({
                  spawnCity,
                  currentCity: draft.currentCity || spawnCity,
                })
              }
            />
          ))}
        </FieldSection>
        <OptionGroup
          options={creationCatalog.cities}
          selected={draft.currentCity}
          title="Cidade atual"
          onSelect={(currentCity) => updateDraft({ currentCity })}
        />
      </View>
    );
  }

  if (stepIndex === 3) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Tracos</Text>
        <TraitGroup draft={draft} type="positive" updateDraft={updateDraft} />
        <TraitGroup draft={draft} type="negative" updateDraft={updateDraft} />
      </View>
    );
  }

  if (stepIndex === 4) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Habilidades</Text>
        {creationCatalog.skills.map((skill) => {
          const level = draft.skills[skill.id] ?? 0;

          return (
            <View key={skill.id} style={styles.skillRow}>
              <View style={styles.skillTitle}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text variant="caption">{skill.category}</Text>
              </View>
              <View style={styles.skillControls}>
                <Pressable
                  accessibilityLabel={`Diminuir ${skill.name}`}
                  accessibilityRole="button"
                  onPress={() =>
                    updateDraft({ skills: { ...draft.skills, [skill.id]: Math.max(level - 1, 0) } })
                  }
                  style={styles.skillButton}
                >
                  <Text>-</Text>
                </Pressable>
                <Text style={styles.skillLevel}>{level}</Text>
                <Pressable
                  accessibilityLabel={`Aumentar ${skill.name}`}
                  accessibilityRole="button"
                  onPress={() =>
                    updateDraft({
                      skills: { ...draft.skills, [skill.id]: Math.min(level + 1, skill.maxLevel) },
                    })
                  }
                  style={styles.skillButton}
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.step}>
      <Text variant="subtitle">Resumo</Text>
      <SummaryRow label="Nome" value={draft.name || 'Sem nome'} />
      <SummaryRow label="Profissao" value={draft.profession || 'Nao selecionada'} />
      <SummaryRow
        label="Localizacao"
        value={`${draft.spawnCity || 'Origem'} -> ${draft.currentCity || 'Atual'}`}
      />
      <SummaryRow label="Sobrevivencia" value="0 dias vivos - 0 zumbis mortos" />
      <FieldSection title="Tracos selecionados">
        {selectedTraits.length ? (
          selectedTraits.map((trait) => (
            <OptionChip key={trait.id} label={trait.name} selected onPress={() => undefined} />
          ))
        ) : (
          <Text variant="caption">Nenhum traco selecionado.</Text>
        )}
      </FieldSection>
    </View>
  );
}

type OptionGroupProps = {
  options: string[];
  selected: string;
  title: string;
  onSelect: (value: string) => void;
};

function OptionGroup({ options, selected, title, onSelect }: OptionGroupProps) {
  return (
    <FieldSection title={title}>
      {options.map((option) => (
        <OptionChip key={option} label={option} selected={selected === option} onPress={() => onSelect(option)} />
      ))}
    </FieldSection>
  );
}

type TraitGroupProps = {
  draft: CharacterCreationDraft;
  type: 'positive' | 'negative';
  updateDraft: (values: Partial<CharacterCreationDraft>) => void;
};

function TraitGroup({ draft, type, updateDraft }: TraitGroupProps) {
  const title = type === 'positive' ? 'Positivos' : 'Negativos';

  return (
    <FieldSection title={title}>
      {creationCatalog.traits
        .filter((trait) => trait.type === type)
        .map((trait) => (
          <OptionChip
            key={trait.id}
            label={`${trait.name} (${trait.points > 0 ? '+' : ''}${trait.points})`}
            selected={draft.traitIds.includes(trait.id)}
            onPress={() => updateDraft({ traitIds: toggleValue(draft.traitIds, trait.id) })}
          />
        ))}
    </FieldSection>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text variant="caption">{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

function getStepSchema(stepIndex: number) {
  const schemas = [
    basicInfoStepSchema,
    appearanceStepSchema,
    locationStepSchema,
    traitsStepSchema,
    skillsStepSchema,
    characterCreationSchema,
  ];

  return schemas[stepIndex];
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || '??';
}

function hasDraftData(draft: CharacterCreationDraft) {
  return Boolean(
    draft.name.trim() ||
      draft.profession ||
      draft.spawnCity ||
      draft.currentCity ||
      draft.traitIds.length ||
      Object.values(draft.skills).some((level) => level > 0),
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  backLabel: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  step: {
    gap: spacing.md,
  },
  error: {
    color: colors.danger,
  },
  pressed: {
    opacity: 0.82,
  },
  portraitPreview: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    height: 112,
    justifyContent: 'center',
    width: 112,
  },
  portraitInitial: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '700',
  },
  skillRow: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  skillTitle: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  skillName: {
    fontWeight: '700',
  },
  skillControls: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  skillButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  skillLevel: {
    color: colors.primary,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },
  summaryRow: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
});
