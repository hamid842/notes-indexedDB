import { INote } from "@/types/note";

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = window.indexedDB.open("notesDB", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("notes")) {
        const store = db.createObjectStore("notes", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("title", "title", { unique: false });
      }
    };

    request.onsuccess = (event: Event) =>
      resolve((event.target as IDBOpenDBRequest).result);
    request.onerror = (event: Event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
}

export async function addNote(note: INote): Promise<number> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.add(note);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
}

export async function getNotes(searchQuery: string = ""): Promise<INote[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("notes", "readonly");
    const store = transaction.objectStore("notes");
    const results: INote[] = [];

    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const note = cursor.value;
        const title = note.title?.toString() || "";
        const description = note.description?.toString() || "";
        const search = searchQuery.toLowerCase();

        const matches = searchQuery
          ? title.toLowerCase().includes(search) ||
            description.toLowerCase().includes(search)
          : true;

        if (matches) results.push(note);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => reject(request.error);
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function deleteNote(id: number): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function updateNote(updatedNote: INote): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("notes", "readwrite");
    const store = transaction.objectStore("notes");

    const request = store.put(updatedNote);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
