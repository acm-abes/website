import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const basePath = request.url;
  const session = await auth();

  const adminPage = "/admin";
  const quizPage = "/quiz";
  const loginPage = "/api/auth/signin";
  // const roomPage = "/room";
  const roomPage = "/quiz";

  if (
    pathname.startsWith(adminPage) ||
    pathname.startsWith(quizPage) ||
    pathname.startsWith(roomPage)
  ) {
    if (!session) {
      console.log("Redirecting to login");
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${pathname}`, basePath),
      );
    }
  }

  if (pathname.startsWith(loginPage) && session) {
    console.log("Hit login page");
    return NextResponse.redirect(new URL("/", basePath));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", basePath);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
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
