import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "catering-cms-super-secret-key-2026-safe"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login/admin", request.url));
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
