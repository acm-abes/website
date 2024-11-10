import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Models } from "appwrite";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneMonth = oneDay * 28;

  const body: { session: Models.User<Models.Preferences> } = await req.json();

  const name = body.session.name;
  const role = body.session.labels[0];
  const session = body.session.$id;

  const cookieCreator = cookies();

  const token = jwt.sign({ session, role }, process.env.TOKEN_SECRET);

  cookieCreator.set("session", token, {
    httpOnly: true,
    expires: Date.now() + oneMonth,
    // secure: true,
    sameSite: "lax",
  });

  cookieCreator.set("name", name, {
    httpOnly: true,
    expires: Date.now() + oneMonth,
    // secure: true,
    sameSite: "lax",
  });

  return NextResponse.json(
    { message: "Verified successfully" },
    { status: 200 },
  );
}
