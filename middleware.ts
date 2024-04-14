import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
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
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.includes(adminPage) && (!session || !isAdmin))
    return NextResponse.redirect(new URL("/auth/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/login", "/auth/register", "/admin/:path*"],
};
