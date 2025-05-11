import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import apiHandler from "../lib/api";
import { CurrentUser } from "shared/types";

async function fetchCurrentUser() {
  const { data, error } = await apiHandler<CurrentUser & { email: string }>(
    "/api/auth/current"
  );
  if (error) throw error;
  return data;
}

async function logOut() {
  const { error } = await apiHandler<void>("/api/auth/logout", {
    method: "POST",
  });
  if (error) throw error;
  return;
}

export default function useCurrentUser() {
  const qc = useQueryClient();
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["current_user"],
    queryFn: async () => fetchCurrentUser(),
    retry: 0,
  });

  const { mutateAsync: logOutUser, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ["current_user"] });
    },
  });

  return {
    currentUser,
    isLoading: isLoading || isPending,
    isError,
    logOutUser,
  };
}
