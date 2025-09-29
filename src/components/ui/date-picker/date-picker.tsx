"use client";

import { Popover, Portal, Span } from "@chakra-ui/react";

import { Calendar } from "./calendar";

import { format } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { DropdownTrigger } from "../dropdown-trigger";

export const DatePicker = ({
  date,
  onSelect,
  disabledBefore,
}: {
  date: Date;
  onSelect: (date: Date) => void;
  disabledBefore: Date;
}) => {
  const [open, setOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    onSelect(date);
    setOpen(false);
  };

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{
        sameWidth: true,
        placement: "bottom-start",
      }}
    >
      <Popover.Trigger asChild>
        <DropdownTrigger isOpen={open} w={"200px"} icon={<CalendarIcon />}>
          {date ? (
            format(date, "yyyy-MM-dd")
          ) : (
            <Span color="fg.subtle">Select date</Span>
          )}
        </DropdownTrigger>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="100%"
            minWidth="250px"
            borderRadius=".125rem"
            border="1px solid"
            borderColor="border"
            pt="1rem"
            pl="1rem"
            pr="1rem"
            boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
            md={{
              pl: "0.75rem",
              pr: "0.75rem",
            }}
          >
            <Calendar
              selected={date}
              onSelect={handleDateChange}
              disabledBefore={disabledBefore}
            />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
