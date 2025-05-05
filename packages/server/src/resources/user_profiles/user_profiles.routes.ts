import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { UserProfilesService } from "./user_profiles.service";
import { InsertUserProfile, UpdateUserProfile } from "shared/types";

const user_profiles_router = new Router({ prefix: "/user_profiles" });
const user_profiles_service = new UserProfilesService(db);

user_profiles_router.get("/", async (ctx: Context) => {
  const result = await user_profiles_service.findMany();
  ctx.body = result;
});

user_profiles_router.get("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  const result = await user_profiles_service.findFirst(id);
  ctx.body = result;
});

user_profiles_router.post("/", async (ctx: Context) => {
  const body = ctx.request.body as InsertUserProfile;
  const result = await user_profiles_service.create(body);
  ctx.body = result;
});

user_profiles_router.patch("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  const body = ctx.request.body as UpdateUserProfile;
  const result = await user_profiles_service.update(id, body);
  ctx.body = result;
});

user_profiles_router.delete("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  await user_profiles_service._delete(id);
  ctx.status = 204;
});

export default user_profiles_router;
