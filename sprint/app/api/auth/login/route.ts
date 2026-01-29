import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ⚠️ Replace with DB lookup
  if (email !== "admin@test.com" || password !== "password") {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const user = { id: "123", role: "admin" };

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  const res = NextResponse.json({ accessToken });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/auth/refresh",
  });

  return res;
}
