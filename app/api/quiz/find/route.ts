import { NextRequest, NextResponse } from "next/server";
import { Quiz } from "@/database/models";
import { connect } from "@/database";

export async function GET(req: NextRequest) {
  await connect();

  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const quiz = await Quiz.findOne({ uid: code });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ quiz }, { status: 200 });
}
