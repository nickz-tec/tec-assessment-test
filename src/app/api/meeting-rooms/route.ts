import * as tecApi from "@/server/tec-api-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityCode = searchParams.get("cityCode");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const seats = searchParams.get("seats");
  const isVC = searchParams.get("isVC");

  if (!startDate || !endDate || !seats || !cityCode) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const response = await tecApi.getRoomAvailabilities({
    startDate: startDate,
    endDate: endDate,
    cityCode,
  });

  return NextResponse.json(response);
}
