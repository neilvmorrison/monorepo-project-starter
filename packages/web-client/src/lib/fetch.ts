export class FetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function _fetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    const error = new FetchError(response.statusText, response.status);
    console.log(error.message, error.status);
    throw error;
  }

  const result = await response.json();
  return result;
}
