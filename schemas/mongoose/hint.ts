import { HydratedDocumentFromSchema, Schema } from "mongoose";
import { ObjectId } from "bson";

export const hintSchema = new Schema({
  roomId: {
    type: ObjectId,
    ref: "GameRoom",
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export type HintDocument = HydratedDocumentFromSchema<typeof hintSchema>;
