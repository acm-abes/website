import { HydratedDocument, Schema } from "mongoose";
import { Contest } from "@/app/contests/_page";
import { ObjectId } from "bson";

export const gameRoomSchema = new Schema({
  index: Number,
  name: String,
  question: String,
  answer: String,
  points: Number,
  hint: String,
  endTime: Date,
});

export type GameRoomDocument = HydratedDocument<{
  index: number;
  name: string;
  question: { id: string; text: string };
  answer: string;
  points: number;
  hint: string;
  endTime: string;
}>;
