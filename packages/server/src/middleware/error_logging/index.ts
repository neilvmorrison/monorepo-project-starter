import { Context, Next } from "koa";
import { ErrorLogsService } from "../../resources/error_logs/error_logs.service";
import db from "../../db/client";
import { decodeToken } from "../../resources/auth/jwt";

const errorLogService = new ErrorLogsService(db);

export default async function error_logging(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    const cookies = ctx.cookies;
    const access_token = cookies.get("access_token");
    let auth_user_id: string | undefined;
    if (access_token) {
      const decoded = decodeToken(access_token)?.userId;
      auth_user_id = decoded;
    }
    await errorLogService.create({
      message: err.message,
      status_code: ctx.response.status,
      request_metadata: ctx.request,
      response_metadata: ctx.response,
      method: ctx.request.method,
      url: ctx.originalUrl,
      ...(auth_user_id && { auth_user_id }),
    });
  }
}
