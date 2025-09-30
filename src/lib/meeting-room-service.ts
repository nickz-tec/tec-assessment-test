import tecApi from "@/server/tec-api-client";

import {
  GetCentresResponse,
  GetMeetingRoomsResponse,
  GetPricingsResponse,
  GetRoomAvailabilitiesResponse,
} from "@/server/tec-api-types";

export const loadAllMeetingRooms = async (cityCode: string) => {
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
        `/core-api-me/api/v1/meetingrooms?${searchParams.toString()}`,
        {
          next: {
            revalidate: 1800,
            tags: [
              `meeting-rooms:${cityCode}`,
              `meeting-rooms:${cityCode}:page:${searchParams.get(
                "pageNumber"
              )}`,
            ],
          },
        }
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

export const baseRoomFilterFunction =
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

export const getPricings = async (
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
    `/core-api-me/api/v1/meetingrooms/pricings?${p.toString()}`,
    {
      next: {
        revalidate: 120,
        tags: [`room-pricings:${cityCode}`],
      },
    }
  );

  return new Map<string, GetPricingsResponse[number]>(
    pricings.map((price) => [price.roomCode, price])
  );
};

export const getAllCentres = async () => {
  const centres = await tecApi.call<GetCentresResponse>(
    `/core-api-me/api/v1/centregroups`,
    {
      next: {
        revalidate: 3600,
        tags: ["centre-groups"],
      },
    }
  );
  const centresMap = new Map<string, GetCentresResponse[number]>();

  centres.forEach((centre) => {
    centre.newCentreCodesForMtCore.forEach((centreCode) => {
      centresMap.set(centreCode, centre);
    });
  });

  return centresMap;
};
