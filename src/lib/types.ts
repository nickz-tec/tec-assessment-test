import {
  GetCentresResponse,
  GetMeetingRoomsResponse,
  GetPricingsResponse,
  GetRoomAvailabilitiesResponse,
} from "@/server/tec-api-types";

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

export type MeetingRoomDetails = {
  details: GetMeetingRoomsResponse["items"][number];
  availability: GetRoomAvailabilitiesResponse[number];
  price: GetPricingsResponse[number];
  centreGroup: GetCentresResponse[number];
};
