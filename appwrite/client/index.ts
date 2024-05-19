import { Client, Account, Databases } from "appwrite";
import "@/schemas/env";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("661aa97555bdeffbb8fb");

export const account = new Account(client);

export const databaseClient = new Databases(client);

export { ID } from "appwrite";
