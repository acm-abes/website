import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieParse = cookies();

  const attemptId = cookieParse.get("attempt");

  if (attemptId) {
    return NextResponse.json(
      { status: true, message: "You have already entered!" },
      { status: 200 },
    );
  }

  return NextResponse.json({ status: false });
}
