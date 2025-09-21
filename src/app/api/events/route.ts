import { addBulkEvents } from "@/actions/events";
import { CreateEventSchema } from "@/schemas/CreateEventSchema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  try {
    const parsedData = CreateEventSchema.parse(data);
    const res = await addBulkEvents(parsedData);

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error },
        { status: 400 },
      );
    }
  }
};
