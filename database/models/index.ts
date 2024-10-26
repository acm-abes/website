import mongoose, { model } from "mongoose";
import { contestSchema, quizSchema } from "@/schemas/mongoose";

export const Quiz = mongoose.models.Quiz || model("Quiz", quizSchema);
export const Contest =
  mongoose.models.Contest || model("Contest", contestSchema);
