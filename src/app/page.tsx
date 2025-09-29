import { Box } from "@chakra-ui/react";
import * as tecApi from "@/server/tec-api-client";
import { getNextAvailableSlot, validateSearchParams } from "@/lib/filters";
import { addHours } from "date-fns";
import { availableSeats } from "@/lib/filters";
import { FilterSearchParams } from "@/lib/types";
import { MeetingRoomList } from "@/components/meeting-room-list/meeting-room-list";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<FilterSearchParams>;
}) => {
  const params = await searchParams;

  const data = await tecApi.getCities();

  const nextAvailableSlot = getNextAvailableSlot();

  const extractedFilters = validateSearchParams(params, {
    nextAvailableSlot,
    cities: data.items.map((city) => city.name),
    seats: availableSeats,
  });

  const defaultValues = {
    startDate: addHours(nextAvailableSlot, 2),
    endDate: addHours(nextAvailableSlot, 3),
    seats: 1,
    // TODO: Set default city from request
    city: "hong-kong",
  };

  return (
    <Box p={4}>
      <MeetingRoomList
        cities={data.items.map((city) => ({
          name: city.name,
          region: city.region.name.en,
          code: city.code,
        }))}
        nextAvailableSlot={nextAvailableSlot}
        initialValue={{
          ...defaultValues,
          ...extractedFilters,
        }}
      />
    </Box>
  );
};

export default Home;
