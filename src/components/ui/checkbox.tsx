import { Checkbox as $Checkbox } from "@chakra-ui/react";

export const Checkbox = ({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <$Checkbox.Root
      checked={checked}
      onCheckedChange={(e) => onCheckedChange(!!e.checked)}
      gap={2}
    >
      <$Checkbox.HiddenInput />
      <$Checkbox.Control
        w="18px"
        h="18px"
        borderColor={"gray.400"}
        _checked={{
          bg: "blue.500",
          borderColor: "blue.500",
        }}
      />
      <$Checkbox.Label
        fontSize="1rem"
        fontWeight={400}
        color="fg.subtle"
        lineHeight="1.75"
        md={{
          fontSize: "0.875rem",
        }}
      >
        {label}
      </$Checkbox.Label>
    </$Checkbox.Root>
  );
};
