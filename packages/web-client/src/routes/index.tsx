import { createBrowserRouter } from "react-router";
import AuthRoute from "./auth";
import HomeRoute from "./home";
import RootLayout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
