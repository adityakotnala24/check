import * as SQLite from 'expo-sqlite';

const useDatabase = async () => {
  return await SQLite.openDatabaseAsync('forms.db');
};

export const initDB = async () => {
  const db = await useDatabase();

  await db.runAsync(
    `CREATE TABLE IF NOT EXISTS forms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formData TEXT NOT NULL
    );`
  );

  await db.closeAsync();
};

export const saveFormOffline = async (formData: any) => {
  const db = await useDatabase();

  await db.runAsync(
    'INSERT INTO forms (formData) VALUES (?);',
    [JSON.stringify(formData)],
  );
};

export const getPendingForms = async (): Promise<any[]> => {
  const db = await useDatabase();
  const result = await db.getAllAsync('SELECT * FROM forms;');
  await db.closeAsync();

  return result;
};

export const deleteForm = async (id: number) => {
  try {
    const db = await useDatabase();

    await db.runAsync('DELETE FROM forms WHERE id = ?;', [id]);
    await db.closeAsync();

    return true;;

  } catch (error) {
    console.log(error);
    return false;
  }
};