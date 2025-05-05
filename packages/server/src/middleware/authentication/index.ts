import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import { swapRefreshToken } from "../../resources/auth/jwt";

export default async function authenticationMiddleware(
  ctx: Context,
  next: Next
) {
  // const cookies = ctx.cookies;
  // const accessToken = cookies.get("access_token");
  // const refreshToken = cookies.get("refresh_token");

  // if (
  //   ctx.path === "/auth/login" ||
  //   ctx.path === "/auth/register" ||
  //   ctx.path === "/health"
  // ) {
  //   return await next();
  // }

  // try {
  //   if (!accessToken) {
  //     ctx.status = 401;
  //     ctx.body = { error: "No access token provided" };
  //     return;
  //   }

  //   const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
  //     userId: string;
  //     email: string;
  //   };
  //   ctx.state.user = payload;
  // } catch (error) {
  //   if (refreshToken) {
  //     try {
  //       const newTokens = swapRefreshToken(refreshToken);
  //       ctx.cookies.set("access_token", newTokens.accessToken);
  //       ctx.cookies.set("refresh_token", newTokens.refreshToken);
  //       const payload = jwt.verify(
  //         newTokens.accessToken,
  //         process.env.JWT_SECRET!
  //       ) as { userId: string; email: string };
  //       ctx.state.user = payload;
  //     } catch (refreshError) {
  //       ctx.status = 401;
  //       ctx.body = { error: "Invalid refresh token" };
  //       return;
  //     }
  //   } else {
  //     ctx.status = 401;
  //     ctx.body = { error: "Invalid access token" };
  //     return;
  //   }
  // }
  await next();
}
