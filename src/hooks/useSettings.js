import { useState, useCallback } from "react";

const CONTINENTS = [
  { id: "Africa", name: "Africa" },
  { id: "Americas", name: "Americas" },
  { id: "Asia", name: "Asia" },
  { id: "Europe", name: "Europe" },
  { id: "Oceania", name: "Oceania" },
];

const DEFAULT_FLAG_COUNT = 5;
const MIN_FLAG_COUNT = 1;
const MAX_FLAG_COUNT = 20;

export function useSettings() {
  const [flagCountInput, setFlagCountInput] = useState(
    DEFAULT_FLAG_COUNT.toString()
  );
  const [selectedContinent, setSelectedContinent] = useState(null);

  const handleFlagCountChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 2);

    const formattedValue = value === "0" ? "0" : value.replace(/^0+/, "");

    setFlagCountInput(formattedValue || "");
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent === selectedContinent ? null : continent);
  };

  const getValidatedFlagCount = () => {
    const num = parseInt(flagCountInput) || DEFAULT_FLAG_COUNT;
    return Math.min(MAX_FLAG_COUNT, Math.max(MIN_FLAG_COUNT, num));
  };

  const resetSettings = useCallback(() => {
    setFlagCountInput(DEFAULT_FLAG_COUNT.toString());
    setSelectedContinent(null);
  }, []);

  return {
    flagCountInput,
    selectedContinent,
    handleFlagCountChange,
    handleContinentSelect,
    getValidatedFlagCount,
    resetSettings,
    continents: CONTINENTS,
    minFlagCount: MIN_FLAG_COUNT,
    maxFlagCount: MAX_FLAG_COUNT,
  };
}
