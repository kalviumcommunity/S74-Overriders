import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/admin") || pathname.startsWith("/api/users")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const { payload } = await jwtVerify(token, secret);

      // Admin-only protection
      if (pathname.startsWith("/api/admin") && payload.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "Access denied: Admins only" },
          { status: 403 }
        );
      }

      // Forward user info
      const headers = new Headers(req.headers);
      headers.set("x-user-email", String(payload.email));
      headers.set("x-user-role", String(payload.role));

      return NextResponse.next({
        request: { headers },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/api/users/:path*"],
};