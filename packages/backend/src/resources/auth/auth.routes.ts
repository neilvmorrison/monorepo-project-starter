import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { AuthService } from "./auth.service";
import { UserProfilesService } from "../user_profiles/user_profiles.service";
import { LoginPayload } from "shared/types";
import { tryCatch } from "shared/utils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

type LoginReturn = {
  accessToken: string;
  refreshToken: string;
};

const auth_router = new Router({ prefix: "/auth" });
const userService = new UserProfilesService(db);
const auth_service = new AuthService(db, userService);

auth_router.get("/", async (ctx: Context) => {
  const result = await auth_service.findMany();
  ctx.body = result;
});

auth_router.post("/login", async (ctx: Context) => {
  const body = ctx.request.body as LoginPayload;
  const { data, error } = await tryCatch<LoginReturn, UnauthorizedError>(
    auth_service.loginUser(body.email, body.password)
  );
  if (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message };
    return;
  }
  ctx.cookies.set("access_token", data.accessToken);
  ctx.cookies.set("refresh_token", data.refreshToken);
  ctx.body = data;
});

auth_router.post("/logout", async (ctx: Context) => {
  ctx.cookies.set("access_token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });

  ctx.cookies.set("refresh_token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });

  ctx.status = 200;
  ctx.body = { success: true };
});

export default auth_router;
