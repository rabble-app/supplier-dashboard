/** @format */

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const setHeaders = (
  token?: string,
  contentType: string | null = "application/json"
) => {
  console.log(34, token)
  const headers: Record<string, string> = {};

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
