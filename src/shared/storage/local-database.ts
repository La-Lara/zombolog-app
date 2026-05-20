import * as SQLite from 'expo-sqlite';

const databaseName = 'zombolog.db';
const databaseVersion = 2;

type SQLiteDatabase = SQLite.SQLiteDatabase;

let databasePromise: Promise<SQLiteDatabase> | null = null;

async function migrateDatabase(database: SQLiteDatabase) {
  const result = await database.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= databaseVersion) {
    return;
  }

  await database.withTransactionAsync(async () => {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS local_characters (
        id TEXT PRIMARY KEY NOT NULL,
        remote_id TEXT UNIQUE,
        owner_id TEXT NOT NULL,
        name TEXT NOT NULL,
        profession TEXT NOT NULL,
        run_mode TEXT NOT NULL DEFAULT 'Apocalipse',
        status TEXT NOT NULL,
        avatar_id TEXT,
        spawn_city TEXT NOT NULL,
        current_city TEXT NOT NULL,
        days_alive INTEGER NOT NULL DEFAULT 0,
        zombies_killed INTEGER NOT NULL DEFAULT 0,
        traits_json TEXT NOT NULL,
        skills_json TEXT NOT NULL,
        sync_status TEXT NOT NULL,
        sync_version INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT,
        last_synced_at TEXT
      );

      CREATE INDEX IF NOT EXISTS local_characters_owner_id_idx
        ON local_characters(owner_id);

      CREATE INDEX IF NOT EXISTS local_characters_sync_status_idx
        ON local_characters(sync_status);
    `);

    const columns = await database.getAllAsync<{ name: string }>('PRAGMA table_info(local_characters)');
    const hasRunMode = columns.some((column) => column.name === 'run_mode');

    if (!hasRunMode) {
      await database.execAsync(
        "ALTER TABLE local_characters ADD COLUMN run_mode TEXT NOT NULL DEFAULT 'Apocalipse'",
      );
    }

    await database.execAsync(`PRAGMA user_version = ${databaseVersion}`);
  });
}

export async function getLocalDatabase() {
  databasePromise ??= SQLite.openDatabaseAsync(databaseName).then(async (database) => {
    await migrateDatabase(database);
    return database;
  });

  return databasePromise;
}

