import { formatPrice } from "@/lib/money";
import { AmenitiesList } from "./amenities-list";
import {
  Box,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { DollarSignIcon, UsersIcon } from "lucide-react";
import { PhotoSwiper } from "./photo-swiper";

type Props = {
  roomName: string;
  photoUrls: string[];
  capacity: number;
  amenities: string[];
  floor: string;
  hourlyPrice: number;
  currencyCode: string;
};

export const MeetingRoomItem = ({
  roomName,
  photoUrls,
  capacity,
  amenities,
  floor,
  hourlyPrice,
  currencyCode,
}: Props) => {
  return (
    <SimpleGrid
      asChild
      columns={12}
      md={{
        gap: "1.25rem",
      }}
      py="1rem"
      _hover={{
        bg: "blue.5",
      }}
      css={{
        "& + &": {
          borderTop: "1px solid {colors.gray.200}",
        },
      }}
    >
      <a>
        <GridItem
          height={"230px"}
          colSpan={{
            md: 5,
            lg: 4,
          }}
        >
          <PhotoSwiper photoUrls={photoUrls} roomName={roomName} />
        </GridItem>

        <GridItem
          colSpan={{
            md: 7,
            lg: 8,
          }}
        >
          <Box>
            <Text fontWeight={700} fontSize="1.25rem" mb="8px">
              L{floor}, Room {roomName}
            </Text>
            <HStack lineHeight={"1.75"} mb="2px">
              <Icon color="fg.navy" w="18px">
                <UsersIcon />
              </Icon>
              <Text color="fg.muted">{capacity} Seats</Text>
            </HStack>
            <HStack>
              <Icon color="fg.navy" w="18px">
                <DollarSignIcon />
              </Icon>
              <Text color="fg.muted">
                {currencyCode} {formatPrice(hourlyPrice, currencyCode)} / hour
              </Text>
            </HStack>
            <Box mt="0.75rem">
              <AmenitiesList amenities={amenities} />
            </Box>
          </Box>
        </GridItem>
      </a>
    </SimpleGrid>
  );
};
