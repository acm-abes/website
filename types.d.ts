import { Models } from "appwrite";
import { Connection } from "mongoose";

export interface Event {
  id: string;
  name: string;
  banners?: string[];
  logo: string;
  date: string;
  description: string;
  sponsors?: string[];
  prizes: string;
  venue: string;
}

export interface Quiz {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  questions: Question[];
}

export interface Option {
  value: string;
  id: string;
}

export interface Question {
  id: string;
  title: string;
  options: Option[];
}

type EventDocument = Event & Models.Document;

declare global {
  interface MongoClient {
    connection: Connection;
  }
}
