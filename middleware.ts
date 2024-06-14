import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const pathname = request.nextUrl.pathname;

  const adminPage = "/admin";

  const session = cookies().get("session")?.value;

  const loggedIn = !!session;

  let tokenPayload;

  if (loggedIn) {
    try {
      const decoded = await jose.jwtVerify<{ session: string; role: string }>(
        session,
        new TextEncoder().encode(process.env.TOKEN_SECRET),
      );

      tokenPayload = decoded.payload;
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  const { session: payloadSession, role } = tokenPayload || {};

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  const isAdmin = role && role === "admin";

  if (adminPage === pathname)
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));

  if (session && isAuthPage) {
    const callbackURL = new URLSearchParams(request.nextUrl.search).get(
      "callback",
    );
    return NextResponse.redirect(new URL(callbackURL || "/", request.url));
  }

  if (pathname.includes(adminPage) && (!session || !isAdmin))
    return NextResponse.redirect(new URL(`/`, request.url));
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/register",
    "/admin/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
