import usePrivateRoute from "../../hooks/usePrivateRoute";
import LoadingHome from "./loading";
import { Text } from "design-system";

export default function HomeRoute() {
  const { isAuthenticated, isLoading, user_profile } = usePrivateRoute();

  if (isLoading) return <LoadingHome />;

  return isAuthenticated ? (
    <div>
      <Text>Welcome, {user_profile?.username}</Text>
    </div>
  ) : null;
}
