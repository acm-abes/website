import mongoose, { HydratedDocument, Schema } from "mongoose";
import { Question } from "@/types";

export const quizSchema = new Schema({
  uid: String,
  name: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  questions: { type: Array<Question>, required: true },
});

export type QuizDocument = HydratedDocument<{
  uid: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  questions: Question[];
}>;
