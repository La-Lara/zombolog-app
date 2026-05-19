import { getLocalDatabase } from './local-database';

type LocalDatabase = Awaited<ReturnType<typeof getLocalDatabase>>;

export type LocalCharacterStatus = 'alive' | 'dead' | 'missing';

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
  status: LocalCharacterStatus;
  avatarId?: string | null;
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
  'ownerId' | 'name' | 'profession' | 'avatarId' | 'spawnCity' | 'currentCity' | 'traits' | 'skills'
>;

type LocalCharacterRow = {
  id: string;
  remote_id: string | null;
  owner_id: string;
  name: string;
  profession: string;
  status: LocalCharacterStatus;
  avatar_id: string | null;
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
      status: 'alive',
      avatarId: null,
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
        {
          id: 'fast-reader',
          name: 'Leitura Rapida',
          type: 'positive',
          description: 'Aprende com livros em menos tempo, ideal para bases longas.',
          effects: ['Velocidade de leitura aumentada'],
          points: -2,
        },
        {
          id: 'organized',
          name: 'Organizada',
          type: 'positive',
          description: 'Carrega suprimentos com melhor aproveitamento de inventario.',
          effects: ['Capacidade de recipientes aumentada'],
          points: -6,
        },
        {
          id: 'high-thirst',
          name: 'Muita Sede',
          type: 'negative',
          description: 'Precisa beber agua com mais frequencia durante exploracoes.',
          effects: ['Consumo de agua aumentado'],
          points: 6,
        },
      ],
      skills: [
        { id: 'carpentry', name: 'Carpintaria', category: 'Construcao', level: 6, maxLevel: 10 },
        { id: 'cooking', name: 'Culinaria', category: 'Sobrevivencia', level: 3, maxLevel: 10 },
        { id: 'foraging', name: 'Coleta', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'sprinting', name: 'Corrida', category: 'Fisico', level: 2, maxLevel: 10 },
        { id: 'nimble', name: 'Agilidade', category: 'Combate', level: 2, maxLevel: 10 },
        { id: 'long-blunt', name: 'Contundente Longo', category: 'Combate', level: 5, maxLevel: 10 },
        { id: 'maintenance', name: 'Manutencao', category: 'Tecnica', level: 4, maxLevel: 10 },
      ],
    },
    {
      id: `${ownerId}.eduardo-riverside`,
      remoteId: null,
      ownerId,
      name: 'Eduardo Miller',
      profession: 'Bombeiro',
      status: 'alive',
      avatarId: null,
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
        {
          id: 'fit',
          name: 'Em Forma',
          type: 'positive',
          description: 'Mantem melhor folego em fugas, buscas e combate corpo a corpo.',
          effects: ['Condicionamento inicial aumentado'],
          points: -6,
        },
        {
          id: 'lucky',
          name: 'Sortudo',
          type: 'positive',
          description: 'Encontra itens uteis com um pouco mais de frequencia.',
          effects: ['Chance de loot rara aumentada'],
          points: -4,
        },
        {
          id: 'slow-reader',
          name: 'Leitor Lento',
          type: 'negative',
          description: 'Demora mais para concluir livros tecnicos.',
          effects: ['Velocidade de leitura reduzida'],
          points: 2,
        },
      ],
      skills: [
        { id: 'fitness', name: 'Condicionamento', category: 'Fisico', level: 7, maxLevel: 10 },
        { id: 'strength', name: 'Forca', category: 'Fisico', level: 6, maxLevel: 10 },
        { id: 'axe', name: 'Machado', category: 'Combate', level: 4, maxLevel: 10 },
        { id: 'sprinting', name: 'Corrida', category: 'Fisico', level: 5, maxLevel: 10 },
        { id: 'first-aid', name: 'Primeiros Socorros', category: 'Sobrevivencia', level: 2, maxLevel: 10 },
        { id: 'mechanics', name: 'Mecanica', category: 'Tecnica', level: 1, maxLevel: 10 },
      ],
    },
    {
      id: `${ownerId}.ana-westpoint`,
      remoteId: null,
      ownerId,
      name: 'Ana Brooks',
      profession: 'Veterana',
      status: 'missing',
      avatarId: null,
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
        {
          id: 'brave',
          name: 'Corajosa',
          type: 'positive',
          description: 'Controla melhor o panico em confrontos perigosos.',
          effects: ['Panico reduzido'],
          points: -4,
        },
        {
          id: 'eagle-eyed',
          name: 'Olhos de Aguia',
          type: 'positive',
          description: 'Percebe ameacas e oportunidades a uma distancia maior.',
          effects: ['Campo de visao aumentado'],
          points: -6,
        },
        {
          id: 'smoker',
          name: 'Fumante',
          type: 'negative',
          description: 'Precisa de cigarros para controlar ansiedade.',
          effects: ['Estresse aumenta sem fumar'],
          points: 4,
        },
      ],
      skills: [
        { id: 'aiming', name: 'Mira', category: 'Combate', level: 6, maxLevel: 10 },
        { id: 'reloading', name: 'Recarga', category: 'Combate', level: 5, maxLevel: 10 },
        { id: 'sneaking', name: 'Furtividade', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'lightfooted', name: 'Passos Leves', category: 'Sobrevivencia', level: 4, maxLevel: 10 },
        { id: 'tailoring', name: 'Costura', category: 'Tecnica', level: 3, maxLevel: 10 },
        { id: 'trapping', name: 'Armadilhas', category: 'Sobrevivencia', level: 2, maxLevel: 10 },
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
    character.status,
    character.avatarId ?? null,
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
    status: row.status,
    avatarId: row.avatar_id,
    spawnCity: row.spawn_city,
    currentCity: row.current_city,
    daysAlive: row.days_alive,
    zombiesKilled: row.zombies_killed,
    traits: JSON.parse(row.traits_json) as LocalTrait[],
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
        id, remote_id, owner_id, name, profession, status, avatar_id, spawn_city,
        current_city, days_alive, zombies_killed, traits_json, skills_json,
        sync_status, sync_version, created_at, updated_at, deleted_at, last_synced_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        remote_id = excluded.remote_id,
        owner_id = excluded.owner_id,
        name = excluded.name,
        profession = excluded.profession,
        status = excluded.status,
        avatar_id = excluded.avatar_id,
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
      daysAlive: 0,
      zombiesKilled: 0,
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
