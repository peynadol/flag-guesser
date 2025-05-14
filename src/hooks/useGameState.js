import { useState, useEffect } from "react";
import arrayShuffle from "array-shuffle";

export function useGameState(allCountries) {
  const [gamePhase, setGamePhase] = useState("settings");
  const [gameRoundCountries, setGameRoundCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [previousCountryIndex, setPreviousCountryIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (gamePhase !== "settings" && allCountries.length === 0) {
      setGamePhase("settings");
    }
  }, [allCountries, gamePhase]);

  const startNewGame = (flagCount, selectedContinent) => {
    setIncorrectAnswers([]);
    setCorrectCount(0);
    setCurrentCountryIndex(0);

    const filteredCountries = selectedContinent
      ? allCountries.filter((c) => c.region === selectedContinent)
      : allCountries;

    if (filteredCountries.length === 0) {
      console.warn("No countries match the selected filter");
      return false;
    }

    const actualFlagCount = Math.min(flagCount, filteredCountries.length);

    const selectedCountries = arrayShuffle(filteredCountries).slice(
      0,
      actualFlagCount
    );

    setGameRoundCountries(selectedCountries);
    return true;
  };

  const resetGame = () => {
    setIncorrectAnswers([]);
    setCurrentCountryIndex(0);
    setCorrectCount(0);
    setGamePhase("settings");
  };

  const checkCorrect = (guess, index) => {
    if (!guess || !gameRoundCountries[index]) return false;

    const countryToCheck = gameRoundCountries[index];
    const normalizedGuess = guess.toLowerCase().trim();

    const possibleNames = [
      countryToCheck.name.common.toLowerCase(),
      countryToCheck.name.official.toLowerCase(),
    ];

    if (countryToCheck.altSpellings) {
      possibleNames.push(
        ...countryToCheck.altSpellings.map((name) => name.toLowerCase())
      );
    }

    return possibleNames.some((name) => name === normalizedGuess);
  };

  const submitGuess = (guess) => {
    if (gamePhase !== "playing" || !guess) return;

    const isCorrect = checkCorrect(guess, currentCountryIndex);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          country: gameRoundCountries[currentCountryIndex],
          userGuess: guess,
        },
      ]);
    }

    setPreviousCountryIndex(currentCountryIndex);

    if (currentCountryIndex >= gameRoundCountries.length - 1) {
      setGamePhase("complete");
    } else {
      setCurrentCountryIndex((prev) => prev + 1);
    }
  };

  return {
    gamePhase,
    setGamePhase,
    gameRoundCountries,
    currentCountryIndex,
    previousCountryIndex,
    correctCount,
    incorrectAnswers,
    startNewGame,
    resetGame,
    checkCorrect,
    submitGuess,
  };
}
