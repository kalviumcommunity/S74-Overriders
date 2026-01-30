import jwt from "jsonwebtoken";

export function signAccessToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
}
