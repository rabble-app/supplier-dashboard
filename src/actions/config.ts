/** @format */
export const API_ENDPOINT = process.env.API_ENDPOINT;

export const setHeaders = (token?: string) => {
  const headers: any = {
    "Content-Type": "application/json",
    Cache: "no-store",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
