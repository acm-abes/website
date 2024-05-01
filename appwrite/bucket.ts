import { ID, Storage } from "appwrite";
import { client } from "@/appwrite/client";

export class Bucket {
  private buckets = {
    event: "661bc7499c13dd5c7af7",
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
    const output = await this.connection.createFile(
      this.buckets.event,
      id || ID.unique(),
      file,
    );

    console.log(output);

    return output;
  }
}
