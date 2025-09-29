"use server";

import {
  GetCitiesResponse,
  GetRoomAvailabilitiesParams,
  GetRoomAvailabilitiesResponse,
} from "./tec-api-types";

export async function callApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!process.env.TEC_API_BASE_URL || !process.env.TEC_API_ACCESS_KEY) {
    throw new Error("TEC_API_BASE_URL or TEC_API_ACCESS_KEY is not set");
  }

  const apiBaseUrl = `${process.env.TEC_API_BASE_URL}`;
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
  return await callApi<GetCitiesResponse>(
    "/core-api/api/v1/cities?pageSize=100"
  );
};

const getRoomAvailabilities = async (params: GetRoomAvailabilitiesParams) => {
  const queryParams = new URLSearchParams(params);

  return await callApi<GetRoomAvailabilitiesResponse>(
    `/core-api-me/api/v1/meetingrooms/availabilities?${queryParams.toString()}`
  );
};

export { getCities, getRoomAvailabilities };
