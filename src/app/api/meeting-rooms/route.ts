import * as tecApi from "@/server/tec-api-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("cityCode");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const seats = searchParams.get("seats");

  if (!startDate || !endDate || !seats || !city) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const response = await tecApi.getRoomAvailabilities({
    startDate: startDate,
    endDate: endDate,
    cityCode: "HKG",
  });

  return NextResponse.json(response);
}
