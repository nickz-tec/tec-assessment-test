import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { CheckIcon } from "lucide-react";

type Props = {
  amenities: string[];
};

export const AmenitiesList = ({ amenities }: Props) => {
  if (!amenities?.length) {
    return null;
  }

  const displayedAmenities = amenities.slice(0, 4);

  return (
    <Stack gap={"4px"}>
      {displayedAmenities.map((amenity) => (
        <HStack key={amenity} lineHeight={"1.75"}>
          <Icon color="gold.500" w="18px" h="18px">
            <CheckIcon />
          </Icon>
          <Text fontSize="0.875rem">{amenity}</Text>
        </HStack>
      ))}
    </Stack>
  );
};
