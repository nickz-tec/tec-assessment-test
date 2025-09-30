import { NextResponse } from "next/server";

import { MeetingRoomDetails } from "@/lib/types";
import { availableSeats } from "@/lib/filters";

import {
  loadAllMeetingRooms,
  baseRoomFilterFunction,
  getAvailabilities,
  getAllCentres,
  getPricings,
} from "@/lib/meeting-room-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const { cityCode, startDate, endDate, seats, isVC } =
      validateRequestParams(searchParams);

    const [availabilities, pricings, allCentres] = await Promise.all([
      getAvailabilities(startDate, endDate, cityCode),
      getPricings(startDate, endDate, cityCode, isVC === "true"),
      getAllCentres(),
    ]);

    const rooms = await loadAllMeetingRooms(cityCode);

    const roomResults: MeetingRoomDetails[] = rooms
      .filter(baseRoomFilterFunction(parseInt(seats), isVC === "true"))
      .flatMap((room) => {
        const availability = availabilities.get(room.roomCode);

        // Assume only need to check isAvailable flag
        if (!availability || !availability.isAvailable) {
          return [];
        }

        const price = pricings.get(room.roomCode);
        const centre = allCentres.get(room.centreCode);

        if (!price || !centre) {
          return [];
        }

        return {
          details: room,
          availability,
          price,
          centreGroup: centre,
        };
      });

    return NextResponse.json({
      success: true,
      data: roomResults,
    });
  } catch {
    // Simple error handling for the sake of the demo
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong...",
        data: [],
      },
      { status: 400 }
    );
  }
}

const validateRequestParams = (params: URLSearchParams) => {
  const cityCode = params.get("cityCode");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const seats = params.get("seats");
  const isVC = params.get("isVC");

  if (!startDate || !endDate || !seats || !cityCode) {
    throw new Error("Missing required parameters");
  }

  if (isVC && isVC !== "true" && isVC !== "false") {
    throw new Error("Invalid isVC value");
  }

  if (!availableSeats.includes(seats)) {
    throw new Error("Invalid seats value");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  if (end <= start) {
    throw new Error("Invalid date range");
  }

  return {
    cityCode,
    startDate,
    endDate,
    seats,
    isVC,
  };
};
