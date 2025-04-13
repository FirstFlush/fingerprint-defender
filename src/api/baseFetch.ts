import { FetchOptions } from "@/types/api";


export const fetchJson = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  return res.json();
}
