import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieCreator = cookies();

  cookieCreator.delete("session");
  cookieCreator.delete("role");
  cookieCreator.delete("name");

  return NextResponse.json({ message: "logged out" });
}
