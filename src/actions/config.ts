/** @format */

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const setHeaders = (token?: string) => {
  const headers: any = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
