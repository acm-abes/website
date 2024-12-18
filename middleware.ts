import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const basePath = request.url;
  const session = await auth();

  const adminPage = "/admin";
  const quizPage = "/quiz";
  const loginPage = "/api/auth/signin";

  if (pathname.startsWith(adminPage) || pathname.includes(quizPage)) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${pathname}`, basePath),
      );
    }
  }

  if (pathname.startsWith(loginPage) && session) {
    return NextResponse.redirect(new URL("/", basePath));
  }
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
