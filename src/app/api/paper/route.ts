import { NextRequest, NextResponse } from "next/server";
import { CreatePaperSchema } from "@/schemas/CreatePaperSchema";
import { createPapers, fetchPapers } from "@/actions/papers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = CreatePaperSchema.parse(body);

    // Create the paper
    const paper = await createPapers(validatedData);

    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const papers = await fetchPapers();
    return NextResponse.json(papers);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 },
    );
  }
}
