export type FilterValues = {
  startDate: Date;
  endDate: Date;
  seats: number;
  cityCode: string;
  isVC: boolean;
};

export type FilterSearchParams = Record<
  "start_date" | "end_date" | "seats" | "city" | "is_vc",
  string
>;
