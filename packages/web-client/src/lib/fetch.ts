import tryCatch from "shared/utils/try-catch";

export async function _fetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export default async function apiHandler<R, E = Error>(
  url: string,
  options: RequestInit = {}
) {
  const { data, error } = await tryCatch<R, E>(_fetch(url, { ...options }));
  return { data, error };
}
