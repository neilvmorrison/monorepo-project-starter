import { Outlet } from "react-router";
import usePrivateRoute from "../hooks/usePrivateRoute";
import usePageMetadata from "../hooks/usePageMetadata";
import { APP_NAME } from "../../../shared/constants/index";
import Navbar from "../components/navbar";
import { Skeleton } from "design-system/src/components/skeleton";
import useCurrentUser from "../hooks/useCurrentUser";

export default function RootLayout() {
  const { isAuthenticated, isLoading, user_profile } = usePrivateRoute();
  const { logOutUser } = useCurrentUser();
  usePageMetadata({ title: APP_NAME });

  if (!isAuthenticated) return null;
  return (
    <>
      <Navbar
        user_profile={user_profile}
        is_loading={isLoading}
        logout={logOutUser}
      />
      <main className="p-8 light:bg-[#efefef] min-h-[calc(100vh-60px)]">
        {isLoading ? <Skeleton variant="rectangular" /> : <Outlet />}
      </main>
    </>
  );
}
