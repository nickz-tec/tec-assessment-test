"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useState } from "react";
import { useMeetingRoomsQuery } from "./use-meeting-rooms-query";
import { useSyncSearchParams } from "./use-sync-search-params";

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

  useSyncSearchParams(filterValues, cities);

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
