import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const basePath = request.url;
  const session = await auth();

  const loginPage = "/api/auth/signin";

  if (pathname.startsWith(loginPage) && session) {
    return NextResponse.redirect(new URL("/", basePath));
  }

  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-url", basePath);

  return NextResponse.next({
    // request: {
    //   headers: requestHeaders,
    // },
  });
}

export const config = {
  matcher: [
    "/",
    "/api/auth/signin",
    "/auth/login",
    "/auth/register",
    "/admin/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
