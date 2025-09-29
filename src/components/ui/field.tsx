import { Field as $Field } from "@chakra-ui/react";

export const Field = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <$Field.Root
      _hover={{
        "& > label": {
          color: "blue.500",
        },
      }}
    >
      <$Field.Label
        fontSize="0.75rem"
        fontWeight="500"
        color="gray.500"
        position="absolute"
        transform="translateY(-50%)"
        bg="white"
        zIndex="1"
        px="0.25rem"
        left="0.75rem"
        pointerEvents="none"
        transition="all 0.1s ease-in-out"
      >
        {label}
      </$Field.Label>
      {children}
    </$Field.Root>
  );
};
