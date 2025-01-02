import { HydratedDocument, Schema } from "mongoose";
import { ObjectId } from "bson";

export const playerSchema = new Schema({
  name: String,
  email: String,
  score: Number,
  gameId: {
    type: ObjectId,
    ref: "GameRoom",
  },
  currentRoom: Number,
  updatedAt: Date,
});

export type PlayerDocument = HydratedDocument<{
  name: string;
  email: string;
  score: number;
  gameId: string;
  currentRoom: number;
  updatedAt: Date;
}>;
