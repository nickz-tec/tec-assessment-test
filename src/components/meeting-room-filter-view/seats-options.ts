import { SelectItem } from "../ui/select";
import { availableSeats } from "@/lib/filters";

export const seatsOptions: SelectItem[] = availableSeats.map((seat, index) => {
  const s = Number(seat);
  const isLast = index === availableSeats.length - 1;

  return {
    label: !isLast ? `${s}-${s + 3} Seats` : `${s}+ Seats`,
    value: seat,
  };
});
