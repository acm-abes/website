import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        json: { message: "Unauthorized" },
      },
      {
        status: 401,
      },
    );
  }

  const { user } = session;

  const gameToken = cookies().get("game_token")?.value;

  if (!gameToken) {
    return NextResponse.json(
      {
        json: { message: "Unauthorized" },
      },
      {
        status: 401,
      },
    );
  }

  const payload = jwt.verify(gameToken, process.env.TOKEN_SECRET) as {
    email: string;
  };

  const isPlaying = payload.email === user?.email;

  return NextResponse.json({
    isPlaying,
    data: payload,
  });
}
