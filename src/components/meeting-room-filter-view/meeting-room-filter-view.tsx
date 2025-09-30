"use client";
import { Box, Text } from "@chakra-ui/react";

import { MeetingRoomFilters } from "./meeting-room-filters";
import { FilterValues } from "@/lib/types";
import { useState } from "react";
import { useMeetingRoomsQuery } from "./use-meeting-rooms-query";
import { useSyncSearchParams } from "./use-sync-search-params";
import { CentreGroup } from "../meeting-room-list/centre-group";
import {
  getCentreAddress,
  getCentreName,
  getCentrePhone,
} from "@/lib/meeting-rooms";
import { MeetingRoomItem } from "../meeting-room-list/meeting-room-item";
import { Loader } from "./loader";
import { EmptyState } from "./empty-state";

type Props = {
  cities: {
    name: string;
    region: string;
    code: string;
  }[];
  nextAvailableSlot: Date;
  initialValue: FilterValues;
};

export const MeetingRoomFilterView = ({
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

      {isLoading && <Loader />}

      {meetingRooms &&
        meetingRooms.map(({ centreGroup, rooms, groupId }) => {
          return (
            <CentreGroup
              key={groupId}
              centreGroupName={getCentreName(centreGroup)}
              address={getCentreAddress(centreGroup)}
              phone={getCentrePhone(centreGroup)}
            >
              {rooms.map((room) => (
                <MeetingRoomItem
                  key={room.details.roomCode}
                  roomName={room.details.roomName}
                  photoUrls={room.details.photoUrls}
                  capacity={room.details.capacity}
                  amenities={room.details.amenities}
                  hourlyPrice={room.price.finalPrice}
                  currencyCode={room.price.currencyCode}
                  floor={room.details.floor}
                />
              ))}
            </CentreGroup>
          );
        })}

      {meetingRooms && meetingRooms.length > 0 && (
        <Text textAlign="center" mt="2rem">
          A total of {meetingRooms.length} meeting rooms at your service
        </Text>
      )}

      {meetingRooms && meetingRooms.length === 0 && <EmptyState />}
    </Box>
  );
};
