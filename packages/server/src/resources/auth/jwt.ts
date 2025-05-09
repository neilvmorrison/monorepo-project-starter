import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
}

export function issueAccessToken(payload: TokenPayload): string {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

export function issueRefreshToken(payload: TokenPayload): string {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export function swapRefreshToken(refreshToken: string): {
  accessToken: string;
  refreshToken: string;
} {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  try {
    const payload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as TokenPayload;

    const newAccessToken = issueAccessToken(payload);
    const newRefreshToken = issueRefreshToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export function verifyToken(
  token: string,
  type: "access" | "refresh"
): boolean {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  try {
    const secret =
      type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenExpiry(token: string): Date | null {
  try {
    const decoded = jwt.decode(token) as { exp: number };
    if (decoded && decoded.exp) {
      // exp is in seconds, convert to milliseconds for Date
      return new Date(decoded.exp * 1000);
    }
    return null;
  } catch (error) {
    return null;
  }
}
