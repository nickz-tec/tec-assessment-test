import { GetCitiesResponse } from "./tec-api-types";

export async function callApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!process.env.TEC_API_BASE_URL || !process.env.TEC_API_ACCESS_KEY) {
    throw new Error("TEC_API_BASE_URL or TEC_API_ACCESS_KEY is not set");
  }

  const apiBaseUrl = `${process.env.TEC_API_BASE_URL}/core-api/api/v1`;
  const apiKey = process.env.TEC_API_ACCESS_KEY || "";

  const headers = {
    "Content-Type": "application/json",
    "x-access-key": apiKey,
    ...options.headers,
  };

  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call to ${endpoint} failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

const getCities = async () => {
  return await callApi<GetCitiesResponse>("/cities?pageSize=100");
};

export { getCities };
