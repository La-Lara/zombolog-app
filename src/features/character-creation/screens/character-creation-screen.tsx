import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { toAppError } from '@/shared/api/errors';
import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { colors, radius, spacing } from '@/shared/theme';
import { Card, EmptyState, ErrorState, LoadingState, Screen, Text, TextField } from '@/shared/ui';

import { FieldSection } from '../components/field-section';
import { OptionChip } from '../components/option-chip';
import { StepIndicator } from '../components/step-indicator';
import { WizardFooter } from '../components/wizard-footer';
import { creationCatalog } from '../data/creation-catalog';
import { useCharacterEditDraftQuery } from '../hooks/use-character-edit-draft-query';
import { useCharacterCreationDraft } from '../hooks/use-character-creation-draft';
import { useCreateCharacterMutation } from '../hooks/use-create-character-mutation';
import { useUpdateCharacterMutation } from '../hooks/use-update-character-mutation';
import {
  appearanceStepSchema,
  basicInfoStepSchema,
  characterCreationSchema,
  locationStepSchema,
  skillsStepSchema,
  traitsStepSchema,
} from '../schemas/character-creation-schemas';
import { CharacterCreationDraft, CharacterRunMode } from '../types';

const totalSteps = 6;

export function CharacterCreationScreen() {
  const router = useRouter();
  const { editId } = useLocalSearchParams<{ editId?: string }>();
  const characterId = Array.isArray(editId) ? editId[0] : editId;
  const isEditMode = Boolean(characterId);
  const { session } = useSession();
  const userId = session?.user.id;
  const { draft, setDraft, isHydrated, clearDraft } = useCharacterCreationDraft(
    isEditMode ? undefined : userId,
  );
  const editDraftQuery = useCharacterEditDraftQuery({
    accessToken: session?.accessToken,
    characterId,
    userId,
  });
  const createCharacterMutation = useCreateCharacterMutation();
  const updateCharacterMutation = useUpdateCharacterMutation();
  const [stepIndex, setStepIndex] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [hasLoadedEditDraft, setHasLoadedEditDraft] = useState(false);
  const isLastStep = stepIndex === totalSteps - 1;
  const selectedTraits = useMemo(
    () => creationCatalog.traits.filter((trait) => draft.traitIds.includes(trait.id)),
    [draft.traitIds],
  );
  const mutationError =
    createCharacterMutation.error ? toAppError(createCharacterMutation.error).message
    : updateCharacterMutation.error ? toAppError(updateCharacterMutation.error).message
    : null;
  const isSubmitting = createCharacterMutation.isPending || updateCharacterMutation.isPending;

  useEffect(() => {
    if (!isEditMode || !editDraftQuery.data || hasLoadedEditDraft) {
      return;
    }

    setDraft(editDraftQuery.data);
    setHasLoadedEditDraft(true);
  }, [editDraftQuery.data, hasLoadedEditDraft, isEditMode, setDraft]);

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
      Alert.alert(isEditMode ? 'Descartar edicao?' : 'Descartar rascunho?', getBackAlertMessage(isEditMode), [
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

    if (isEditMode && characterId) {
      updateCharacterMutation.mutate(
        {
          accessToken: session?.accessToken,
          payload: {
            ...finalResult.data,
            characterId,
            ownerId: userId,
          },
        },
        {
          onSuccess: (updatedCharacter) => {
            router.replace({
              pathname: '/characters/[id]',
              params: { id: updatedCharacter.id },
            });
          },
        },
      );
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

  if (!isHydrated || (isEditMode && editDraftQuery.isLoading)) {
    return (
      <Screen>
        <LoadingState label={isEditMode ? 'Carregando personagem...' : 'Carregando rascunho...'} />
      </Screen>
    );
  }

  if (isEditMode && editDraftQuery.isError) {
    return (
      <Screen>
        <ErrorState
          message="Nao foi possivel carregar o personagem para edicao."
          onRetry={() => void editDraftQuery.refetch()}
        />
      </Screen>
    );
  }

  if (isEditMode && !editDraftQuery.data) {
    return (
      <Screen>
        <EmptyState
          description="Esse personagem nao foi encontrado ou ja foi removido."
          title="Edicao indisponivel"
        />
      </Screen>
    );
  }

  if (isEditMode && !hasLoadedEditDraft) {
    return (
      <Screen>
        <LoadingState label="Preparando edicao..." />
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
        <Text style={styles.title}>{isEditMode ? 'Editar Personagem' : 'Novo Personagem'}</Text>
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
        isSubmitting={isSubmitting}
        submitTitle={isEditMode ? 'Salvar Personagem' : 'Criar Personagem'}
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
        <OptionGroup
          options={creationCatalog.runModes}
          selected={draft.runMode}
          title="Modo da run"
          onSelect={(runMode) => updateDraft({ runMode: runMode as CharacterRunMode })}
        />
      </View>
    );
  }

  if (stepIndex === 1) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Aparencia</Text>
        <PortraitCarousel selected={draft.avatarId} onSelect={(avatarId) => updateDraft({ avatarId })} />
        <OptionGroup
          options={creationCatalog.genders}
          selected={draft.gender}
          title="Genero"
          onSelect={(gender) => updateDraft({ gender })}
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
      <SummaryRow label="Modo da run" value={draft.runMode || 'Nao selecionado'} />
      <SummaryRow label="Retrato" value={getCharacterPortrait(draft.avatarId).label} />
      <SummaryRow label="Genero" value={draft.gender || 'Nao selecionado'} />
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

type PortraitCarouselProps = {
  selected: string;
  onSelect: (avatarId: string) => void;
};

function PortraitCarousel({ selected, onSelect }: PortraitCarouselProps) {
  const selectedIndex = Math.max(
    creationCatalog.avatars.findIndex((avatarId) => avatarId === selected),
    0,
  );
  const portrait = getCharacterPortrait(creationCatalog.avatars[selectedIndex]);

  function selectRelative(offset: number) {
    const nextIndex =
      (selectedIndex + offset + creationCatalog.avatars.length) % creationCatalog.avatars.length;
    onSelect(creationCatalog.avatars[nextIndex]);
  }

  return (
    <FieldSection title="Retrato">
      <View style={styles.portraitCarousel}>
        <Pressable
          accessibilityLabel="Retrato anterior"
          accessibilityRole="button"
          onPress={() => selectRelative(-1)}
          style={({ pressed }) => [styles.carouselArrow, pressed ? styles.pressed : null]}
        >
          <Text style={styles.carouselArrowLabel}>{'<'}</Text>
        </Pressable>
        <View style={[styles.portraitPreview, { aspectRatio: portrait.aspectRatio }]}>
          <Image
            accessibilityLabel={`Retrato ${portrait.label}`}
            resizeMode="cover"
            source={portrait.source}
            style={styles.portraitImage}
          />
        </View>
        <Pressable
          accessibilityLabel="Proximo retrato"
          accessibilityRole="button"
          onPress={() => selectRelative(1)}
          style={({ pressed }) => [styles.carouselArrow, pressed ? styles.pressed : null]}
        >
          <Text style={styles.carouselArrowLabel}>{'>'}</Text>
        </Pressable>
      </View>
    </FieldSection>
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

function hasDraftData(draft: CharacterCreationDraft) {
  return Boolean(
    draft.name.trim() ||
      draft.profession ||
      draft.runMode ||
      draft.spawnCity ||
      draft.currentCity ||
      draft.traitIds.length ||
      Object.values(draft.skills).some((level) => level > 0),
  );
}

function getBackAlertMessage(isEditMode: boolean) {
  if (isEditMode) {
    return 'As alteracoes nao salvas serao perdidas se voce sair agora.';
  }

  return 'Os dados preenchidos ficam salvos se voce continuar no wizard.';
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
    justifyContent: 'center',
    overflow: 'hidden',
    width: 132,
  },
  portraitCarousel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    width: '100%',
  },
  portraitImage: {
    height: '100%',
    width: '100%',
  },
  carouselArrow: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  carouselArrowLabel: {
    color: colors.primary,
    fontSize: 24,
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
