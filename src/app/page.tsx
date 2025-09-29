import { Box } from "@chakra-ui/react";
import * as tecApi from "@/server/tec-api-client";
import {
  createDefaultValues,
  getNextAvailableSlot,
  validateSearchParams,
} from "@/lib/filters";
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

  const cities = data.items.map((city) => ({
    name: city.name,
    code: city.code,
    region: city.region.name.en,
  }));

  const extractedFilters = validateSearchParams(params, {
    nextAvailableSlot,
    cities,
    seats: availableSeats,
  });

  const defaultValues = createDefaultValues(nextAvailableSlot, "HKG");

  return (
    <Box p={4}>
      <MeetingRoomList
        cities={cities}
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
