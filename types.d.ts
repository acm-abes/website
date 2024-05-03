import { Models } from "appwrite";

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

type EventDocument = Event & Models.Document;
