import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Models } from "appwrite";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: { session: Models.User<Models.Preferences> } = await req.json();

  const name = body.session.name;
  const role = body.session.labels[0];
  const session = body.session.$id;

  const cookieCreator = cookies();

  cookieCreator.set("session", session);
  cookieCreator.set("role", role);
  cookieCreator.set("name", name);

  return NextResponse.json({ session, role });
}
