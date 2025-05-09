import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { ActionLogsService } from "./action_logs.service";
import { InsertActionLog } from "shared/types";

const action_logs_router = new Router({ prefix: "/action_logs" });
const action_logs_service = new ActionLogsService(db);

action_logs_router.post("/", async (ctx: Context) => {
  const body = ctx.request.body as InsertActionLog;
  const result = await action_logs_service.create(body);
  ctx.body = result;
});

export default action_logs_router;
