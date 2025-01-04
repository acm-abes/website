import { HydratedDocument, Schema } from "mongoose";
import { ObjectId } from "bson";

export const playerSchema = new Schema({
  name: String,
  email: String,
  hintsUsed: Array<String>,
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
  hintsUsed: string[];
  gameId: string;
  currentRoom: number;
  updatedAt: Date;
}>;
