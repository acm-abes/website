import { NextRequest, NextResponse } from "next/server";
import { revalidateEvents } from "@/actions/revalidate";

export async function GET(req: NextRequest, res: NextResponse) {
  await revalidateEvents();

  console.log("Revalidated Events");
  return NextResponse.json({ message: "Revalidated Events" });
}
