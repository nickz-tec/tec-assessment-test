export async function call<T>(
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
    // TEC api server errors are returned as plain text
    throw new Error(`API call to ${endpoint} failed: ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}

const tecApiClient = {
  call,
};

export default tecApiClient;
