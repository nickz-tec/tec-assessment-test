import { Text, Box } from "@chakra-ui/react";

export const EmptyState = () => {
  return (
    <Box py="16rem">
      <Text
        fontSize="1.5rem"
        color="fg.navy"
        fontWeight={700}
        textAlign="center"
      >
        No Matches Found
      </Text>
      <Text textAlign="center" mt={1}>
        Apologies, we can&apos;t find what you&apos;re looking for. Please
        adjust your search criteria and try again.
      </Text>
    </Box>
  );
};
