import Koa from "koa";
import router from "./router";
import logger from "koa-logger";
import bodyparser from "koa-bodyparser";
import error_logging from "./middleware/error_logging";
import authenticationMiddleware from "./middleware/authentication";

export const app = new Koa();

router.get("/health", async (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(error_logging);
app.use(authenticationMiddleware);
// TODO: Implement Action Logging
app.use(logger());
app.use(bodyparser());
app.use(router.routes());

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
