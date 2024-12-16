import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { format, formatDistance } from "date-fns";
import { Quiz, QuizSubmission } from "@/database/models";
import { HydratedDocument } from "mongoose";
import { QuizDocument } from "@/schemas/mongoose";
import { connect } from "@/database";

/////// All possible cases ///////
// Early
// On Time
// Late
//////////////////////////////////

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieParser = cookies();
  await connect();

  const id = req.nextUrl.searchParams.get("id");
  const user_id = req.nextUrl.searchParams.get("user_id");

  if (!user_id) {
    return redirect("/auth/login");
  }

  if (!id) {
    return redirect("/");
  }

  const session = cookieParser.get("session");

  // Isn't logged in
  if (!session) {
    return redirect(`/auth/login?callback=${id}`);
  }

  console.log(`${user_id} is attempting quiz ${id} with session ${session}`);

  // Already attempting a quiz
  if (cookieParser.get("attempt")) {
    return NextResponse.json({}, { status: 302 });
  }

  ////////////////////////////////////////
  // If this executes
  // user is authenticated,
  // entering for the 1st time
  ////////////////////////////////////////

  //////////////////////////////////////// Steps to take
  // fetch quiz from database

  const quiz = (await Quiz.findOne({
    _id: id,
  })) as HydratedDocument<QuizDocument>;

  console.log("Fetched quiz", quiz._id);

  if (!quiz) {
    return NextResponse.json({ error: "invalid id" }, { status: 404 });
  }

  const existingSubmission = await QuizSubmission.findOne({
    quiz_id: quiz.id,
    attempter_email: user_id,
  });

  if (existingSubmission) {
    return NextResponse.json(
      {
        error: "You have already submitted",
        message: `You can't participate now`,
      },
      { status: 403 },
    );
  }

  const quizStart = quiz.start;
  const quizEnd = quiz.end;

  const startTime = new Date(quizStart).getTime();
  const endTime = new Date(quizEnd).getTime();

  // Trying to enter quiz EARLY
  if (Date.now() < startTime) {
    return NextResponse.json(
      {
        error: "Quiz hasn't started yet",
        message: `Quiz will start at ${format(startTime, "dd MMM hh:mm aaa")}, in ${formatDistance(new Date(), startTime)}`,
      },
      { status: 403 },
    );
  }

  if (Date.now() > endTime) {
    return NextResponse.json(
      {
        error: "Quiz has already ended",
        message: `You can't participate now`,
      },
      { status: 403 },
    );
  }

  // generate an attempt token to prevent multiple attempts
  // pass attemptId in cookie and end time, to be stored on the client
  const attemptId = id + ":" + session.value.slice(0, session.value.length / 2);

  const end = Date.now() + 60 * 60 * 1000;

  cookieParser.set("attempt", attemptId, {
    expires: new Date(endTime),
    httpOnly: true,
  });

  return NextResponse.json({ id: attemptId, end: end }, { status: 302 });
}
