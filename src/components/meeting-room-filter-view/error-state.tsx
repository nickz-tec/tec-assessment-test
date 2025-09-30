import { Box, Text } from "@chakra-ui/react";

export const ErrorState = () => {
  return (
    <Box py="16rem">
      <Text
        fontSize="1.5rem"
        color="fg.navy"
        fontWeight={700}
        textAlign="center"
      >
        Something Went Wrong
      </Text>
      <Text textAlign="center" mt={1}>
        We couldn&apos;t load meeting rooms right now. Please adjust your search
        or try again in a moment.
      </Text>
    </Box>
  );
};
