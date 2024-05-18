import { databaseClient } from "@/appwrite/client";
import { ID, Models } from "appwrite";

const databaseId = process.env.DATABASE_ID;

const collections = [
  {
    id: process.env.EVENTS_COLLECTION,
    name: "events",
  },
] as const;

type CollectionFunctions = {
  list: <T>() => Promise<Models.DocumentList<T & Models.Document>>;
  search: <T>(id: string) => Promise<(T & Models.Document) | null>;
  create: <T>(data: T, id?: string) => Promise<(T & Models.Document) | null>;
  delete?: <T>(id: string) => Promise<(T & Models.Document) | null>;
  update?: <T>(id: string, data: T) => Promise<(T & Models.Document) | null>;
};

const cols = collections.map((c) => c.name);

type CollectionNames = (typeof cols)[number];

export const database: Record<CollectionNames, CollectionFunctions> = {};

collections.forEach((collection) => {
  database[collection.name as CollectionNames] = {
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
  };
});

/*
collections.forEach((collection) => {
  database[collection.name] = {
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
  };
});

 */

/*

  async getEventById(id: string) {

  }

  async createEvent(event: Event) {

  }

  async updateEvent(id: string, event: Event) {
    try {
      return await this.connection.updateDocument<EventDocument>(
        this.databaseId,
        this.collections.events,
        id,
        event,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async deleteEvent(id: string) {
    try {
      return await this.connection.deleteDocument(
        this.databaseId,
        this.collections.events,
        id,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

*/
