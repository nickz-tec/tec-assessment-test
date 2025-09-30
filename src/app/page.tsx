import { Box, Container, GridItem, SimpleGrid } from "@chakra-ui/react";
import { headers } from "next/headers";
import Image from "next/image";
import tecApi from "@/server/tec-api-client";
import {
  createDefaultValues,
  getNextAvailableSlot,
  validateSearchParams,
} from "@/lib/filters";
import { availableSeats } from "@/lib/filters";
import { FilterSearchParams } from "@/lib/types";
import { MeetingRoomFilterView } from "@/components/meeting-room-filter-view";
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
    <Container px="2rem" maxW="1440px" pb="4rem">
      <SimpleGrid
        columns={{ base: 1, lg: 12 }}
        gap="1.25rem"
        alignItems="start"
      >
        <GridItem pt="1.5rem" colSpan={{ base: 1, lg: 8, xl: 7 }}>
          <MeetingRoomFilterView
            cities={cities}
            nextAvailableSlot={nextAvailableSlot}
            initialValue={{
              ...defaultValues,
              ...extractedFilters,
            }}
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 1, lg: 4, xl: 5 }}
          position="sticky"
          top="0px"
        >
          <Box position="relative" h="100vh">
            <Image
              src="/map-placeholder.png"
              alt="Map placeholder"
              fill
              style={{ objectFit: "cover" }}
              sizes="(min-width: 62em) 33vw, 100vw"
              priority
            />
          </Box>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
