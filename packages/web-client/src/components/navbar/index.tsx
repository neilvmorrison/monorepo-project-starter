import {
  Avatar,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Text,
} from "design-system";
import { Skeleton } from "design-system/src/components/skeleton";
import {
  BellRingIcon,
  LogOutIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router";
import { UserProfile } from "shared/types";

interface INavbarProps {
  user_profile?: UserProfile;
  is_loading: boolean;
  logout: () => void;
}

export default function Navbar({
  user_profile,
  is_loading,
  logout,
}: INavbarProps) {
  return (
    <header className="h-[60px] border-b border-b-gray-300 dark:border-b-gray-800 flex items-center px-8 justify-between">
      <Text as="h1" size="lg" weight="semibold">
        🔥 PNPM Project Starter
      </Text>
      <div className="flex items-center gap-4">
        {is_loading ? (
          <Skeleton variant="circular" />
        ) : (
          <DropdownMenu
            trigger={<Avatar initials={user_profile?.username} />}
            position="bottom-end"
            width={320}
          >
            <DropdownItem>
              <Text weight="semibold">{user_profile?.username}</Text>
              <Text size="xs">{user_profile?.email}</Text>
            </DropdownItem>
            <DropdownItem icon={<User2Icon />}>
              <Link to="/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem icon={<BellRingIcon />}>
              <Link to="/notifications">Notifications</Link>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOutIcon />} onClick={logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
