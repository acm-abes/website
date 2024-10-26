import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { database } from "@/mocks/database";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieParser = cookies();

  const attempt = cookieParser.get("attempt");

  console.log(attempt);

  if (!attempt) {
    console.log("ATTEMPT TOKEN NOT FOUND");
    return NextResponse.json({ status: "invalid request" }, { status: 400 });
  }

  const quizId = attempt.value.split(":")[0];

  if (!quizId) {
    console.log("INVALID TOKEN");
    return NextResponse.json({ status: "invalid token" }, { status: 400 });
  }

  const quiz = database.getQuiz(quizId);

  if (!quiz) {
    return NextResponse.json({ status: "quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ quiz }, { status: 200 });
}
