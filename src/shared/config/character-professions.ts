import type { ImageSourcePropType } from 'react-native';

export type CharacterProfessionId =
  | 'unemployed'
  | 'repairman'
  | 'fire-officer'
  | 'carpenter'
  | 'burger-flipper'
  | 'chef'
  | 'construction-worker'
  | 'doctor'
  | 'electrician'
  | 'nurse'
  | 'engineer'
  | 'farmer'
  | 'smither'
  | 'park-ranger'
  | 'burglar'
  | 'lumberjack'
  | 'mechanic'
  | 'metalworker'
  | 'fitness-instructor'
  | 'fisher'
  | 'police-officer'
  | 'rancher'
  | 'security-guard'
  | 'tailor'
  | 'veteran';

export type CharacterProfession = {
  id: CharacterProfessionId;
  name: string;
  icon: ImageSourcePropType;
};

export const characterProfessions: CharacterProfession[] = [
  makeProfession(
    'unemployed',
    'Desempregada(o)',
    require('../../../assets/professions/desempregada.png') as ImageSourcePropType,
  ),
  makeProfession(
    'repairman',
    'Assistente Técnica(o)',
    require('../../../assets/professions/assistente-tecnica.png') as ImageSourcePropType,
  ),
  makeProfession(
    'fire-officer',
    'Bombeira(o)',
    require('../../../assets/professions/bombeira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'carpenter',
    'Carpinteira(o)',
    require('../../../assets/professions/carpinteira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'burger-flipper',
    'Chapista',
    require('../../../assets/professions/chapista.png') as ImageSourcePropType,
  ),
  makeProfession('chef', 'Chef', require('../../../assets/professions/chef.png') as ImageSourcePropType),
  makeProfession(
    'construction-worker',
    'Construtora Civil(o)',
    require('../../../assets/professions/construtora-civil.png') as ImageSourcePropType,
  ),
  makeProfession(
    'doctor',
    'Doutora(o)',
    require('../../../assets/professions/doutora.png') as ImageSourcePropType,
  ),
  makeProfession(
    'electrician',
    'Eletricista',
    require('../../../assets/professions/eletricista.png') as ImageSourcePropType,
  ),
  makeProfession(
    'nurse',
    'Enfermeira(o)',
    require('../../../assets/professions/enfermeira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'engineer',
    'Engenheira(o)',
    require('../../../assets/professions/engenheira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'farmer',
    'Fazendeira(o)',
    require('../../../assets/professions/fazendeira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'smither',
    'Ferreira(o)',
    require('../../../assets/professions/ferreira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'park-ranger',
    'Guarda Florestal',
    require('../../../assets/professions/guarda-florestal.png') as ImageSourcePropType,
  ),
  makeProfession(
    'burglar',
    'Larápia(o)',
    require('../../../assets/professions/larapia.png') as ImageSourcePropType,
  ),
  makeProfession(
    'lumberjack',
    'Lenhadora(o)',
    require('../../../assets/professions/lenhadora.png') as ImageSourcePropType,
  ),
  makeProfession(
    'mechanic',
    'Mecânica(o)',
    require('../../../assets/professions/mecanica.png') as ImageSourcePropType,
  ),
  makeProfession(
    'metalworker',
    'Metalúrgica(o)',
    require('../../../assets/professions/metalurgica.png') as ImageSourcePropType,
  ),
  makeProfession(
    'fitness-instructor',
    'Personal Trainer',
    require('../../../assets/professions/personal-trainer.png') as ImageSourcePropType,
  ),
  makeProfession(
    'fisher',
    'Pescadora(o)',
    require('../../../assets/professions/pescadora.png') as ImageSourcePropType,
  ),
  makeProfession(
    'police-officer',
    'Policial',
    require('../../../assets/professions/policial.png') as ImageSourcePropType,
  ),
  makeProfession(
    'rancher',
    'Pecuarista',
    require('../../../assets/professions/pecuarista.png') as ImageSourcePropType,
  ),
  makeProfession(
    'security-guard',
    'Segurança',
    require('../../../assets/professions/seguranca.png') as ImageSourcePropType,
  ),
  makeProfession(
    'tailor',
    'Costureira(o)',
    require('../../../assets/professions/costureira.png') as ImageSourcePropType,
  ),
  makeProfession(
    'veteran',
    'Veterana(o)',
    require('../../../assets/professions/veterana.png') as ImageSourcePropType,
  ),
];

const legacyProfessionNames: Record<string, CharacterProfessionId> = {
  Bombeiro: 'fire-officer',
  Bombeira: 'fire-officer',
  Carpinteira: 'carpenter',
  Carpinteiro: 'carpenter',
  Desempregado: 'unemployed',
  Desempregada: 'unemployed',
  Enfermeira: 'nurse',
  Enfermeiro: 'nurse',
  Mecanico: 'mechanic',
  Mecânico: 'mechanic',
  Mecânica: 'mechanic',
  Veterana: 'veteran',
  Veterano: 'veteran',
};

export function getCharacterProfession(professionName?: string | null) {
  const profession =
    characterProfessions.find((currentProfession) => currentProfession.name === professionName) ??
    characterProfessions.find((currentProfession) => currentProfession.id === legacyProfessionNames[professionName ?? '']);

  return profession ?? characterProfessions[0];
}

export function normalizeProfessionName(professionName: string) {
  return getCharacterProfession(professionName).name;
}

function makeProfession(id: CharacterProfessionId, name: string, icon: ImageSourcePropType) {
  return { id, name, icon };
}
