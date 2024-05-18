import { databaseClient } from "@/appwrite/client";
import { ID, Models } from "appwrite";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;

type DocumentList<T> = Models.DocumentList<T & Models.Document>;
type Document<T> = T & Models.Document;

type CollectionNames = "events";

type CollectionConfig = {
  id: string;
};
const collections: Record<CollectionNames, CollectionConfig> = {
  events: { id: process.env.NEXT_PUBLIC_EVENTS_COLLECTION },
};

type asyncFunc = {
  a: () => {};
};

type CollectionFunctions = {
  list: <T>() => Promise<DocumentList<T>>;
  search: <T>(id: string) => Promise<Document<T> | null>;
  create: <T>(data: T, id?: string) => Promise<Document<T> | null>;
  update: <T>(id: string, data: Partial<T>) => Promise<Document<T> | null>;
  delete: (id: string) => Promise<boolean>;
};

type DatabaseType = Record<CollectionNames, CollectionFunctions>;

const database: Partial<DatabaseType> = {};

Object.keys(collections).forEach((collectionName) => {
  const collection = collections[collectionName as CollectionNames];
  database[collectionName as CollectionNames] = {
    list: async <T>() => {
      return databaseClient.listDocuments<T & Models.Document>(
        databaseId,
        collection.id,
      );
    },

    search: async <T>(id: string) => {
      try {
        return await databaseClient.getDocument<T & Models.Document>(
          databaseId,
          collection.id,
          id,
        );
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    create: async <T>(data: T, id?: string) => {
      try {
        return await databaseClient.createDocument<T & Models.Document>(
          databaseId,
          collection.id,
          id || ID.unique(),
          data as T & Models.Document,
        );
      } catch (e) {
        console.error(e);
        return null;
      }
    },

    update: async <T>(id: string, data: Partial<T>) => {
      try {
        return await databaseClient.updateDocument<T & Models.Document>(
          databaseId,
          collection.id,
          id,
          data as Partial<T & Models.Document>,
        );
      } catch (e) {
        console.error(e);
        return null;
      }
    },

    delete: async (id: string) => {
      try {
        await databaseClient.deleteDocument(databaseId, collection.id, id);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  };
});

export default database;
