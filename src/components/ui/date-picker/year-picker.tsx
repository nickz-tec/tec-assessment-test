import { Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { ScrollContainer } from "./scroll-container";

type Props = {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  startYear: number;
  endYear: number;
  currentYear: number;
};

export function YearPicker({
  onSelectYear,
  selectedYear,
  startYear,
  endYear,
  currentYear,
}: Props) {
  const selectedYearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, []);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <ScrollContainer maxHeight="240px">
      <SimpleGrid columns={4} gap={2} mt={4}>
        {years.map((year) => (
          <Button
            key={year}
            ref={year === selectedYear ? selectedYearRef : null}
            borderRadius={"full"}
            size="xs"
            variant={year === selectedYear ? "solid" : "ghost"}
            bg={year === selectedYear ? "navy.500" : undefined}
            onClick={() => onSelectYear(year)}
            disabled={year < currentYear}
            fontSize={"14px"}
            fontWeight={400}
          >
            {year}
          </Button>
        ))}
      </SimpleGrid>
    </ScrollContainer>
  );
}
