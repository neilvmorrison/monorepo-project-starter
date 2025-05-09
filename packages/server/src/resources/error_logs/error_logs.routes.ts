import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { ErrorLogsService } from "./error_logs.service";
import { InsertErrorLog } from "shared/types";

const error_logs_router = new Router({ prefix: "/error_logs" });
const error_logs_service = new ErrorLogsService(db);

error_logs_router.post("/", async (ctx: Context) => {
  const body = ctx.request.body as InsertErrorLog;
  const result = await error_logs_service.create(body);
  ctx.body = result;
});

export default error_logs_router;
