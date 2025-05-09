import { config } from "dotenv";
import Koa from "koa";
import router from "./router";
import logger from "koa-logger";
import bodyparser from "koa-bodyparser";
import error_logging from "./middleware/error_logging";
import authenticationMiddleware from "./middleware/authentication";
import path from "path";
import action_logging from "./middleware/action_logging";

config({ path: path.resolve(path.join(process.cwd(), ".env")) });

export const app = new Koa();

router.get("/health", async (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(error_logging);
app.use(authenticationMiddleware);
app.use(action_logging);
app.use(logger());
app.use(bodyparser());
app.use(router.routes());

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
