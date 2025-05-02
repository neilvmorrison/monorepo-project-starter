import { Context, Next } from "koa";

export default async function error_logging(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    // TODO: Put DB Methods here
    console.log(err.message);
  }
}
