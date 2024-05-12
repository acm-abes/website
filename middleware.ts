import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const pathname = request.nextUrl.pathname;

  const adminPage = "/admin";

  const session = cookies().get("session");
  const role = cookies().get("role");

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";
  const isAdmin = role && role.value === "admin";

  if (adminPage === pathname)
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));

  if (session && isAuthPage) {
    const callbackURL = new URLSearchParams(request.nextUrl.search).get(
      "callback",
    );

    console.log("Callback : ", callbackURL);
    return NextResponse.redirect(new URL(callbackURL || "/", request.url));
  }

  if (pathname.includes(adminPage) && (!session || !isAdmin))
    return NextResponse.redirect(
      new URL(`/auth/login?callback=${pathname}`, request.url),
    );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/register",
    "/admin/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
