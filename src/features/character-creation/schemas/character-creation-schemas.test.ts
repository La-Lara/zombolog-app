import {
  basicInfoStepSchema,
  characterCreationSchema,
  locationStepSchema,
  professionStepSchema,
  skillsStepSchema,
  traitsStepSchema,
} from './character-creation-schemas';

describe('character creation schemas', () => {
  it('requires name in the basic info step', () => {
    expect(() =>
      basicInfoStepSchema.parse({ name: '', runMode: '', daysAlive: 0, zombiesKilled: 0 }),
    ).toThrow();

    expect(
      basicInfoStepSchema.parse({
        name: ' Maria Knox ',
        runMode: 'Apocalipse',
        daysAlive: 12,
        zombiesKilled: 45,
      }),
    ).toEqual({
      name: 'Maria Knox',
      runMode: 'Apocalipse',
      daysAlive: 12,
      zombiesKilled: 45,
    });
  });

  it('requires a profession from the catalog', () => {
    expect(() => professionStepSchema.parse({ profession: '' })).toThrow();
    expect(() => professionStepSchema.parse({ profession: 'Carpinteira' })).toThrow();
    expect(professionStepSchema.parse({ profession: 'Carpinteira(o)' })).toEqual({
      profession: 'Carpinteira(o)',
    });
  });

  it('requires a valid run mode in the basic info step', () => {
    expect(() =>
      basicInfoStepSchema.parse({
        name: 'Maria Knox',
        runMode: 'Custom',
        daysAlive: 0,
        zombiesKilled: 0,
      }),
    ).toThrow();
  });

  it('requires survival metrics to be non-negative integers', () => {
    expect(() =>
      basicInfoStepSchema.parse({
        name: 'Maria Knox',
        runMode: 'Apocalipse',
        daysAlive: -1,
        zombiesKilled: 0,
      }),
    ).toThrow();
    expect(() =>
      basicInfoStepSchema.parse({
        name: 'Maria Knox',
        runMode: 'Apocalipse',
        daysAlive: 1.5,
        zombiesKilled: 0,
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
        profession: 'Veterana(o)',
        runMode: 'Sandbox',
        avatarId: 'CharacterF',
        gender: 'Feminino',
        initialCity: 'West Point',
        spawnCity: 'West Point',
        currentCity: 'West Point',
        daysAlive: 31,
        zombiesKilled: 221,
        traitIds: ['corajosa'],
        skills: { aiming: 3 },
      }),
    ).toEqual({
      name: 'Ana Brooks',
      profession: 'Veterana(o)',
      runMode: 'Sandbox',
      avatarId: 'CharacterF',
      gender: 'Feminino',
      initialCity: 'West Point',
      spawnCity: 'West Point',
      currentCity: 'West Point',
      daysAlive: 31,
      zombiesKilled: 221,
      traitIds: ['corajosa'],
      skills: { aiming: 3 },
    });
  });
});
