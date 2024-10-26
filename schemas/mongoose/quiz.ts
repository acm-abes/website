import { Schema } from "mongoose";
import { Question } from "@/types";

export const quizSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  questions: { type: Array<Question>, required: true },
});
