"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { createFilterCityString, createFilterDateString } from "@/lib/filters";
import { useMeetingRoomsQuery } from "./use-meeting-rooms-query";

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

  const { meetingRooms, isLoading } = useMeetingRoomsQuery(filterValues);

  // Ref used to lookup city by code
  const citiesLookupRef = useRef(cities);
  citiesLookupRef.current = cities;

  useEffect(() => {
    const startDate = createFilterDateString(filterValues.startDate);
    const endDate = createFilterDateString(filterValues.endDate);

    const city = citiesLookupRef.current.find(
      (city) => city.code === filterValues.cityCode
    );

    // Sync filter values with URL search params
    const urlParams = new URLSearchParams();
    urlParams.set("start_date", startDate);
    urlParams.set("end_date", endDate);
    urlParams.set("seats", filterValues.seats.toString());

    if (city) {
      urlParams.set("city", createFilterCityString(city.name));
    } else {
      console.error(
        `Unexpected error: City name for code: ${filterValues.cityCode} not found`
      );
    }

    if (filterValues.isVC) {
      urlParams.set("is_vc", "true");
    }

    window.history.replaceState({}, "", `/?${urlParams.toString()}`);
  }, [filterValues]);

  return (
    <Box>
      <MeetingRoomFilters
        cities={cities}
        nextAvailableSlot={nextAvailableSlot}
        values={filterValues}
        updateFilter={setFilterValues}
      />

      {isLoading && <Text>Loading...</Text>}

      {meetingRooms.map((meetingRoom) => (
        <Box key={meetingRoom.details.roomCode}>
          <Text>{meetingRoom.details.roomName}</Text>
          <Text>{meetingRoom.centreGroup.cityCode}</Text>
        </Box>
      ))}
    </Box>
  );
};
