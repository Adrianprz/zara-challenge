import z from "zod";
import { API_KEY } from "./Products/config";

const getHeaders = (): Record<string, string> => {
  if (!API_KEY) throw new Error("Missing API key");
  return { "x-api-key": API_KEY };
};

export async function fetchWithSchema<T>(
  url: string,
  schema: z.ZodSchema<T>,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, { headers: getHeaders(), signal });

  if (!res.ok) {
    if (signal?.aborted) throw new Error("Request aborted");
    throw new Error(`Failed to fetch (${res.status})`);
  }

  const data = await res.json();
  return schema.parse(data);
}
