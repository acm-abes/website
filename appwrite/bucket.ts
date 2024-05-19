import { ID, Storage } from "appwrite";
import { client } from "@/appwrite/client";

export class Bucket {
  private buckets = {
    event: process.env.NEXT_PUBLIC_BUCKET_ID,
  };
  private static instance: Bucket;
  private connection: Storage;

  constructor() {
    this.connection = new Storage(client);
    if (Bucket.instance) {
      return Bucket.instance;
    }
    Bucket.instance = this;
  }

  getItem(id: string) {
    return this.connection.getFileView(this.buckets.event, id);
  }

  async createItem(file: File, id?: string) {
    return await this.connection.createFile(
      this.buckets.event,
      id || ID.unique(),
      file,
    );
  }
}
