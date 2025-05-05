import { useQuery } from "@tanstack/react-query";
import apiHandler from "../lib/fetch";
import { UserProfile } from "shared/types";

async function fetchCurrentUser() {
  const { data, error } = await apiHandler<UserProfile>("/api/auth/current");
  console.log(data, error);
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
    currentUser: currentUser ?? null,
    isLoading,
    isError,
  };
}
