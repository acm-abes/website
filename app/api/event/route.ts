import { NextRequest, NextResponse } from "next/server";
import database from "@/appwrite/database";
import { type Event, EventDocument } from "@/types";
import { Models } from "appwrite";
import { events } from "@/public/data/events";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  if (!id) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  let event: (Event & Models.Document) | null | undefined;

  event = events.find((e) => e.id === id)! as EventDocument;

  if (!event) event = await database.events?.search<EventDocument>(id);

  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  return NextResponse.json(event);
}
