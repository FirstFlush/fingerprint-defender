import { FetchOptions } from "@/types/api";


export const fetchJson = async <T>(
  url: string, 
  queryParams?: Record<string, string>,
  options: FetchOptions = {}
): Promise<T> => {
  const params = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
  const fullUrl = `${url}${params}`
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    console.log(res)
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  return res.json();
}
