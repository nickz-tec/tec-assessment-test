import { addMinutes, format, isSameDay } from "date-fns";

export const createTimeString = (date: string | Date): string => {
  return format(date, "HH:mm");
};

export const generateTimeStrings = (date: Date, interval: number): string[] => {
  if (interval <= 0) {
    return [];
  }

  const timeStrings: string[] = [];
  let currentTime = new Date(date);

  while (isSameDay(currentTime, date)) {
    const timeString = format(currentTime, "HH:mm");
    timeStrings.push(timeString);

    const nextTime = addMinutes(currentTime, interval);

    if (!isSameDay(nextTime, date)) {
      break;
    }

    currentTime = nextTime;
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
