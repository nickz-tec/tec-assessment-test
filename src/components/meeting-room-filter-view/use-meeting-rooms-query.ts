import { createFilterDateString } from "@/lib/filters";
import { FilterValues, MeetingRoomDetails } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  MeetingRoomsByCentreGroup,
  groupMeetingRoomsByCentre,
} from "@/lib/meeting-rooms";

export const useMeetingRoomsQuery = (filterValues: FilterValues) => {
  const [meetingRooms, setMeetingRooms] =
    useState<MeetingRoomsByCentreGroup | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      setIsLoading(true);
      setMeetingRooms(null);
      setIsError(false);

      const p = new URLSearchParams({
        startDate: createFilterDateString(filterValues.startDate),
        endDate: createFilterDateString(filterValues.endDate),
        seats: filterValues.seats.toString(),
        cityCode: filterValues.cityCode,
      });

      if (filterValues.isVC) {
        p.set("isVC", "true");
      }

      try {
        const response = await fetch(`/api/meeting-rooms?${p.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch meeting rooms");
        }

        // Inline type cast since this is the only instance
        const res = (await response.json()) as {
          success: boolean;
          data: MeetingRoomDetails[];
        };

        if (!res.success) {
          throw new Error("Meeting rooms API returned an error");
        }

        setMeetingRooms(groupMeetingRoomsByCentre(res.data));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingRooms();
  }, [filterValues]);

  return { meetingRooms, isLoading, isError };
};
