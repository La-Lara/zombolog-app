import { getCharacterSkill } from '@/shared/config/character-skills';
import { getCharacterTrait, normalizeCharacterTraits } from '@/shared/config/character-traits';

import { getLocalDatabase } from './local-database';

type LocalDatabase = Awaited<ReturnType<typeof getLocalDatabase>>;

export type LocalCharacterStatus = 'alive' | 'dead' | 'missing';

export type LocalCharacterRunMode =
  | 'Apocalipse'
  | 'Outbreak'
  | 'Rising'
  | 'Extinction'
  | 'Sandbox'
  | 'Desafio: Um Dia De Cão';

export type LocalTraitType = 'positive' | 'negative';

export type LocalSyncStatus = 'synced' | 'created' | 'updated' | 'deleted';

export type LocalTrait = {
  id: string;
  name: string;
  type: LocalTraitType;
  description: string;
  effects: string[];
  points: number;
};

export type LocalSkill = {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
};

export type LocalCharacter = {
  id: string;
  remoteId?: string | null;
  ownerId: string;
  name: string;
  profession: string;
  runMode: LocalCharacterRunMode;
  gender: string;
  status: LocalCharacterStatus;
  avatarId?: string | null;
  initialCity: string;
  spawnCity: string;
  currentCity: string;
  daysAlive: number;
  zombiesKilled: number;
  traits: LocalTrait[];
  skills: LocalSkill[];
  syncStatus: LocalSyncStatus;
  syncVersion: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  lastSyncedAt?: string | null;
};

export type CreateLocalCharacterInput = Pick<
  LocalCharacter,
  | 'ownerId'
  | 'name'
  | 'profession'
  | 'runMode'
  | 'gender'
  | 'avatarId'
  | 'initialCity'
  | 'spawnCity'
  | 'currentCity'
  | 'daysAlive'
  | 'zombiesKilled'
  | 'traits'
  | 'skills'
>;

export type UpdateLocalCharacterInput = Pick<
  LocalCharacter,
  | 'name'
  | 'profession'
  | 'runMode'
  | 'gender'
  | 'avatarId'
  | 'initialCity'
  | 'spawnCity'
  | 'currentCity'
  | 'daysAlive'
  | 'zombiesKilled'
  | 'traits'
  | 'skills'
>;

type LocalCharacterRow = {
  id: string;
  remote_id: string | null;
  owner_id: string;
  name: string;
  profession: string;
  run_mode?: LocalCharacterRunMode | null;
  gender?: string | null;
  status: LocalCharacterStatus;
  avatar_id: string | null;
  initial_city?: string | null;
  spawn_city: string;
  current_city: string;
  days_alive: number;
  zombies_killed: number;
  traits_json: string;
  skills_json: string;
  sync_status: LocalSyncStatus;
  sync_version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  last_synced_at: string | null;
};

function makeSeedCharacters(ownerId: string, now: string): LocalCharacter[] {
  return [
    {
      id: `${ownerId}.maria-knox`,
      remoteId: null,
      ownerId,
      name: 'Maria Knox',
      profession: 'Carpinteira',
      runMode: 'Apocalipse',
      gender: 'Feminino',
      status: 'alive',
      avatarId: 'CharacterF',
      initialCity: 'Rosewood',
      spawnCity: 'Rosewood',
      currentCity: 'Muldraugh',
      daysAlive: 18,
      zombiesKilled: 143,
      syncStatus: 'synced',
      syncVersion: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      lastSyncedAt: null,
      traits: [
        getCharacterTrait('leitora-rapida'),
        getCharacterTrait('organizada'),
        getCharacterTrait('sedenta'),
      ].filter((trait): trait is LocalTrait => Boolean(trait)),
      skills: [
        makeLocalSkill('carpentry', 6),
        makeLocalSkill('cooking', 3),
        makeLocalSkill('foraging', 4),
        makeLocalSkill('sprinting', 2),
        makeLocalSkill('nimble', 2),
        makeLocalSkill('long-blunt', 5),
        makeLocalSkill('maintenance', 4),
      ],
    },
    {
      id: `${ownerId}.eduardo-riverside`,
      remoteId: null,
      ownerId,
      name: 'Eduardo Miller',
      profession: 'Bombeiro',
      runMode: 'Outbreak',
      gender: 'Masculino',
      status: 'alive',
      avatarId: 'CharacterM',
      initialCity: 'Riverside',
      spawnCity: 'Riverside',
      currentCity: 'Riverside',
      daysAlive: 9,
      zombiesKilled: 67,
      syncStatus: 'synced',
      syncVersion: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      lastSyncedAt: null,
      traits: [
        getCharacterTrait('em-forma'),
        getCharacterTrait('robusta'),
        getCharacterTrait('leitora-lenta'),
      ].filter((trait): trait is LocalTrait => Boolean(trait)),
      skills: [
        makeLocalSkill('fitness', 7),
        makeLocalSkill('strength', 6),
        makeLocalSkill('axes', 4),
        makeLocalSkill('sprinting', 5),
        makeLocalSkill('first-aid', 2),
        makeLocalSkill('mechanics', 1),
      ],
    },
    {
      id: `${ownerId}.ana-westpoint`,
      remoteId: null,
      ownerId,
      name: 'Ana Brooks',
      profession: 'Veterana',
      runMode: 'Sandbox',
      gender: 'Feminino',
      status: 'missing',
      avatarId: 'CharacterF',
      initialCity: 'West Point',
      spawnCity: 'West Point',
      currentCity: 'West Point',
      daysAlive: 31,
      zombiesKilled: 221,
      syncStatus: 'synced',
      syncVersion: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      lastSyncedAt: null,
      traits: [
        getCharacterTrait('corajosa'),
        getCharacterTrait('visao-de-aguia'),
        getCharacterTrait('fumante'),
      ].filter((trait): trait is LocalTrait => Boolean(trait)),
      skills: [
        makeLocalSkill('aiming', 6),
        makeLocalSkill('reloading', 5),
        makeLocalSkill('sneaking', 4),
        makeLocalSkill('lightfooted', 4),
        makeLocalSkill('tailoring', 3),
        makeLocalSkill('hunting', 2),
      ],
    },
  ];
}

function toRowParams(character: LocalCharacter) {
  return [
    character.id,
    character.remoteId ?? null,
    character.ownerId,
    character.name,
    character.profession,
    character.runMode,
    character.gender,
    character.status,
    character.avatarId ?? null,
    character.initialCity,
    character.spawnCity,
    character.currentCity,
    character.daysAlive,
    character.zombiesKilled,
    JSON.stringify(character.traits),
    JSON.stringify(character.skills),
    character.syncStatus,
    character.syncVersion,
    character.createdAt,
    character.updatedAt,
    character.deletedAt ?? null,
    character.lastSyncedAt ?? null,
  ];
}

function toCharacter(row: LocalCharacterRow): LocalCharacter {
  return {
    id: row.id,
    remoteId: row.remote_id,
    ownerId: row.owner_id,
    name: row.name,
    profession: row.profession,
    runMode: row.run_mode ?? 'Apocalipse',
    gender: row.gender ?? 'Não informado',
    status: row.status,
    avatarId: row.avatar_id,
    initialCity: row.initial_city ?? row.spawn_city,
    spawnCity: row.spawn_city,
    currentCity: row.current_city,
    daysAlive: row.days_alive,
    zombiesKilled: row.zombies_killed,
    traits: normalizeCharacterTraits(parseJson(row.traits_json)),
    skills: JSON.parse(row.skills_json) as LocalSkill[],
    syncStatus: row.sync_status,
    syncVersion: row.sync_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    lastSyncedAt: row.last_synced_at,
  };
}

async function runUpsertCharacter(database: LocalDatabase, character: LocalCharacter) {
  await database.runAsync(
    `
      INSERT INTO local_characters (
        id, remote_id, owner_id, name, profession, run_mode, gender, status, avatar_id, initial_city, spawn_city,
        current_city, days_alive, zombies_killed, traits_json, skills_json,
        sync_status, sync_version, created_at, updated_at, deleted_at, last_synced_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        remote_id = excluded.remote_id,
        owner_id = excluded.owner_id,
        name = excluded.name,
        profession = excluded.profession,
        run_mode = excluded.run_mode,
        gender = excluded.gender,
        status = excluded.status,
        avatar_id = excluded.avatar_id,
        initial_city = excluded.initial_city,
        spawn_city = excluded.spawn_city,
        current_city = excluded.current_city,
        days_alive = excluded.days_alive,
        zombies_killed = excluded.zombies_killed,
        traits_json = excluded.traits_json,
        skills_json = excluded.skills_json,
        sync_status = excluded.sync_status,
        sync_version = excluded.sync_version,
        updated_at = excluded.updated_at,
        deleted_at = excluded.deleted_at,
        last_synced_at = excluded.last_synced_at
    `,
    toRowParams(character),
  );
}

async function upsertCharacter(character: LocalCharacter) {
  const database = await getLocalDatabase();
  await runUpsertCharacter(database, character);
}

async function seedOwnerIfNeeded(ownerId: string) {
  const database = await getLocalDatabase();
  const row = await database.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) as total FROM local_characters WHERE owner_id = ?',
    ownerId,
  );

  if ((row?.total ?? 0) > 0) {
    return;
  }

  const now = new Date().toISOString();
  await database.withTransactionAsync(async () => {
    for (const character of makeSeedCharacters(ownerId, now)) {
      await runUpsertCharacter(database, character);
    }
  });
}

export const localCharacterRepository = {
  async listByOwner(ownerId: string) {
    await seedOwnerIfNeeded(ownerId);

    const database = await getLocalDatabase();
    const rows = await database.getAllAsync<LocalCharacterRow>(
      `
        SELECT * FROM local_characters
        WHERE owner_id = ? AND deleted_at IS NULL
        ORDER BY updated_at DESC
      `,
      ownerId,
    );

    return rows.map(toCharacter);
  },

  async getById(ownerId: string, characterId: string) {
    await seedOwnerIfNeeded(ownerId);

    const database = await getLocalDatabase();
    const row = await database.getFirstAsync<LocalCharacterRow>(
      `
        SELECT * FROM local_characters
        WHERE owner_id = ? AND id = ? AND deleted_at IS NULL
      `,
      ownerId,
      characterId,
    );

    return row ? toCharacter(row) : null;
  },

  async create(input: CreateLocalCharacterInput) {
    const now = new Date().toISOString();
    const character: LocalCharacter = {
      ...input,
      id: `${input.ownerId}.${slugify(input.name)}.${Date.now()}`,
      remoteId: null,
      status: 'alive',
      syncStatus: 'created',
      syncVersion: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      lastSyncedAt: null,
    };

    await upsertCharacter(character);

    return character;
  },

  async update(ownerId: string, characterId: string, input: UpdateLocalCharacterInput) {
    const currentCharacter = await this.getById(ownerId, characterId);

    if (!currentCharacter) {
      return null;
    }

    const now = new Date().toISOString();
    const character: LocalCharacter = {
      ...currentCharacter,
      ...input,
      syncStatus: currentCharacter.syncStatus === 'created' ? 'created' : 'updated',
      syncVersion: currentCharacter.syncVersion + 1,
      updatedAt: now,
    };

    await upsertCharacter(character);

    return character;
  },

  async markDeleted(characterId: string) {
    const database = await getLocalDatabase();
    const now = new Date().toISOString();

    await database.runAsync(
      `
        UPDATE local_characters
        SET deleted_at = ?,
            updated_at = ?,
            sync_status = CASE WHEN sync_status = 'created' THEN 'deleted' ELSE 'deleted' END,
            sync_version = sync_version + 1
        WHERE id = ?
      `,
      now,
      now,
      characterId,
    );
  },
};

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'survivor';
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function makeLocalSkill(skillId: string, level: number): LocalSkill {
  const skill = getCharacterSkill(skillId);

  return {
    id: skill?.id ?? skillId,
    name: skill?.name ?? skillId,
    category: skill?.category ?? 'Habilidades',
    level,
    maxLevel: skill?.maxLevel ?? 10,
  };
}
