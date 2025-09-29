export type PaginatedResponse<T> = {
  items: T[];
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export type GetCitiesResponse = PaginatedResponse<{
  cityId: number;
  countryId: number;
  code: string;
  name: string;
  timeZone: {
    displayName: string;
    standardName: string;
    baseUtcOffset: string;
  };
  isActive: boolean;
  accountEmail: string;
  currencyIsoCode: string;
  generalEmail: string;
  generalPhone: string;
  meEmail: string;
  nameTranslation: {
    en: string;
    jp: string;
    kr: string;
    zhHans: string;
    zhHant: string;
  };
  paymentGateway: string;
  paymentMethod: string;
  sequence: number;
  voCwEmail: string;
  bdGroupEmail: string;
  region: {
    id: string;
    name: {
      en: string;
      jp: string;
      kr: string;
      zhHans: string;
      zhHant: string;
    };
  };
}>;

export type GetRoomAvailabilitiesParams = {
  startDate: string;
  endDate: string;
  cityCode: string;
};

export type GetRoomAvailabilitiesResponse = {
  roomCode: string;
  isAvailable: boolean;
  isWithinOfficeHour: boolean;
  isPast: boolean;
  nextAvailabilities: unknown[];
}[];

export type GetMeetingRoomsResponse = PaginatedResponse<{
  centreCode: string;
  roomCode: string;
  roomName: string;
  floor: string;
  capacity: number;
  hasVideoConference: boolean;
  amenities: string[];
  photoUrls: string[];
  isBookable: boolean;
  isFromNewObs: boolean;
  isClosed: boolean;
  isInternal: boolean;
  terms: {
    languageCode: string;
    value: string;
  }[];
}>;

export type GetPricingsResponse = {
  roomCode: string;
  bestPricingStrategyName: string;
  initialPrice: number;
  finalPrice: number;
  currencyCode: string;
  isPackageApplicable: boolean;
}[];

export type GetCentresResponse = {
  id: string;
  amenities: {
    access247: boolean;
    adjustableStandingDesks: boolean;
    auditorium: boolean;
    collaborativeOpenSpaces: boolean;
    complimentaryRefreshments: boolean;
    coworkingFloor: boolean;
    dedicatedDesks: boolean;
    eventSpaceFloor: boolean;
    expertItSupportAndInfrastructure: boolean;
    fitnessCentreIncludingShowerRoom: boolean;
    fitnessSuiteOwnByTecInsideCentre: boolean;
    freshCoffeeByProfessionalBarista: boolean;
    fullServiceOperationalSupport: boolean;
    limoServicesFromAirportExpress: boolean;
    membersLounge: boolean;
    modbar: boolean;
    mothersRoom: boolean;
    outdoorBalcony: boolean;
    phoneBooths: boolean;
    secureKeylessLockingSystem: boolean;
    selfCheckInLockers: boolean;
    stateOfTheArtConnectivity: boolean;
    twoConnectingFloorsInternalStair: boolean;
    chauffeurServices: boolean;
    housekeepingServices: boolean;
    communityNetworkingEvents: boolean;
    miniDataCentres: boolean;
    prayerRooms: boolean;
    functionRooms: boolean;
  };
  country: string;
  centreCodesForVoCwCheckout: string[];
  centreHighlights: {
    en: string;
    jp: string | null;
    kr: string | null;
    zhHans: string | null;
    zhHant: string | null;
  };
  cityId: string;
  citySlug: string;
  cityCode: string;
  displayEmail: string;
  displayPhone: string;
  centreSchedule: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday: { start: string | null; end: string | null };
    sunday: { start: string | null; end: string | null };
  };
  grossSizeSqFt: number | null;
  isDeleted: boolean;
  centreTrafficInfo: {
    en: string;
    jp: string;
    kr: string;
    zhHans: string;
    zhHant: string;
  };
  displayAddress: {
    en: string;
    jp: string | null;
    kr: string | null;
    zhHans: string | null;
    zhHant: string | null;
  };
  addressLevel: string;
  localizedName: {
    en: string;
    jp: string | null;
    kr: string | null;
    zhHans: string | null;
    zhHant: string | null;
  };
  mapboxCoordinates: {
    latitude: number;
    longitude: number;
  };
  slug: string;
  netSizeSqFt: number;
  noOfFloors: number;
  noOfMeetingRoom: number;
  sequence: {
    default: string;
    cw: string | null;
    es: string | null;
    mr: string | null;
    product: string | null;
    so: string | null;
    vo: string | null;
  };
  status: string;
  tecTacCodeMappingForMtCore: string[];
  vrTourLink: string;
  zipCode: string;
  newCentreCodesForMtCore: string[];
  newCentreCodesForVoCwCheckout: string[];
  languageCode: string | null;
  chinaCoordinates: {
    latitude: number;
    longitude: number;
  };
  displayAddressWithLevel: {
    en: string;
    jp: string;
    kr: string;
    zhHans: string;
    zhHant: string;
  };
  netSizeSqM: number;
}[];
