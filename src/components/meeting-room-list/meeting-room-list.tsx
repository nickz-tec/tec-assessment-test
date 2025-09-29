"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { GetRoomAvailabilitiesResponse } from "@/server/tec-api-types";
import { createFilterCityString, createFilterDateString } from "@/lib/filters";

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

  // Ref used to lookup city by code
  const citiesLookupRef = useRef(cities);
  citiesLookupRef.current = cities;

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

    const city = citiesLookupRef.current.find(
      (city) => city.code === filterValues.city
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
        `Unexpected error: City name for code: ${filterValues.city} not found`
      );
    }

    window.history.replaceState({}, "", `/?${urlParams.toString()}`);

    // Fetch meeting rooms
    const fetchMeetingRooms = async () => {
      setMeetingRooms([]);

      const apiParams = new URLSearchParams();
      apiParams.set("startDate", startDate);
      apiParams.set("endDate", endDate);
      apiParams.set("seats", filterValues.seats.toString());
      apiParams.set("cityCode", filterValues.city);

      const response = await fetch(
        `/api/meeting-rooms?${apiParams.toString()}`
      );

      const data = (await response.json()) as GetRoomAvailabilitiesResponse;

      setMeetingRooms(data);
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
