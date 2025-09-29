import * as tecApi from "@/server/tec-api-client";
import { NextResponse } from "next/server";

import {
  GetCentresResponse,
  GetMeetingRoomsResponse,
  GetPricingsResponse,
  GetRoomAvailabilitiesResponse,
} from "@/server/tec-api-types";
import { MeetingRoomDetails } from "@/lib/types";

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

  return NextResponse.json(roomResults);
}

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
      await tecApi.callApi<GetMeetingRoomsResponse>(
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

  const availabilities = await tecApi.callApi<GetRoomAvailabilitiesResponse>(
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

  const pricings = await tecApi.callApi<GetPricingsResponse>(
    `/core-api-me/api/v1/meetingrooms/pricings?${p.toString()}`
  );

  return new Map<string, GetPricingsResponse[number]>(
    pricings.map((price) => [price.roomCode, price])
  );
};

const getAllCentres = async () => {
  const centres = await tecApi.callApi<GetCentresResponse>(
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
