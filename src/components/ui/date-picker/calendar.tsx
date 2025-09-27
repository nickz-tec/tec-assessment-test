"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleSmall,
} from "lucide-react";
import { YearPicker } from "./year-picker";

import { addMonths, format, setYear, subMonths } from "date-fns";

import "react-day-picker/style.css";
import "./calendar.css";

type Props = {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
};

export function Calendar({ selected, onSelect }: Props) {
  const [month, setMonth] = useState<Date>(new Date());
  const [selectingYear, setSelectingYear] = useState(false);

  const today = new Date();

  const handleSelectYear = (year: number) => {
    setMonth(setYear(month, year));
    setSelectingYear(false);
  };

  return (
    <Box>
      <Flex>
        <Button
          variant={"ghost"}
          onClick={() => setSelectingYear((t) => !t)}
          p="4px 8px"
          size={"xs"}
          fontSize={"14px"}
          fontWeight={400}
          borderRadius={"2px"}
          _hover={{
            bg: "gray.100",
          }}
        >
          {format(month ?? new Date(), "MMM yyyy")}

          <Icon>
            <ChevronDownIcon />
          </Icon>
        </Button>

        {!selectingYear && (
          <Flex ml="auto" gap={0} alignItems={"center"}>
            <IconButton
              borderRadius={"2px"}
              size={"xs"}
              variant={"ghost"}
              onClick={() => setMonth((t) => subMonths(t, 1))}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              borderRadius={"2px"}
              variant={"ghost"}
              onClick={() => setMonth(today)}
              size={"xs"}
            >
              <Icon fill="gray.600">
                <CircleSmall />
              </Icon>
            </IconButton>
            <IconButton
              borderRadius={"2px"}
              size={"xs"}
              variant={"ghost"}
              onClick={() => setMonth((t) => addMonths(t, 1))}
            >
              <ChevronRightIcon />
            </IconButton>
          </Flex>
        )}
      </Flex>
      {selectingYear ? (
        <YearPicker
          selectedYear={month.getFullYear()}
          onSelectYear={handleSelectYear}
          startYear={1900}
          endYear={2099}
          currentYear={new Date().getFullYear()}
        />
      ) : (
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          disabled={{
            before: today,
          }}
          required
          mode="single"
          selected={selected}
          onSelect={onSelect}
          formatters={{
            formatWeekdayName: (props) => {
              return format(props, "EEEEE");
            },
          }}
          components={{
            MonthCaption: () => <></>,
          }}
          hideNavigation
        />
      )}
    </Box>
  );
}
