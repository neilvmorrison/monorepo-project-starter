import Router from "@koa/router";

import user_profiles_router from "../resources/user_profiles/user_profiles.routes";
import auth_router from "../resources/auth/auth.routes";
const router = new Router({ prefix: "/api" });

router.use(user_profiles_router.routes());
router.use(auth_router.routes());
export default router;
