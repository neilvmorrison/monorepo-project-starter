import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { AuthService } from "./auth.service";
import { UserProfilesService } from "../user_profiles/user_profiles.service";
import { LoginPayload } from "shared/types";
import { tryCatch } from "shared/utils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { SessionsService } from "./sessions.service";

type LoginReturn = {
  accessToken: string;
  refreshToken: string;
  authUserId: string;
};

const auth_router = new Router({ prefix: "/auth" });
const userService = new UserProfilesService(db);
const sessionService = new SessionsService(db);
const auth_service = new AuthService(db, userService, sessionService);

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
    throw error;
  }
  ctx.state = data.authUserId;
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

auth_router.post("/register", async (ctx: Context) => {
  const body = ctx.request.body as {
    email: string;
    password: string;
    username: string;
  };
  const { data: newAuthUser, error } = await tryCatch<LoginReturn>(
    auth_service.register(body.email, body.password, body.username)
  );
  if (error) {
    ctx.message = error.message;
  }
  if (newAuthUser) {
    ctx.cookies.set("access_token", newAuthUser.accessToken);
    ctx.cookies.set("refresh_token", newAuthUser.refreshToken);
    ctx.body = newAuthUser;
  }
});

auth_router.get("/current", async (ctx: Context) => {
  const refresh_token = ctx.cookies.get("refresh_token");
  if (!refresh_token) {
    ctx.status = 401;
    ctx.body = { error: "Not authenticated" };
    return;
  }
  const current_user = await auth_service.getCurrentUser(refresh_token);

  if (!current_user.is_authenticated) {
    ctx.status = 401;
    ctx.body = { error: current_user.error };
    return;
  }

  ctx.body = current_user;
});

export default auth_router;
