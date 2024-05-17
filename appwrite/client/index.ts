import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID);

export const account = new Account(client);

export const databaseClient = new Databases(client);

export { ID } from "appwrite";
