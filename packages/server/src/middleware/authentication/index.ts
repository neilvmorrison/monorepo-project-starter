import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import {
  getTokenExpiry,
  issueAccessToken,
  issueRefreshToken,
  TokenPayload,
} from "../../resources/auth/jwt";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { tryCatchSync } from "shared/utils";
import { SessionsService } from "../../resources/auth/sessions.service";
import db from "../../db/client";
import { create_hash } from "../../resources/auth/hash";

const sessionsService = new SessionsService(db);

export default async function authenticationMiddleware(
  ctx: Context,
  next: Next
) {
  const cookies = ctx.cookies;
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  if (ctx.path === "/api/auth/login" || ctx.path === "/api/auth/register") {
    return await next();
  }

  if (!accessToken || !refreshToken) {
    throw new UnauthorizedError();
  }

  const { data: accessData, error: accessError } = tryCatchSync<TokenPayload>(
    () =>
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as TokenPayload
  );

  const { data: refreshData, error: refreshError } = tryCatchSync<TokenPayload>(
    () =>
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as TokenPayload
  );

  if (refreshError) throw new UnauthorizedError();

  const setTokensAndUser = (
    ctx: Context,
    tokens: { access_token: string; refresh_token: string }
  ) => {
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict" as const,
      secure: process.env.NODE_ENV === "production",
    };

    ctx.cookies.set("access_token", tokens.access_token, cookieOptions);
    ctx.cookies.set("refresh_token", tokens.refresh_token, cookieOptions);

    const payload = jwt.verify(
      tokens.access_token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string; email: string };

    ctx.state.user = payload;
  };

  if (accessData) {
    await next();
    return;
  }

  if (accessError) {
    const is_valid = await sessionsService.currentSessionIsValid(
      refreshData.userId,
      refreshToken
    );

    if (!is_valid) {
      throw new UnauthorizedError();
    }

    const new_access = issueAccessToken(refreshData);
    const new_refresh = issueRefreshToken(refreshData);
    const new_tokens = {
      access_token: new_access,
      refresh_token: new_refresh,
    };
    setTokensAndUser(ctx, new_tokens);
    const token_hash = await create_hash(new_refresh);
    await sessionsService.create({
      auth_user_id: refreshData.userId,
      expires_at:
        getTokenExpiry(new_refresh) ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      token_hash,
      is_revoked: false,
    });
    await next();
  }
}
