import tecApi from "@/server/tec-api-client";
import { NextResponse } from "next/server";

import {
  GetCentresResponse,
  GetMeetingRoomsResponse,
  GetPricingsResponse,
  GetRoomAvailabilitiesResponse,
} from "@/server/tec-api-types";
import { MeetingRoomDetails } from "@/lib/types";
import { availableSeats } from "@/lib/filters";

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

const loadAllMeetingRooms = async (cityCode: string) => {
  const rooms: GetMeetingRoomsResponse["items"] = [];

  // Used as last resort to prevent infinite loop
  let runCount = 0;

  let shouldRun = true;

  const searchParams = new URLSearchParams();
  searchParams.set("cityCode", cityCode);
  searchParams.set("pageSize", "50");
  searchParams.set("pageNumber", "1");

  // Assume there are less than 10 pages of rooms with page size 50
  while (shouldRun && runCount < 10) {
    const { items, hasNextPage, pageNumber, pageCount } =
      await tecApi.call<GetMeetingRoomsResponse>(
        `/core-api-me/api/v1/meetingrooms?${searchParams.toString()}`
      );

    rooms.push(...items);

    searchParams.set("pageNumber", (pageNumber + 1).toString());

    if (!hasNextPage || pageNumber >= pageCount) {
      shouldRun = false;
    }

    runCount++;
  }

  return rooms;
};

const baseRoomFilterFunction =
  (seats: number, isVC: boolean) =>
  (room: GetMeetingRoomsResponse["items"][number]) => {
    const meetsCapacity = room.capacity >= seats;
    const meetsVideoRequirement = room.hasVideoConference === isVC;

    return (
      meetsCapacity &&
      meetsVideoRequirement &&
      room.isBookable &&
      !room.isClosed
    );
  };

export const getAvailabilities = async (
  startDate: string,
  endDate: string,
  cityCode: string
) => {
  const p = new URLSearchParams({
    startDate,
    endDate,
    cityCode,
  });

  const availabilities = await tecApi.call<GetRoomAvailabilitiesResponse>(
    `/core-api-me/api/v1/meetingrooms/availabilities?${p.toString()}`
  );

  return new Map<string, GetRoomAvailabilitiesResponse[number]>(
    availabilities.map((availability) => [availability.roomCode, availability])
  );
};

const getPricings = async (
  startDate: string,
  endDate: string,
  cityCode: string,
  isVC: boolean
) => {
  const p = new URLSearchParams({
    startDate,
    endDate,
    cityCode,
    isVcBooking: isVC.toString(),
  });

  const pricings = await tecApi.call<GetPricingsResponse>(
    `/core-api-me/api/v1/meetingrooms/pricings?${p.toString()}`
  );

  return new Map<string, GetPricingsResponse[number]>(
    pricings.map((price) => [price.roomCode, price])
  );
};

const getAllCentres = async () => {
  const centres = await tecApi.call<GetCentresResponse>(
    `/core-api-me/api/v1/centregroups`
  );
  const centresMap = new Map<string, GetCentresResponse[number]>();

  centres.forEach((centre) => {
    centre.newCentreCodesForMtCore.forEach((centreCode) => {
      centresMap.set(centreCode, centre);
    });
  });

  return centresMap;
};
