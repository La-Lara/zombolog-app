import { z } from 'zod';

import { characterRunModes, professionNames } from '../data/creation-catalog';

const skillLevelSchema = z.number().int().min(0).max(10);
const survivalMetricSchema = z.number().int().min(0, 'Informe um valor maior ou igual a zero.');
const runModeSchema = z.enum(characterRunModes, 'Selecione o modo da run.');
const professionSchema = z.enum(professionNames as [string, ...string[]], 'Selecione uma profissão.');

export const basicInfoStepSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do personagem.'),
  runMode: runModeSchema,
  daysAlive: survivalMetricSchema,
  zombiesKilled: survivalMetricSchema,
});

export const professionStepSchema = z.object({
  profession: professionSchema,
});

export const appearanceStepSchema = z.object({
  avatarId: z.string().trim().min(1, 'Selecione um retrato.'),
  gender: z.string().trim().min(1, 'Selecione um gênero.'),
});

export const locationStepSchema = z.object({
  initialCity: z.string().trim().min(1, 'Selecione a cidade inicial.'),
  spawnCity: z.string().trim().min(1, 'Selecione a cidade inicial.'),
  currentCity: z.string().trim().min(1, 'Selecione a cidade atual.'),
});

export const traitsStepSchema = z.object({
  traitIds: z
    .array(z.string().trim().min(1, 'Remova traços inválidos.'))
    .refine((traitIds) => new Set(traitIds).size === traitIds.length, {
      message: 'Remova traços duplicados.',
    }),
});

export const skillsStepSchema = z.object({
  skills: z.record(z.string(), skillLevelSchema),
});

export const characterCreationSchema = basicInfoStepSchema
  .merge(professionStepSchema)
  .merge(appearanceStepSchema)
  .merge(locationStepSchema)
  .merge(traitsStepSchema)
  .merge(skillsStepSchema);

export type BasicInfoStepValues = z.infer<typeof basicInfoStepSchema>;
export type CharacterCreationValues = z.infer<typeof characterCreationSchema>;
