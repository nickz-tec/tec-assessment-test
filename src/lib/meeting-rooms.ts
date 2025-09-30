import { MeetingRoomDetails } from "./types";

export type MeetingRoomsByCentreGroup = Array<{
  groupId: string;
  centreGroup: MeetingRoomDetails["centreGroup"];
  rooms: MeetingRoomDetails[];
}>;

export const groupMeetingRoomsByCentre = (
  rooms: MeetingRoomDetails[]
): MeetingRoomsByCentreGroup => {
  const groups = new Map<string, MeetingRoomsByCentreGroup[number]>();

  rooms.forEach((room) => {
    const groupId = room.centreGroup.id;
    const existingGroup = groups.get(groupId);

    if (existingGroup) {
      existingGroup.rooms.push(room);
      return;
    }

    groups.set(groupId, {
      groupId,
      centreGroup: room.centreGroup,
      rooms: [room],
    });
  });

  return Array.from(groups.values());
};

export const getCentreAddress = (
  centreGroup: MeetingRoomDetails["centreGroup"]
) => {
  const addressTemplate = centreGroup.displayAddress.en;
  const addressLevel = centreGroup.addressLevel;

  return addressTemplate.replace("{LV}", addressLevel);
};

export const getCentreName = (
  centreGroup: MeetingRoomDetails["centreGroup"]
) => {
  return centreGroup.localizedName.en;
};

export const getCentrePhone = (
  centreGroup: MeetingRoomDetails["centreGroup"]
) => {
  return centreGroup.displayPhone;
};
