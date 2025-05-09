import Router from "@koa/router";

import user_profiles_router from "../resources/user_profiles/user_profiles.routes";
import auth_router from "../resources/auth/auth.routes";
// import error_logs_router from "../resources/error_logs/error_logs.routes";
import action_logs_router from "../resources/action_logs/action_logs.routes";
const router = new Router({ prefix: "/api" });

router.use(user_profiles_router.routes());
router.use(auth_router.routes());
// router.use(error_logs_router.routes());
router.use(action_logs_router.routes());
export default router;
