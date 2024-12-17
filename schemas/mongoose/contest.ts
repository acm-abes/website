import { Schema } from "mongoose";
import { Contest } from "@/app/contests/_page";

export const contestSchema: Schema<Contest> = new Schema({
  name: String,
  date: {
    type: {
      start: String,
      end: String,
    },
  },
  tags: { type: Array<String>, required: false },
  url: String,
});
