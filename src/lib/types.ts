export type FilterValues = {
  startDate: Date;
  endDate: Date;
  seats: number;
  city: string;
};

export type FilterSearchParams = Record<
  "start_date" | "end_date" | "seats" | "city",
  string
>;
