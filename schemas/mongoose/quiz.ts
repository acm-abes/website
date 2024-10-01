import { Schema } from "mongoose";

interface Option {
  value: string;
  id: string;
}

interface Question {
  id: string;
  title: string;
  options: Option[];
}

export const quizSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  questions: { type: Array<Question>, required: true },
});
