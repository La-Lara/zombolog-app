import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { toAppError } from '@/shared/api/errors';
import { getCharacterPortrait } from '@/shared/config/character-portraits';
import { formatTraitPoints, normalizeTraitId, resolveCharacterTraits } from '@/shared/config/character-traits';
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
  const [traitSearch, setTraitSearch] = useState('');
  const [expandedSkillSectionIds, setExpandedSkillSectionIds] = useState<string[]>([]);
  const [hasLoadedEditDraft, setHasLoadedEditDraft] = useState(false);
  const isLastStep = stepIndex === totalSteps - 1;
  const selectedTraits = useMemo(
    () => resolveCharacterTraits(draft.traitIds, draft.legacyTraits),
    [draft.legacyTraits, draft.traitIds],
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

    setDraft({
      ...editDraftQuery.data,
      traitIds: [...new Set(editDraftQuery.data.traitIds.map(normalizeTraitId))],
    });
    setHasLoadedEditDraft(true);
  }, [editDraftQuery.data, hasLoadedEditDraft, isEditMode, setDraft]);

  function updateDraft(values: Partial<CharacterCreationDraft>) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      ...values,
    }));
    setStepError(null);
  }

  function toggleSkillSection(sectionId: string) {
    setExpandedSkillSectionIds((currentSectionIds) =>
      currentSectionIds.includes(sectionId) ?
        currentSectionIds.filter((currentSectionId) => currentSectionId !== sectionId)
      : [...currentSectionIds, sectionId],
    );
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
      Alert.alert(isEditMode ? 'Descartar edição?' : 'Descartar rascunho?', getBackAlertMessage(isEditMode), [
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
          message="Não foi possível carregar o personagem para edição."
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
          title="Edição indisponível"
        />
      </Screen>
    );
  }

  if (isEditMode && !hasLoadedEditDraft) {
    return (
      <Screen>
        <LoadingState label="Preparando edição..." />
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
          traitSearch,
          setTraitSearch,
          expandedSkillSectionIds,
          toggleSkillSection,
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
  traitSearch: string;
  setTraitSearch: (value: string) => void;
  expandedSkillSectionIds: string[];
  toggleSkillSection: (sectionId: string) => void;
  stepIndex: number;
  updateDraft: (values: Partial<CharacterCreationDraft>) => void;
};

function renderStep({
  draft,
  selectedTraits,
  stepIndex,
  traitSearch,
  setTraitSearch,
  expandedSkillSectionIds,
  toggleSkillSection,
  updateDraft,
}: RenderStepParams) {
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
        <FieldSection title="Profissão">
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
        <FieldSection title="Métricas de sobrevivência">
          <View style={styles.metricInputs}>
            <TextField
              label="Dias de Sobrevivência"
              keyboardType="number-pad"
              onChangeText={(value) => updateDraft({ daysAlive: parseMetricInput(value) })}
              placeholder="0"
              value={String(draft.daysAlive)}
            />
            <TextField
              label="Zumbis abatidos"
              keyboardType="number-pad"
              onChangeText={(value) => updateDraft({ zombiesKilled: parseMetricInput(value) })}
              placeholder="0"
              value={String(draft.zombiesKilled)}
            />
          </View>
        </FieldSection>
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
        <Text variant="subtitle">Localização</Text>
        <FieldSection title="Cidade inicial">
          {creationCatalog.cities.map((initialCity) => (
            <OptionChip
              key={initialCity}
              label={initialCity}
              selected={draft.initialCity === initialCity}
              onPress={() =>
                updateDraft({
                  initialCity,
                  spawnCity: initialCity,
                  currentCity: draft.currentCity || initialCity,
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
        <Text variant="subtitle">Traços</Text>
        <TextField
          label="Buscar traço"
          onChangeText={setTraitSearch}
          placeholder="Filtrar por nome"
          value={traitSearch}
        />
        <TraitGroup draft={draft} search={traitSearch} type="positive" updateDraft={updateDraft} />
        <TraitGroup draft={draft} search={traitSearch} type="negative" updateDraft={updateDraft} />
      </View>
    );
  }

  if (stepIndex === 4) {
    return (
      <View style={styles.step}>
        <Text variant="subtitle">Habilidades</Text>
        {creationCatalog.skillSections.map((section) => (
          <SkillEditorSection
            key={section.id}
            draft={draft}
            isExpanded={expandedSkillSectionIds.includes(section.id)}
            section={section}
            toggleSkillSection={toggleSkillSection}
            updateDraft={updateDraft}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.step}>
      <Text variant="subtitle">Resumo</Text>
      <SummaryRow label="Nome" value={draft.name || 'Sem nome'} />
      <SummaryRow label="Profissão" value={draft.profession || 'Não selecionada'} />
      <SummaryRow label="Modo da run" value={draft.runMode || 'Não selecionado'} />
      <SummaryRow label="Retrato" value={getCharacterPortrait(draft.avatarId).label} />
      <SummaryRow label="Gênero" value={draft.gender || 'Não selecionado'} />
      <SummaryRow label="Cidade inicial" value={draft.initialCity || 'Não selecionada'} />
      <SummaryRow
        label="Localização"
        value={`${draft.initialCity || draft.spawnCity || 'Origem'} -> ${draft.currentCity || 'Atual'}`}
      />
      <SummaryRow
        label="Sobrevivência"
        value={`${draft.daysAlive} dias de sobrevivência - ${draft.zombiesKilled} zumbis abatidos`}
      />
      <TraitSummary selectedTraits={selectedTraits} />
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
  search: string;
  type: 'positive' | 'negative';
  updateDraft: (values: Partial<CharacterCreationDraft>) => void;
};

function TraitGroup({ draft, search, type, updateDraft }: TraitGroupProps) {
  const title = type === 'positive' ? 'Positivos' : 'Negativos';
  const normalizedSearch = search.trim().toLowerCase();
  const traits = creationCatalog.traits.filter(
    (trait) => trait.type === type && trait.name.toLowerCase().includes(normalizedSearch),
  );

  return (
    <FieldSection title={title}>
      {traits.length ? (
        traits.map((trait) => (
          <OptionChip
            key={trait.id}
            label={`${trait.name} (${formatTraitPoints(trait.points)})`}
            selected={draft.traitIds.includes(trait.id)}
            onPress={() => updateDraft({ traitIds: toggleValue(draft.traitIds, trait.id) })}
          />
        ))
      ) : (
        <Text variant="caption">Nenhum traço encontrado nesta categoria.</Text>
      )}
    </FieldSection>
  );
}

function TraitSummary({ selectedTraits }: { selectedTraits: typeof creationCatalog.traits }) {
  const positiveTraits = selectedTraits.filter((trait) => trait.type === 'positive');
  const negativeTraits = selectedTraits.filter((trait) => trait.type === 'negative');

  if (!selectedTraits.length) {
    return (
      <FieldSection title="Traços selecionados">
        <Text variant="caption">Nenhum traço selecionado.</Text>
      </FieldSection>
    );
  }

  return (
    <>
      <FieldSection title="Traços positivos">
        {positiveTraits.length ? (
          positiveTraits.map((trait) => (
            <OptionChip
              key={trait.id}
              label={`${trait.name} (${formatTraitPoints(trait.points)})`}
              selected
              onPress={() => undefined}
            />
          ))
        ) : (
          <Text variant="caption">Nenhum traço positivo selecionado.</Text>
        )}
      </FieldSection>
      <FieldSection title="Traços negativos">
        {negativeTraits.length ? (
          negativeTraits.map((trait) => (
            <OptionChip
              key={trait.id}
              label={`${trait.name} (${formatTraitPoints(trait.points)})`}
              selected
              onPress={() => undefined}
            />
          ))
        ) : (
          <Text variant="caption">Nenhum traço negativo selecionado.</Text>
        )}
      </FieldSection>
    </>
  );
}

type SkillEditorSectionProps = {
  draft: CharacterCreationDraft;
  isExpanded: boolean;
  section: (typeof creationCatalog.skillSections)[number];
  toggleSkillSection: (sectionId: string) => void;
  updateDraft: (values: Partial<CharacterCreationDraft>) => void;
};

function SkillEditorSection({
  draft,
  isExpanded,
  section,
  toggleSkillSection,
  updateDraft,
}: SkillEditorSectionProps) {
  return (
    <View style={styles.skillSection}>
      <Pressable
        accessibilityLabel={`${isExpanded ? 'Recolher' : 'Expandir'} ${section.title}`}
        accessibilityRole="button"
        onPress={() => toggleSkillSection(section.id)}
        style={({ pressed }) => [styles.skillSectionHeader, pressed ? styles.pressed : null]}
      >
        <Text style={styles.skillSectionIcon}>{isExpanded ? 'v' : '>'}</Text>
        <Text style={styles.skillSectionTitle}>{section.title}</Text>
      </Pressable>
      {isExpanded ?
        section.skills.map((skill) => {
          const level = draft.skills[skill.id] ?? 0;

          return (
            <View key={skill.id} style={styles.skillRow}>
              <View style={styles.skillTitle}>
                <Text style={styles.skillName}>{skill.name}</Text>
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
        })
      : null}
    </View>
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

function parseMetricInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return 0;
  }

  return Number.parseInt(digits, 10);
}

function hasDraftData(draft: CharacterCreationDraft) {
  return Boolean(
    draft.name.trim() ||
      draft.profession ||
      draft.runMode ||
      draft.initialCity ||
      draft.spawnCity ||
      draft.currentCity ||
      draft.daysAlive > 0 ||
      draft.zombiesKilled > 0 ||
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
  metricInputs: {
    gap: spacing.md,
    width: '100%',
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
  skillSection: {
    gap: spacing.sm,
  },
  skillSectionHeader: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  skillSectionIcon: {
    color: colors.primary,
    fontWeight: '700',
    width: 16,
  },
  skillSectionTitle: {
    flex: 1,
    fontWeight: '700',
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
