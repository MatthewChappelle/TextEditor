import { openDB } from 'idb';

const initdb = async () => openDB('jate', 1, {
  upgrade(db) {
    db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
  },
});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  async function updateDB(content) {
    const db = await openDB('jate', 1);
    await db.transaction('jate', 'readwrite', tx => {
      const store = tx.objectStore('jate');
      return store.put({ id: 1, value: content });
    });
    console.log('Added:', content);
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const result = await (await openDB('jate', 1))
    .transaction('jate', 'readonly')
    .objectStore('jate')
    .getAll();
  
  console.log(result);
  return result;
};

initdb();
