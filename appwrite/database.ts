import { client } from "@/appwrite/client";
import { Databases, Models, Query } from "appwrite";
import { Event } from "@/types";

export default class Database {
  databaseId = "661bb5efad9f866934a4";
  collections = {
    events: "661bb5f65f15263548f4",
  };
  buckets = {
    event: "661bc7499c13dd5c7af7",
  };
  private static instance: Database;
  private connection: Databases | undefined;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = new Databases(client);
    Database.instance = this;
  }

  async getEvents() {
    return this.connection!.listDocuments(
      this.databaseId,
      this.collections.events,
    );
  }

  async getEventById(id: string) {
    try {
      return this.connection!.getDocument(
        this.databaseId,
        this.collections.events,
        id,
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createEvent(event: Event) {
    try {
      return await this.connection!.createDocument(
        this.databaseId,
        this.collections.events,
        event.id,
        event,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async updateEvent(id: string, event: Event) {
    try {
      return await this.connection!.updateDocument(
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
}
