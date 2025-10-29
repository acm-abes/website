import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const basePath = request.url;
  const session = await auth();

  // Redirect authenticated users away from auth pages
  const authPages = ["/auth", "/api/auth/signin"];
  if (authPages.some((page) => pathname.startsWith(page)) && session) {
    return NextResponse.redirect(new URL("/", basePath));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/api/auth/signin",
    "/admin/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
