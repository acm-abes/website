import { NextResponse } from "next/server";
import { CreateBlogSchema } from "@/schemas/CreateBlogSchema";
import { createBlogs, getBlogs } from "@/actions/blogs";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to create blogs." },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = CreateBlogSchema.parse(body);

    // Validate that all blogs have the authenticated user as author
    for (const blog of validatedData) {
      if (blog.authorId !== session.user.id) {
        return NextResponse.json(
          { 
            error: "Forbidden. You can only create blogs as yourself.",
            providedAuthorId: blog.authorId,
            authenticatedUserId: session.user.id
          },
          { status: 403 },
        );
      }
    }

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
