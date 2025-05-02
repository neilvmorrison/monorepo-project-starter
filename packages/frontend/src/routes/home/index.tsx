import usePrivateRoute from "../../hooks/usePrivateRoute";
import LoadingHome from "./loading";

export default function HomeRoute() {
  const { isAuthenticated, isLoading } = usePrivateRoute();

  if (isLoading) return <LoadingHome />;

  return isAuthenticated ? (
    <div>
      <h1 className="text-xl font-bold">Home</h1>
    </div>
  ) : null;
}
