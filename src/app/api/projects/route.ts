import { NextRequest, NextResponse } from "next/server";
import { createProjects, getProjects } from "@/actions/projects";
import { CreateProjectsSchema } from "@/schemas/CreateProjectSchema";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = CreateProjectsSchema.parse(body);

    // Create projects
    const projects = await createProjects(validatedData);

    return NextResponse.json(
      { message: "Projects created successfully", projects },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create projects:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create projects" },
      { status: 500 },
    );
  }
}
