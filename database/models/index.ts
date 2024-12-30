import mongoose, { model } from "mongoose";
import { contestSchema, quizSchema } from "@/schemas/mongoose";
import { quizSubmissionSchema } from "@/schemas/mongoose/quiz-submissions";
import { playerSchema } from "@/schemas/mongoose/player";

export const Quiz = mongoose.models.Quiz || model("Quiz", quizSchema);
export const Contest =
  mongoose.models.Contest || model("Contest", contestSchema);
export const QuizSubmission =
  mongoose.models.QuizSubmission ||
  model("QuizSubmission", quizSubmissionSchema);
export const Player = mongoose.models.Player || model("Player", playerSchema);
