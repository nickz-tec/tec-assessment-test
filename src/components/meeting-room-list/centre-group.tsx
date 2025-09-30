import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { MapPinIcon } from "lucide-react";

export const CentreGroup = ({
  centreGroupName,
  address,
  phone,
  children,
}: {
  centreGroupName: string;
  address: string;
  phone: string;
  children: React.ReactNode;
}) => {
  return (
    <Box mt="1rem">
      <Box
        title={centreGroupName}
        bg="blue.5"
        py="0.5rem"
        md={{
          pl: "2rem",
          pr: "2rem",
          mx: "-2rem",
        }}
        lg={{
          mx: "0",
          pl: "1rem",
          pr: "1rem",
          mb: "0.75rem",
        }}
      >
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack>
            <Icon color="fg.navy" w="20px" h="20px">
              <MapPinIcon />
            </Icon>
            <Text fontWeight={600} color="fg.navy">
              {centreGroupName}
            </Text>
          </HStack>
          <Text asChild color="fg.blue" fontWeight={600}>
            <a href={`tel:${phone}`}>{phone}</a>
          </Text>
        </Flex>
        <Text color="fg.muted" fontSize="0.875rem">
          {address}
        </Text>
      </Box>

      <Box>{children}</Box>
    </Box>
  );
};
