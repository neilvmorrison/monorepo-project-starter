import { createBrowserRouter, Outlet } from "react-router";
import { Text } from "design-system";
import AuthRoute from "./auth";
import HomeRoute from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <header className="h-[60px] border-b border-b-gray-300 flex items-center px-8">
          <Text element="h1" size="lg" weight="semibold">
            🔥 PNPM Project Starter
          </Text>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
  {
    path: "/authentication",
    element: (
      <main>
        <AuthRoute />
      </main>
    ),
  },
]);

export default router;
