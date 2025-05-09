import tryCatch from "shared/utils/try-catch";
import { _fetch, FetchError } from "./fetch";

export default async function apiHandler<R>(
  url: string,
  options: RequestInit = {}
) {
  const { data, error } = await tryCatch<R, FetchError>(
    _fetch(url, { ...options })
  );

  return { data, error };
}
