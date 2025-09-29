export type GetCitiesResponse = {
  items: {
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
  }[];
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
};

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
