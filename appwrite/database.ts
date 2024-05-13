import { client } from "@/appwrite/client";
import { Databases, ID } from "appwrite";
import { Event, EventDocument } from "@/types";

export default class Database {
  private databaseId = process.env.DATABASE_ID;
  private collections = {
    events: process.env.EVENTS_COLLECTION,
  };

  private static instance: Database;
  private connection: Databases;
  constructor() {
    this.connection = new Databases(client);
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }

  async getEvents() {
    return this.connection.listDocuments<EventDocument>(
      this.databaseId,
      this.collections.events,
    );
  }

  async getEventById(id: string) {
    try {
      return await this.connection.getDocument<EventDocument>(
        this.databaseId,
        this.collections.events,
        id,
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async createEvent(event: Event) {
    try {
      return await this.connection.createDocument<EventDocument>(
        this.databaseId,
        this.collections.events,
        event.id || ID.unique(),
        event,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
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
}
