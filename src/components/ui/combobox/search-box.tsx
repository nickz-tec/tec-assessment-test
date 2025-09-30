import {
  Icon,
  Input,
  InputGroup,
  ListCollection,
  Listbox,
} from "@chakra-ui/react";
import { ComboboxItem } from "./types";
import { SearchIcon } from "lucide-react";

export const SearchBox = ({
  value,
  collection,
  inputValue,
  onInputChange,
  onValueChange,
}: {
  value: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  collection: ListCollection<ComboboxItem>;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Listbox.Root
      collection={collection}
      overflow={"hidden"}
      borderRadius={"0"}
      gap="0"
      value={[value]}
      onValueChange={(e) => onValueChange(e.value[0])}
    >
      <InputGroup
        startElement={
          <Icon w="16px" h="16px" color="blue.500">
            <SearchIcon />
          </Icon>
        }
      >
        <Listbox.Input
          as={Input}
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          border="none"
          borderRadius="0px"
          borderBottom="1px solid"
          borderColor="border"
          outline="none"
          height="2.5rem"
          fontSize="1rem"
          color="fg"
          _placeholder={{
            color: "fg.subtle",
          }}
        />
      </InputGroup>

      <Listbox.Content
        animation={"unset"}
        border="none"
        boxShadow={"none"}
        borderRadius={"0px"}
        bg="white"
        p={0}
        gap={0}
      >
        <Listbox.Empty fontSize={"1rem"} color="fg" p={"1rem"}>
          No Matches Found
        </Listbox.Empty>
        {collection.group().map(([group, items]) => (
          <Listbox.ItemGroup key={group} id={group} margin={0}>
            <Listbox.ItemGroupLabel
              px="1rem"
              py="0.5rem"
              bg="gray.200"
              color="fg.subtle"
              textTransform="uppercase"
              md={{
                fontSize: "0.625rem",
                lineHeight: "1.5",
                fontWeight: 500,
              }}
            >
              {group}
            </Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item
                item={item}
                key={item.value}
                px="1rem"
                py="0.5rem"
                borderRadius={"0px"}
                lineHeight="1.75"
                fontSize={"0.875rem"}
                color="fg"
                _selected={{
                  bg: "blue.500",
                  color: "white",
                }}
                _highlighted={{
                  outline: "none",
                  bg: "blue.500",
                  color: "white",
                }}
                _hover={{
                  bg: "blue.500",
                  color: "white",
                }}
              >
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  );
};
