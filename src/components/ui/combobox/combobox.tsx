"use client";

import { useState } from "react";
import {
  Popover,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";

import { DropdownTrigger } from "../dropdown-trigger";
import { SearchBox } from "./search-box";
import { ComboboxItem } from "./types";

export const Combobox = ({
  items,
  value,
  onValueChange,
  placeholder,
  groupSort,
  icon,
}: {
  items: ComboboxItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  groupSort?: (a: string, b: string) => number;
  icon?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
    groupBy: (item) => item.group,
    groupSort,
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
        <DropdownTrigger isOpen={open} w={"100%"} icon={icon}>
          {selectedItem?.label || placeholder}
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
                onValueChange(value);
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
