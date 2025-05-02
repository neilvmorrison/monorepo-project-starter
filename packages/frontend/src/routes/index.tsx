import { createBrowserRouter, Outlet } from "react-router";
import AuthRoute from "./auth";
import HomeRoute from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main>
        <Outlet />
      </main>
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
