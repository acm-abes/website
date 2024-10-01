import { model } from "mongoose";
import { quizSchema } from "@/schemas/mongoose";

export const Quiz = model("Quiz", quizSchema);
