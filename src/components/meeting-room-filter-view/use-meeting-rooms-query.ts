import { createFilterDateString } from "@/lib/filters";
import { FilterValues, MeetingRoomDetails } from "@/lib/types";
import { useEffect, useState } from "react";

export const useMeetingRoomsQuery = (filterValues: FilterValues) => {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoomDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      setIsLoading(true);
      setMeetingRooms([]);

      const p = new URLSearchParams({
        startDate: createFilterDateString(filterValues.startDate),
        endDate: createFilterDateString(filterValues.endDate),
        seats: filterValues.seats.toString(),
        cityCode: filterValues.cityCode,
      });

      if (filterValues.isVC) {
        p.set("isVC", "true");
      }

      const response = await fetch(`/api/meeting-rooms?${p.toString()}`);

      // Inline type cast since this is the only instance
      const res = (await response.json()) as {
        success: boolean;
        data: MeetingRoomDetails[];
      };

      setMeetingRooms(res.data);
      setIsLoading(false);
    };

    fetchMeetingRooms();
  }, [filterValues]);

  return { meetingRooms, isLoading };
};
