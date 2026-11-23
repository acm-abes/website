import { NextRequest, NextResponse } from "next/server";
import { CreatePaperSchema } from "@/schemas/CreatePaperSchema";
import { createPapers, fetchPapers } from "@/actions/papers";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to create research papers." },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = CreatePaperSchema.parse(body);

    // Validate that authenticated user is included as an author in all papers
    for (const paper of validatedData) {
      if (!paper.authorIds.includes(session.user.id)) {
        return NextResponse.json(
          { 
            error: "Forbidden. You must include yourself as an author.",
            providedAuthorIds: paper.authorIds,
            authenticatedUserId: session.user.id
          },
          { status: 403 },
        );
      }
    }

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
