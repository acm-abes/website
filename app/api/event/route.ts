import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Event } from "@/database/models/event";
import { type EventType } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await connectToDB(); // Ensure connection
    const params = req.nextUrl.searchParams;
    const id = params.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id, name, banners, logo, date, description, sponsors, prizes, venue } = body;

    if (!id || !name || !date || !description || !venue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const eventData: EventType = { id, name, banners, logo, date, description, sponsors, prizes, venue };

    const newEvent = await Event.create(eventData);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

