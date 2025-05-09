import { Context, Next } from "koa";
import { ActionLogsService } from "../../resources/action_logs/action_logs.service";
import db from "../../db/client";
import { ACTION_LOGS } from "shared/types";
import { decodeToken } from "../../resources/auth/jwt";

const actionLogService = new ActionLogsService(db);

function getActionType(url: string) {
  if (url.includes("/login")) {
    return ACTION_LOGS.LOGIN;
  }
  if (url.includes("/logout")) {
    return ACTION_LOGS.LOGOUT;
  }
  if (url.includes("/register")) {
    return ACTION_LOGS.REGISTER;
  }
  // Default to LOGIN for other paths
  // return ACTION_LOGS.LOGIN;
}

export default async function action_logging(ctx: Context, next: Next) {
  await next();
  const access_token = ctx.cookies.get("access_token");
  let auth_user_id: string | undefined;
  const action = getActionType(ctx.originalUrl);
  if (
    access_token &&
    action &&
    ctx.response.status >= 200 &&
    ctx.response.status < 400
  ) {
    const decoded = decodeToken(access_token)?.userId;
    auth_user_id = decoded;
    await actionLogService.create({
      action,
      url: ctx.originalUrl,
      auth_user_id: auth_user_id!,
      request_body: ctx.request.body as Record<string, any>,
      status: ctx.response.status,
    });
  }
}
