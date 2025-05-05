import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "./useCurrentUser";

export default function usePrivateRoute() {
  const { currentUser, isLoading, isError } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || (!isLoading && !currentUser)) {
      navigate("/authentication", { replace: true });
    }
  }, [currentUser, isLoading, isError, navigate]);

  return {
    isAuthenticated: !!currentUser,
    isLoading,
    user_profile: currentUser?.user_profile,
  };
}
