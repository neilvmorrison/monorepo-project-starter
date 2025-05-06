import useCurrentUser from "../../hooks/useCurrentUser";
import usePrivateRoute from "../../hooks/usePrivateRoute";
import LoadingHome from "./loading";
import { Button, Text } from "design-system";

export default function HomeRoute() {
  const { isAuthenticated, isLoading, user_profile } = usePrivateRoute();
  const { logOutUser } = useCurrentUser();

  if (isLoading) return <LoadingHome />;

  return isAuthenticated ? (
    <div>
      <Text>Welcome, {user_profile?.username}</Text>
      <Button onClick={() => logOutUser()}>Logout</Button>
    </div>
  ) : null;
}
