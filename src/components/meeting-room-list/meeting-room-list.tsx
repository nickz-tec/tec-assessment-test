"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useEffect, useState } from "react";
import { GetRoomAvailabilitiesResponse } from "@/server/tec-api-types";
import * as tecApi from "@/server/tec-api-client";
import { createFilterDateString } from "@/lib/filters";

type Props = {
  cities: {
    name: string;
    region: string;
    code: string;
  }[];
  nextAvailableSlot: Date;
  initialValue: FilterValues;
};

export const MeetingRoomList = ({
  cities,
  nextAvailableSlot,
  initialValue,
}: Props) => {
  const [filterValues, setFilterValues] = useState(initialValue);
  const [meetingRooms, setMeetingRooms] =
    useState<GetRoomAvailabilitiesResponse>([]);

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city.code,
    group: city.region,
  }));

  useEffect(() => {
    const startDate = createFilterDateString(filterValues.startDate);
    const endDate = createFilterDateString(filterValues.endDate);

    // Sync filter values with URL search params
    const newParams = new URLSearchParams();
    newParams.set("start_date", startDate);
    newParams.set("end_date", endDate);
    newParams.set("seats", filterValues.seats.toString());
    newParams.set("city", filterValues.city);
    window.history.replaceState({}, "", `/?${newParams.toString()}`);

    // Fetch meeting rooms
    const fetchMeetingRooms = async () => {
      setMeetingRooms([]);

      const response = await tecApi.getRoomAvailabilities({
        startDate,
        endDate,
        // TODO: Map city name to city code
        cityCode: "HKG",
      });
      setMeetingRooms(response);
    };

    fetchMeetingRooms();
  }, [filterValues]);

  return (
    <Box>
      <MeetingRoomFilters
        cities={cityOptions}
        nextAvailableSlot={nextAvailableSlot}
        values={filterValues}
        updateFilter={setFilterValues}
      />

      {meetingRooms.map((meetingRoom) => (
        <Box key={meetingRoom.roomCode}>
          <Text>{meetingRoom.roomCode}</Text>
        </Box>
      ))}
    </Box>
  );
};
