import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("661aa97555bdeffbb8fb");

export const account = new Account(client);

export { ID } from "appwrite";
