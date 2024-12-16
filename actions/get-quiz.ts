"use server";
import { Quiz } from "@/database/models";
import { QuizDocument } from "@/schemas/mongoose";
import { HydratedDocument } from "mongoose";
import { redirect } from "next/navigation";

export async function getQuiz() {
  // const quiz = await Quiz.findOne<HydratedDocument<QuizDocument>>({
  //   uid: data.get("code"),
  // });
  //
  // if (!quiz) {
  //   return;
  // }
  //
  // redirect(`/quiz/${quiz.uid}`);

  console.log("data");
}
