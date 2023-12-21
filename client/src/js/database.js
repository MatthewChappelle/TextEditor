import { openDB } from "idb";

// create a new database
const initdb = async () => {
  try {
    const db = await openDB("jate", 1, {
      upgrade(db) {
        db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      },
    });
    return db;
  } catch (error) {
    throw error;
  }
};

// put data into the database from page body, to local storage, to indexeddb
export const putDb = async (content) => {
  try {
    const db = await initdb();
    await db.transaction("jate", "readwrite").objectStore("jate").put({ id: 1, value: content });
  } catch (error) {
    console.error("Error putting data into the database:", error);
  }
};

// get data from the database, or local storage, or header, and display on page
export const getDb = async () => {
  try {
    const db = await initdb();
    const result = await db.transaction("jate", "readonly").objectStore("jate").get(1);
    console.log("result.value", result);
    return result?.value;
  } catch (error) {
    console.error("Error getting data from the database:", error);
    throw error;
  }
};

// Initialize the database when this module is loaded
initdb();
