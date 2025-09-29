"use client";

import { useEffect, useState } from "react";
import { DatePicker } from "../ui/date-picker/date-picker";
import { Select } from "../ui/select";
import {
  generateTimeStrings,
  createTimeString,
  isBefore,
  isAfter,
} from "@/lib/utils/time-string";
import { Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import { Combobox, ComboboxItem } from "../ui/combobox";
import { FilterValues } from "@/lib/types";
import { seatsOptions } from "./seats-options";

export const MeetingRoomFilters = ({
  nextAvailableSlot,
  initialValue,
  cities,
}: {
  nextAvailableSlot: Date;
  cities: ComboboxItem[];
  initialValue: FilterValues;
}) => {
  const [day, setDay] = useState(initialValue.startDate);
  const [startTime, setStartTime] = useState(
    createTimeString(initialValue.startDate)
  );
  const [endTime, setEndTime] = useState(
    createTimeString(initialValue.endDate)
  );

  const [seats, setSeats] = useState(initialValue.seats.toString());
  const [city, setCity] = useState(initialValue.city);

  const timeStrings = generateTimeStrings(nextAvailableSlot, 30);

  const availableTimeSlots = timeStrings.map((time) => ({
    label: time,
    value: time,
  }));

  const startTimeOptions = availableTimeSlots.slice(0, -1);

  const endTimeOptions = availableTimeSlots.map((time) => ({
    ...time,
    disabled: isBefore(time.value, startTime),
  }));

  useEffect(() => {
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");
    const startDate = new Date(day).setHours(
      Number(startHour),
      Number(startMinute)
    );
    const endDate = new Date(day).setHours(Number(endHour), Number(endMinute));

    const newParams = new URLSearchParams();
    newParams.set("start_date", format(startDate, "yyyy-MM-dd'T'HH:mm:ss"));
    newParams.set("end_date", format(endDate, "yyyy-MM-dd'T'HH:mm:ss"));
    newParams.set("seats", seats);
    newParams.set("city", city);
    window.history.replaceState({}, "", `/?${newParams.toString()}`);
  }, [day, startTime, endTime, seats, city]);

  const handleStartTimeChange = (time: string) => {
    if (isAfter(time, endTime)) {
      const currentIndex = timeStrings.findIndex((t) => t === time);
      const nextSlotIndex = currentIndex + 1;

      // Ensure we don't go past the last available time slot.
      if (nextSlotIndex < timeStrings.length) {
        setEndTime(timeStrings[nextSlotIndex]);
      }
    }

    setStartTime(time);
  };

  return (
    <Flex gap={2}>
      <DatePicker date={day} onSelect={setDay} />
      <Select
        items={startTimeOptions}
        value={startTime}
        onValueChange={handleStartTimeChange}
        placeholder="Select time"
      />
      <Select
        items={endTimeOptions}
        value={endTime}
        onValueChange={setEndTime}
        placeholder="Select time"
      />
      <Select
        items={seatsOptions}
        value={seats}
        onValueChange={setSeats}
        placeholder="Select seats"
      />
      {/* TODO: Add fuzzy search */}
      <Combobox
        items={cities}
        value={city}
        onValueChange={setCity}
        placeholder="Select city"
        groupSort={(a, b) => a.localeCompare(b)}
      />
    </Flex>
  );
};
