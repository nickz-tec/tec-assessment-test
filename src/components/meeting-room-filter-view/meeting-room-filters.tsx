"use client";

import { DatePicker } from "../ui/date-picker/date-picker";
import { Select } from "../ui/select";

import { Flex, Box } from "@chakra-ui/react";
import { Combobox } from "../ui/combobox";
import { FilterValues } from "@/lib/types";
import {
  createTimeString,
  generateTimeSlots,
  hasCutOffTimePassed,
} from "@/lib/filters";
import { seatsOptions } from "./seats-options";
import { isBefore, isAfter, set, startOfDay, addDays } from "date-fns";
import { MapPinIcon, UsersIcon } from "lucide-react";
import { Field } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

export const MeetingRoomFilters = ({
  nextAvailableSlot,
  values,
  cities,
  updateFilter,
}: {
  cities: {
    name: string;
    region: string;
    code: string;
  }[];
  nextAvailableSlot: Date;
  values: FilterValues;
  updateFilter: (setter: (old: FilterValues) => FilterValues) => void;
}) => {
  // Generate slots for the selected day while enforcing nextAvailableSlot as the earliest selectable time.
  const slots = generateTimeSlots(startOfDay(values.startDate), 30).filter(
    (time) => !isBefore(time, nextAvailableSlot)
  );

  const availableTimeSlots = slots.map((time) => ({
    label: createTimeString(time),
    value: time.toISOString(),
  }));

  const startTimeOptions = availableTimeSlots.slice(0, -1);

  const endTimeOptions = availableTimeSlots.map((time) => ({
    ...time,
    disabled: !isAfter(time.value, values.startDate),
  }));

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city.code,
    group: city.region,
  }));

  const handleStartTimeChange = (time: string) => {
    if (!isBefore(time, values.endDate)) {
      const nextSlotIndex = slots.findIndex((t) => isAfter(t, time));

      if (nextSlotIndex < slots.length) {
        updateFilter((old) => ({
          ...old,
          endDate: new Date(slots[nextSlotIndex]),
        }));
      }
    }

    updateFilter((old) => ({
      ...old,
      startDate: new Date(time),
    }));
  };

  const handleDayChange = (day: Date) => {
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();

    updateFilter((old) => ({
      ...old,
      startDate: set(old.startDate, {
        year,
        month,
        date,
      }),
      endDate: set(old.endDate, {
        year,
        month,
        date,
      }),
    }));
  };

  const handleEndTimeChange = (time: string) => {
    updateFilter((old) => ({
      ...old,
      endDate: new Date(time),
    }));
  };

  const handleSeatsChange = (seats: string) => {
    updateFilter((old) => ({
      ...old,
      seats: Number(seats),
    }));
  };

  const handleCityChange = (cityCode: string) => {
    updateFilter((old) => ({
      ...old,
      cityCode,
    }));
  };

  const handleVCChange = (isVC: boolean) => {
    updateFilter((old) => ({
      ...old,
      isVC,
    }));
  };

  const today = new Date();

  const disabledBefore = hasCutOffTimePassed(today)
    ? addDays(new Date(), 1)
    : today;

  return (
    <Box position={"sticky"} top={0} bg="white" pt="1.5rem" zIndex={100}>
      <Flex gap={2}>
        <Field label="Date">
          <DatePicker
            date={values.startDate}
            onSelect={handleDayChange}
            disabledBefore={disabledBefore}
          />
        </Field>

        <Field label="Start Time">
          <Select
            items={startTimeOptions}
            value={values.startDate.toISOString()}
            onValueChange={handleStartTimeChange}
            placeholder="Select time"
          />
        </Field>
        <Field label="End Time">
          <Select
            items={endTimeOptions}
            value={values.endDate.toISOString()}
            onValueChange={handleEndTimeChange}
            placeholder="Select time"
          />
        </Field>
        <Field label="Seats">
          <Select
            items={seatsOptions}
            value={values.seats.toString()}
            onValueChange={handleSeatsChange}
            placeholder="Select seats"
            icon={<UsersIcon />}
          />
        </Field>
        {/* TODO: Add fuzzy search */}

        <Field label="City">
          <Combobox
            items={cityOptions}
            value={values.cityCode}
            onValueChange={handleCityChange}
            placeholder="Select city"
            groupSort={(a, b) => a.localeCompare(b)}
            icon={<MapPinIcon />}
          />
        </Field>
      </Flex>
      <Checkbox
        label="Video Conference (Additional cost may apply)"
        checked={values.isVC}
        onCheckedChange={handleVCChange}
      />
    </Box>
  );
};
