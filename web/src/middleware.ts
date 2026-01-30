import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/auth/protected"],
};
