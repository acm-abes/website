import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Models } from "appwrite";

export async function POST(req: NextRequest, res: NextResponse) {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneMonth = oneDay * 28;

  const body: { session: Models.User<Models.Preferences> } = await req.json();

  const name = body.session.name;
  const role = body.session.labels[0];
  const session = body.session.$id;

  const cookieCreator = cookies();

  cookieCreator.set("session", session, { expires: Date.now() + oneMonth });
  cookieCreator.set("role", role, { expires: Date.now() + oneMonth });
  cookieCreator.set("name", name, { expires: Date.now() + oneMonth });

  return NextResponse.json({ session, role }, { status: 200 });
}
