"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useEffect, useState } from "react";
import { GetRoomAvailabilitiesResponse } from "@/server/tec-api-types";
import { format } from "date-fns";

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

  useEffect(() => {}, [filterValues]);

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city.code,
    group: city.region,
  }));

  const [meetingRooms, setMeetingRooms] =
    useState<GetRoomAvailabilitiesResponse>([]);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      const params = new URLSearchParams();

      params.set(
        "startDate",
        format(initialValue.startDate, "yyyy-MM-dd'T'HH:mm:ss")
      );
      params.set(
        "endDate",
        format(initialValue.endDate, "yyyy-MM-dd'T'HH:mm:ss")
      );
      params.set("seats", initialValue.seats.toString());
      params.set("cityCode", "HKG");

      const response = await fetch(`/api/meeting-rooms?${params.toString()}`);
      const data = await response.json();
      setMeetingRooms(data);
    };

    fetchMeetingRooms();
  }, [initialValue]);

  return (
    <Box>
      <MeetingRoomFilters
        cities={cityOptions}
        nextAvailableSlot={nextAvailableSlot}
        initialValue={initialValue}
      />
      {meetingRooms.map((meetingRoom) => (
        <Box key={meetingRoom.roomCode}>
          <Text>{meetingRoom.roomCode}</Text>
        </Box>
      ))}
    </Box>
  );
};
