import {
  basicInfoStepSchema,
  characterCreationSchema,
  locationStepSchema,
  skillsStepSchema,
  traitsStepSchema,
} from './character-creation-schemas';

describe('character creation schemas', () => {
  it('requires name and profession in the basic info step', () => {
    expect(() => basicInfoStepSchema.parse({ name: '', profession: '', runMode: '' })).toThrow();

    expect(
      basicInfoStepSchema.parse({
        name: ' Maria Knox ',
        profession: 'Carpinteira',
        runMode: 'Apocalipse',
      }),
    ).toEqual({
      name: 'Maria Knox',
      profession: 'Carpinteira',
      runMode: 'Apocalipse',
    });
  });

  it('requires a valid run mode in the basic info step', () => {
    expect(() =>
      basicInfoStepSchema.parse({
        name: 'Maria Knox',
        profession: 'Carpinteira',
        runMode: 'Custom',
      }),
    ).toThrow();
  });

  it('requires initial, spawn and current cities', () => {
    expect(() =>
      locationStepSchema.parse({ initialCity: '', spawnCity: 'Rosewood', currentCity: 'Muldraugh' }),
    ).toThrow();
    expect(() =>
      locationStepSchema.parse({ initialCity: 'Rosewood', spawnCity: 'Rosewood', currentCity: '' }),
    ).toThrow();
    expect(
      locationStepSchema.parse({
        initialCity: 'Rosewood',
        spawnCity: 'Rosewood',
        currentCity: 'Muldraugh',
      }),
    ).toEqual({
      initialCity: 'Rosewood',
      spawnCity: 'Rosewood',
      currentCity: 'Muldraugh',
    });
  });

  it('rejects duplicated traits and skill levels outside the allowed range', () => {
    expect(() => traitsStepSchema.parse({ traitIds: ['em-forma', 'em-forma'] })).toThrow();
    expect(() => traitsStepSchema.parse({ traitIds: [''] })).toThrow();
    expect(() => skillsStepSchema.parse({ skills: { carpentry: 11 } })).toThrow();
  });

  it('validates a complete creation payload', () => {
    expect(
      characterCreationSchema.parse({
        name: 'Ana Brooks',
        profession: 'Veterana',
        runMode: 'Sandbox',
        avatarId: 'CharacterF',
        gender: 'Feminino',
        initialCity: 'West Point',
        spawnCity: 'West Point',
        currentCity: 'West Point',
        traitIds: ['corajosa'],
        skills: { aiming: 3 },
      }),
    ).toEqual({
      name: 'Ana Brooks',
      profession: 'Veterana',
      runMode: 'Sandbox',
      avatarId: 'CharacterF',
      gender: 'Feminino',
      initialCity: 'West Point',
      spawnCity: 'West Point',
      currentCity: 'West Point',
      traitIds: ['corajosa'],
      skills: { aiming: 3 },
    });
  });
});
