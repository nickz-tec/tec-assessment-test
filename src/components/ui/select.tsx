"use client";

import {
  Select as $Select,
  createListCollection,
  Portal,
} from "@chakra-ui/react";
import { ClockIcon } from "lucide-react";

import { DropdownTrigger } from "./dropdown-trigger";

export type SelectItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export function Select({ items }: { items: SelectItem[] }) {
  const collection = createListCollection({ items });

  return (
    <$Select.Root collection={collection}>
      <$Select.HiddenSelect />
      <$Select.Control>
        <$Select.Context>
          {(select) => (
            <$Select.Trigger width={"320px"} asChild>
              <DropdownTrigger isOpen={select.open} icon={<ClockIcon />}>
                <$Select.ValueText
                  placeholder="Select time"
                  _placeholder={{
                    color: "fg.subtle",
                  }}
                />
              </DropdownTrigger>
            </$Select.Trigger>
          )}
        </$Select.Context>
      </$Select.Control>
      <Portal>
        <$Select.Positioner>
          <$Select.Content
            borderRadius={"2px"}
            p={0}
            boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
            border="1px solid"
            borderColor="border"
          >
            {collection.items.map((item) => (
              <$Select.Item
                key={item.value}
                item={item}
                px="1rem"
                py="0.5rem"
                lineHeight="1.75"
                fontSize="0.875rem"
                borderRadius="0"
                _disabled={{
                  opacity: 1,
                  bg: "gray.200",
                  color: "gray.400",
                }}
                _highlighted={{
                  bg: "blue.500",
                  color: "white",
                }}
                _hover={{
                  bg: "blue.500",
                  color: "white",
                }}
              >
                {item.label}
              </$Select.Item>
            ))}
          </$Select.Content>
        </$Select.Positioner>
      </Portal>
    </$Select.Root>
  );
}
