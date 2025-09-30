import { Spinner, Box } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py="3rem">
      <Spinner color="fg.navy" size={"lg"} />
    </Box>
  );
};
