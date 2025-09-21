import { NextResponse } from "next/server";
import { CreateBlogSchema } from "@/schemas/CreateBlogSchema";
import { createBlogs, getBlogs } from "@/actions/blogs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = CreateBlogSchema.parse(body);

    // Create the blogs
    const blogs = await createBlogs(validatedData);

    return NextResponse.json(blogs, { status: 201 });
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
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
