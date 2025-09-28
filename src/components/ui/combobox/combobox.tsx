"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Popover,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";

import { DropdownTrigger } from "../dropdown-trigger";
import { SearchBox } from "./search-box";
import { ComboboxItem } from "./types";

export const Combobox = ({ items }: { items: ComboboxItem[] }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<string>();

  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
    groupBy: (item) => item.group,
  });

  const selectedItem = items.find((item) => item.value === value);

  return (
    <Popover.Root
      unmountOnExit
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      onExitComplete={() => {
        setInputValue("");
        filter("");
      }}
      positioning={{
        sameWidth: true,
        placement: "bottom-start",
      }}
    >
      <Popover.Trigger asChild>
        <DropdownTrigger isOpen={open} w={"200px"} icon={<SearchIcon />}>
          {selectedItem?.label || "Select item"}
        </DropdownTrigger>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="100%"
            borderRadius={"0"}
            boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
            border="1px solid"
            borderColor="border"
          >
            <SearchBox
              collection={collection}
              inputValue={inputValue}
              onValueChange={(value) => {
                setValue(value);
                setOpen(false);
                filter("");
              }}
              onInputChange={(value) => {
                setInputValue(value);
                filter(value);
              }}
            />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
