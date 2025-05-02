import { useQuery } from "@tanstack/react-query";

async function fetchUserProjects() {
  const _response = await fetch("/api/projects");
  const response = await _response.json();
  return response;
}

export default function useProjects(userId?: string) {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!userId,
    queryKey: ["projects", userId],
    queryFn: async () => fetchUserProjects(),
  });

  return {
    projects,
    isLoading,
    isError,
  };
}
