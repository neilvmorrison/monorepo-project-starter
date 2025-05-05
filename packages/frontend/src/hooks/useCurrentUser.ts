import { useQuery } from "@tanstack/react-query";
import apiHandler from "../lib/fetch";
import { CurrentUser } from "shared/types";

async function fetchCurrentUser() {
  const { data, error } = await apiHandler<CurrentUser>("/api/auth/current");
  if (error) throw error;
  return data;
}

export default function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["current_user"],
    queryFn: async () => fetchCurrentUser(),
  });

  return {
    currentUser,
    isLoading,
    isError,
  };
}
