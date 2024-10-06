import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieParser = cookies();

  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return redirect("/");
  }

  const session = cookieParser.get("session");

  if (!session) {
    return redirect(`/auth/register?callback=${id}`);
  }

  if (cookieParser.get("attempt")) {
    return NextResponse.json({}, { status: 302 });
  }

  const attemptId = id + ":" + session.value.slice(0, session.value.length / 2);

  const end = Date.now() + 60 * 60 * 1000;

  cookieParser.set("attempt", attemptId, {
    expires: end,
  });

  return NextResponse.json({ id: attemptId, end: end }, { status: 302 });
}
