import { z } from 'zod';

import { characterRunModes } from '../data/creation-catalog';

const skillLevelSchema = z.number().int().min(0).max(10);
const runModeSchema = z.enum(characterRunModes, 'Selecione o modo da run.');

export const basicInfoStepSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do personagem.'),
  profession: z.string().trim().min(1, 'Selecione uma profissao.'),
  runMode: runModeSchema,
});

export const appearanceStepSchema = z.object({
  avatarId: z.string().trim().min(1, 'Selecione um retrato.'),
  gender: z.string().trim().min(1, 'Selecione um genero.'),
});

export const locationStepSchema = z.object({
  initialCity: z.string().trim().min(1, 'Selecione a cidade inicial.'),
  spawnCity: z.string().trim().min(1, 'Selecione a cidade inicial.'),
  currentCity: z.string().trim().min(1, 'Selecione a cidade atual.'),
});

export const traitsStepSchema = z.object({
  traitIds: z.array(z.string()).refine((traitIds) => new Set(traitIds).size === traitIds.length, {
    message: 'Remova tracos duplicados.',
  }),
});

export const skillsStepSchema = z.object({
  skills: z.record(z.string(), skillLevelSchema),
});

export const characterCreationSchema = basicInfoStepSchema
  .merge(appearanceStepSchema)
  .merge(locationStepSchema)
  .merge(traitsStepSchema)
  .merge(skillsStepSchema);

export type BasicInfoStepValues = z.infer<typeof basicInfoStepSchema>;
export type CharacterCreationValues = z.infer<typeof characterCreationSchema>;
