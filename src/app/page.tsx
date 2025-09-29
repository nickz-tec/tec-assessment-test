import { Box } from "@chakra-ui/react";
import { headers } from "next/headers";
import tecApi from "@/server/tec-api-client";
import {
  createDefaultValues,
  getNextAvailableSlot,
  validateSearchParams,
} from "@/lib/filters";
import { availableSeats } from "@/lib/filters";
import { FilterSearchParams } from "@/lib/types";
import { MeetingRoomList } from "@/components/meeting-room-list/meeting-room-list";
import { GetCitiesResponse } from "@/server/tec-api-types";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<FilterSearchParams>;
}) => {
  const headersList = await headers();
  // This is mock code demonstrating getting a city code based
  // on the user location
  const userCityCode = headersList.get("x-city-code") || "HKG";

  const params = await searchParams;

  const citiesResponse = await tecApi.call<GetCitiesResponse>(
    "/core-api/api/v1/cities?pageSize=100"
  );

  const cities = citiesResponse.items.map((city) => ({
    name: city.name,
    code: city.code,
    region: city.region.name.en,
  }));

  const nextAvailableSlot = getNextAvailableSlot();

  const extractedFilters = validateSearchParams(params, {
    nextAvailableSlot,
    cities,
    seats: availableSeats,
  });

  const defaultValues = createDefaultValues(nextAvailableSlot, userCityCode);

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
