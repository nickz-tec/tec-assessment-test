import { createFilterCityString, createFilterDateString } from "@/lib/filters";
import { FilterValues } from "@/lib/types";
import { useEffect, useRef } from "react";

export const useSyncSearchParams = (
  filterValues: FilterValues,
  cities: {
    name: string;
    region: string;
    code: string;
  }[]
) => {
  // Ref used to lookup city by code
  const citiesLookupRef = useRef(cities);
  citiesLookupRef.current = cities;

  useEffect(() => {
    const city = citiesLookupRef.current.find(
      (city) => city.code === filterValues.cityCode
    );

    const urlParams = new URLSearchParams({
      start_date: createFilterDateString(filterValues.startDate),
      end_date: createFilterDateString(filterValues.endDate),
      seats: filterValues.seats.toString(),
    });

    if (city) {
      urlParams.set("city", createFilterCityString(city.name));
    } else {
      console.error(
        `Unexpected error: City name for code: ${filterValues.cityCode} not found`
      );
    }

    if (filterValues.isVC) {
      urlParams.set("is_vc", "true");
    }

    window.history.replaceState({}, "", `/?${urlParams.toString()}`);
  }, [filterValues]);

  return null;
};
