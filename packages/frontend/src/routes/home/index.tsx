import usePrivateRoute from "../../hooks/usePrivateRoute";
import LoadingHome from "./loading";

export default function HomeRoute() {
  const { isAuthenticated, isLoading, user_profile } = usePrivateRoute();

  if (isLoading) return <LoadingHome />;

  return isAuthenticated ? (
    <div>
      <h1 className="text-xl font-bold">Welcome, {user_profile?.username}</h1>
    </div>
  ) : null;
}
