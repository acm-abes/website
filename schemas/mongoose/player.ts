import { HydratedDocument, Schema } from "mongoose";
import { Contest } from "@/app/contests/_page";
import { ObjectId } from "bson";

export const playerSchema = new Schema({
  name: String,
  email: String,
  score: Number,
  currentRoom: String,
  updatedAt: Date,
});

export type Player = HydratedDocument<{
  name: string;
  email: string;
  score: number;
  currentRoom: string;
  updatedAt: Date;
}>;
