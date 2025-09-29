import { addMinutes, format, startOfDay } from "date-fns";

export const createTimeString = (date: string | Date): string => {
  return format(date, "HH:mm");
};

export const generateTimeStrings = (interval: number): string[] => {
  const timeStrings: string[] = [];
  const slots = (24 * 60) / interval;
  let currentTime = startOfDay(new Date());

  if (interval <= 0) {
    // Prevent infinite loops with an edge case guard
    return [];
  }

  for (let i = 0; i < slots; i++) {
    const timeString = format(currentTime, "HH:mm");
    timeStrings.push(timeString);
    currentTime = addMinutes(currentTime, interval);
  }

  return timeStrings;
};

export const timeStringToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return 0;
  }
  return hours * 60 + minutes;
};

export const isBefore = (time1: string, time2: string): boolean => {
  return timeStringToMinutes(time1) <= timeStringToMinutes(time2);
};

export const isAfter = (time1: string, time2: string): boolean => {
  return timeStringToMinutes(time1) >= timeStringToMinutes(time2);
};
