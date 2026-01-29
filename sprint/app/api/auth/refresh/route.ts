import { NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const refreshToken = req.headers
    .get("cookie")
    ?.split("refreshToken=")[1];

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as any;
    const newAccessToken = signAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
  }
}
