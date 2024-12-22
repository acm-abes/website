import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Quiz, QuizSubmission } from "@/database/models";

export async function GET() {
  const cookieParser = cookies();

  const attempt = cookieParser.get("attempt");

  if (!attempt) {
    console.log("ATTEMPT TOKEN NOT FOUND");
    return NextResponse.json({ status: "invalid request" }, { status: 400 });
  }

  const quizId = attempt.value.split(":")[0];

  if (!quizId) {
    console.log("INVALID TOKEN");
    return NextResponse.json({ status: "invalid token" }, { status: 400 });
  }

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return NextResponse.json({ status: "quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ quiz }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const cookieParse = cookies();

  // if (!cookieParse.get("attempt")) {
  //   return NextResponse.json(
  //     { status: "Quiz is already over" },
  //     { status: 403 },
  //   );
  // }

  const body = (await req.json()) as {
    attempter_email: string;
    attempter_name: string;
    submittedAt: string;
    quiz_id: string;
    selections: Record<number, string>;
  };

  const quiz = await Quiz.findById(body.quiz_id);

  if (!quiz) {
    return NextResponse.json(
      {
        message: "Invalid quiz",
      },
      {
        status: 400,
      },
    );
  }

  if (new Date(body.submittedAt).getTime() >= new Date(quiz.end).getTime()) {
    return NextResponse.json(
      { status: "Quiz is already over" },
      { status: 403 },
    );
  }

  const submission = await new QuizSubmission(body).save();

  if (!submission) {
    return NextResponse.json(
      { status: "Something went wrong" },
      { status: 500 },
    );
  }

  cookieParse.delete("attempt");

  return NextResponse.json({}, { status: 201 });
}
