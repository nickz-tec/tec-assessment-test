import {
  roundToNearestMinutes,
  isAfter,
  addHours,
  set,
  addDays,
  parseISO,
  isValid,
  isBefore,
  format,
  isSameDay,
} from "date-fns";

import { FilterValues, FilterSearchParams } from "./types";

const CUTOFF_HOUR = 18; // 6pm
export const availableSeats = ["1", "5", "9", "13", "17"];

export const generateTimeSlots = (start: Date, interval: number): Date[] => {
  const slots: Date[] = [];
  const current = new Date(start);

  while (isSameDay(current, start)) {
    slots.push(new Date(current));
    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
};

export const getNextAvailableSlot = () => {
  const now = new Date();
  let startDate = roundToNearestMinutes(addHours(now, 1), {
    nearestTo: 30,
    roundingMethod: "ceil",
  });

  if (hasCutOffTimePassed(startDate)) {
    const tomorrow = addDays(startDate, 1);
    startDate = set(tomorrow, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  }

  return startDate;
};

const hasCutOffTimePassed = (date: Date): boolean => {
  const cutoffTime = set(new Date(), {
    hours: CUTOFF_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  return isAfter(date, cutoffTime);
};

export const validateSearchParams = (
  params: Partial<FilterSearchParams>,
  {
    nextAvailableSlot,
    cities,
    seats,
  }: {
    nextAvailableSlot: Date;
    seats: string[];
    cities: string[];
  }
) => {
  const v: Partial<FilterValues> = {};

  const rawStart = params.start_date ? parseISO(params.start_date) : null;
  const rawEnd = params.end_date ? parseISO(params.end_date) : null;

  const startDate = rawStart && isValid(rawStart) ? rawStart : null;
  const endDate = rawEnd && isValid(rawEnd) ? rawEnd : null;

  if (
    startDate &&
    endDate &&
    !isBefore(startDate, nextAvailableSlot) &&
    isAfter(endDate, startDate)
  ) {
    v.startDate = startDate;
    v.endDate = endDate;
  }

  if (params.seats && seats.includes(params.seats)) {
    v.seats = Number(params.seats);
  }

  if (params.city && cities.includes(params.city)) {
    v.city = params.city;
  }

  return v;
};

export const createFilterDateString = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export const createTimeString = (date: string | Date): string => {
  return format(date, "HH:mm");
};
