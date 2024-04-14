import { client } from "@/appwrite/client";
import { Databases, Query } from "appwrite";
import { Event } from "@/types";

export default class Database {
  private static instance: Database | undefined;
  private connection: Databases | undefined;
  private databaseId = "661bb5efad9f866934a4";
  private collections = {
    events: "661bb5f65f15263548f4",
  };
  private buckets = {
    event: "661bc7499c13dd5c7af7",
  };

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = new Databases(client);
    Database.instance = this;
  }

  async getEvents() {
    return this.connection?.listDocuments(
      this.databaseId,
      this.collections.events,
    );
  }

  async getEventById(id: string) {
    try {
      const data = await this.connection?.getDocument(
        this.databaseId,
        this.collections.events,
        id,
      );

      return data as unknown as Event;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createEvent(event: Event) {
    try {
      return await this.connection?.createDocument(
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
