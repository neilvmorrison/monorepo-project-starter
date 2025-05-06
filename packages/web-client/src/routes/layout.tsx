import { Outlet } from "react-router";
import { Text, Avatar } from "design-system";
import usePrivateRoute from "../hooks/usePrivateRoute";

export default function RootLayout() {
  const { isAuthenticated, isLoading, user_profile } = usePrivateRoute();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return null;
  return (
    <>
      <header className="h-[60px] border-b border-b-gray-300 dark:border-b-gray-800 flex items-center px-8 justify-between">
        <Text as="h1" size="lg" weight="semibold">
          🔥 PNPM Project Starter
        </Text>
        <div className="flex items-center gap-4">
          <Text weight="semibold">{user_profile?.username}</Text>
          <Avatar initials={user_profile?.username} />
        </div>
      </header>
      <main className="p-8 light:bg-[#efefef] min-h-[calc(100vh-60px)]">
        <Outlet />
      </main>
    </>
  );
}
