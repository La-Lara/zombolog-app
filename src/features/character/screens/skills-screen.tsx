import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useSession } from '@/features/auth';
import { characterSkillSections } from '@/shared/config/character-skills';
import { colors, radius, spacing } from '@/shared/theme';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '@/shared/ui';

import { ScreenHeader } from '../components/screen-header';
import { SkillMeter } from '../components/skill-meter';
import { useCharacterQuery } from '../hooks/use-character-query';
import { Skill } from '../types';

export function SkillsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const characterId = Array.isArray(id) ? id[0] : id;
  const { session } = useSession();
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>([
    characterSkillSections[0]?.id ?? '',
  ]);
  const characterQuery = useCharacterQuery({
    accessToken: session?.accessToken,
    characterId,
    userId: session?.user.id,
  });
  const character = characterQuery.data;
  const skillsById = useMemo(
    () => new Map((character?.skills ?? []).map((skill) => [skill.id, skill])),
    [character?.skills],
  );

  function handleBack() {
    router.back();
  }

  function toggleSection(sectionId: string) {
    setExpandedSectionIds((currentSectionIds) =>
      currentSectionIds.includes(sectionId) ?
        currentSectionIds.filter((currentSectionId) => currentSectionId !== sectionId)
      : [...currentSectionIds, sectionId],
    );
  }

  if (characterQuery.isLoading) {
    return (
      <Screen>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <LoadingState label="Carregando habilidades..." />
      </Screen>
    );
  }

  if (characterQuery.isError) {
    return (
      <Screen>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <ErrorState
          message="Não foi possível carregar as habilidades."
          onRetry={() => void characterQuery.refetch()}
        />
      </Screen>
    );
  }

  if (!character) {
    return (
      <Screen>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <EmptyState description="Nenhuma habilidade foi registrada para este personagem." title="Sem habilidades" />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <ScreenHeader title="Habilidades" onBack={handleBack} />
        <View style={styles.titleGroup}>
          <Text variant="subtitle">{character.name}</Text>
          <Text variant="caption">Progressão por níveis, no estilo de ficha do Project Zomboid.</Text>
        </View>
      </View>
      {characterSkillSections.map((section) => (
        <SkillSection
          key={section.id}
          isExpanded={expandedSectionIds.includes(section.id)}
          section={section}
          skillsById={skillsById}
          toggleSection={toggleSection}
        />
      ))}
    </Screen>
  );
}

type SkillSectionProps = {
  isExpanded: boolean;
  section: (typeof characterSkillSections)[number];
  skillsById: Map<string, Skill>;
  toggleSection: (sectionId: string) => void;
};

function SkillSection({ isExpanded, section, skillsById, toggleSection }: SkillSectionProps) {
  return (
    <View style={styles.skillSection}>
      <Pressable
        accessibilityLabel={`${isExpanded ? 'Recolher' : 'Expandir'} ${section.title}`}
        accessibilityRole="button"
        onPress={() => toggleSection(section.id)}
        style={({ pressed }) => [styles.skillSectionHeader, pressed ? styles.pressed : null]}
      >
        <Text style={styles.skillSectionIcon}>{isExpanded ? 'v' : '>'}</Text>
        <Text style={styles.skillSectionTitle}>{section.title}</Text>
      </Pressable>
      {isExpanded ?
        section.skills.map((skill) => (
          <SkillMeter key={skill.id} showCategory={false} skill={skillsById.get(skill.id) ?? skill} />
        ))
      : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.md,
  },
  titleGroup: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  skillSection: {
    borderBottomColor: colors.borderMuted,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.sm,
  },
  skillSectionHeader: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 34,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
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
});
