import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value;

  // If user is logged in and visits login/signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and visits protected pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:path*", "/verifyemail"],
};
