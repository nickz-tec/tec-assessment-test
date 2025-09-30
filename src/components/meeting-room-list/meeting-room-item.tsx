import { formatPrice } from "@/lib/money";
import { AmenitiesList } from "./amenities-list";
import {
  Box,
  Button,
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
      position="relative"
      columns={{
        base: 1,
        md: 12,
      }}
      border={{
        base: "1px solid",
        md: "none",
      }}
      borderColor={{
        base: "gray.200",
        md: "transparent",
      }}
      rowGap={{
        base: "1rem",
        md: "0",
      }}
      bg={{
        base: "gray.50",
        md: "white",
      }}
      md={{
        gap: "1.25rem",
      }}
      mt={{
        base: "1rem",
        md: "0",
      }}
      mb={{
        base: "0.5rem",
        md: "0",
      }}
      py={{
        base: "0",
        md: "1rem",
      }}
      _hover={{
        bg: "blue.5",
        "& #select-button": {
          opacity: 1,
        },
      }}
      css={{
        "& + &": {
          borderTop: "1px solid {colors.gray.200}",
        },
      }}
    >
      <GridItem
        height={{
          base: "200px",
          md: "230px",
        }}
        colSpan={{
          base: 1,
          md: 4,
          lg: 5,
        }}
      >
        <PhotoSwiper photoUrls={photoUrls} roomName={roomName} />
      </GridItem>

      <GridItem
        colSpan={{
          base: 1,
          md: 8,
          lg: 7,
        }}
        p={{
          base: "0px 1rem 1rem",
          md: "0",
        }}
      >
        <Text fontWeight={700} fontSize="1.25rem" mb="8px">
          L{floor}, Room {roomName}
        </Text>
        <HStack
          lineHeight={"1.75"}
          mb={{
            base: "0.25rem",
            md: "2px",
          }}
        >
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
        <Box
          mt="0.75rem"
          display={{
            base: "none",
            md: "block",
          }}
        >
          <AmenitiesList amenities={amenities} />
        </Box>
      </GridItem>
      <Button
        id="select-button"
        position={"absolute"}
        size="lg"
        px="1.5rem"
        borderRadius={"0px"}
        bg="navy.500"
        right={4}
        bottom={4}
        zIndex={100}
        opacity={0}
        transition={"opacity 0.1s ease-in-out"}
      >
        Select
      </Button>
    </SimpleGrid>
  );
};
