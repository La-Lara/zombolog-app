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

  it('requires spawn and current cities', () => {
    expect(() => locationStepSchema.parse({ spawnCity: 'Rosewood', currentCity: '' })).toThrow();
    expect(locationStepSchema.parse({ spawnCity: 'Rosewood', currentCity: 'Muldraugh' })).toEqual({
      spawnCity: 'Rosewood',
      currentCity: 'Muldraugh',
    });
  });

  it('rejects duplicated traits and skill levels outside the allowed range', () => {
    expect(() => traitsStepSchema.parse({ traitIds: ['fit', 'fit'] })).toThrow();
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
        spawnCity: 'West Point',
        currentCity: 'West Point',
        traitIds: ['lucky'],
        skills: { aiming: 3 },
      }),
    ).toEqual({
      name: 'Ana Brooks',
      profession: 'Veterana',
      runMode: 'Sandbox',
      avatarId: 'CharacterF',
      gender: 'Feminino',
      spawnCity: 'West Point',
      currentCity: 'West Point',
      traitIds: ['lucky'],
      skills: { aiming: 3 },
    });
  });
});
