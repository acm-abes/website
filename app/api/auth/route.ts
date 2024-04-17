import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: { session: string; role: string; name: string } =
    await req.json();

  const { session, role, name } = body;

  const cookieCreator = cookies();

  cookieCreator.set("session", session);
  cookieCreator.set("role", role);
  cookieCreator.set("name", name);

  return NextResponse.json({ session, role });
}
