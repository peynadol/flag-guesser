import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";

import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";
import AnswerCounter from "./AnswerCounter";
import RoundComplete from "./RoundComplete";
import GameSettings from "./GameSettings";

const BASE_URL = "https://flag-proxy.vercel.app/api/countries"

function App() {
  const [gamePhase, setGamePhase] = useState("settings"); // can be settings, playing, complete
  const [allCountries, setAllCountries] = useState([]);
  const [gameRoundCountries, setGameRoundCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [previousCountryIndex, setPreviousCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [flagCountInput, setFlagCountInput] = useState("5");
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch(`{${BASE_URL}}`)
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllCountries(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setAllCountries([]);
      }
    };
    getAllCountries();
  }, []);

  const handleGuessInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    setPreviousCountryIndex(currentCountryIndex);
    const isCorrect = checkCorrect(inputValue, currentCountryIndex);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          country: gameRoundCountries[currentCountryIndex],
          userGuess: inputValue,
        },
      ]);
    }

    setUserGuess(inputValue);
    setInputValue("");

    if (currentCountryIndex >= gameRoundCountries.length - 1) {
      setGamePhase("complete");
    } else {
      setCurrentCountryIndex((prev) => prev + 1);
    }
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();
    let num = parseInt(flagCountInput) || 5;
    if (num < 1) num = 1;
    if (num > 20) num = 20;

    startNewGame(num);
    setGamePhase("playing");
  };

  const handleFlagCountChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setFlagCountInput(value || "5");
  };

  const checkCorrect = (guess, index) => {
    if (!guess || !gameRoundCountries[index]) return false;
    const names = [
      gameRoundCountries[index].name.common.toLowerCase(),
      gameRoundCountries[index].name.official.toLowerCase(),
    ];

    return names.includes(guess.toLowerCase().trim());
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent); // "Europe" or null
  };

  const startNewGame = (flagCount) => {
    setIncorrectAnswers([]);
    const filteredCountries = selectedContinent
      ? allCountries.filter((c) => c.region === selectedContinent)
      : allCountries;

    const selectedCountries = arrayShuffle(filteredCountries).slice(
      0,
      flagCount
    );

    setGameRoundCountries(selectedCountries);
    setCurrentCountryIndex(0);
    setCorrectCount(0);
    setUserGuess("");
    setInputValue("");
  };

  const resetGame = () => {
    setIncorrectAnswers([]);
    setGamePhase("settings");
  };

  return (
    <>
      {gamePhase === "settings" ? (
        <GameSettings
          onStart={startNewGame}
          isLoading={allCountries.length === 0}
          onSubmit={handleSettingsSubmit}
          onChange={handleFlagCountChange}
          currentContinent={selectedContinent}
          onSelect={handleContinentSelect}
        />
      ) : gamePhase === "complete" ? (
        <RoundComplete
          onReset={resetGame}
          incorrectAnswers={incorrectAnswers}
          score={`${correctCount}/${gameRoundCountries.length}`}
          correctCount={correctCount}
          totalQuestions={gameRoundCountries.length}
        />
      ) : (
        <>
          {gameRoundCountries[currentCountryIndex] && (
            <>
              <FlagCard flag={gameRoundCountries[currentCountryIndex].flags} />
              <GuessInput
                value={inputValue}
                onChange={handleGuessInputChange}
                onSubmit={handleGuessSubmit}
              />
            </>
          )}
          {userGuess && (
            <p>
              {checkCorrect(userGuess, previousCountryIndex)
                ? "Correct"
                : "Incorrect"}
            </p>
          )}
          <AnswerCounter
            questionNumber={currentCountryIndex + 1}
            questionAmount={gameRoundCountries.length}
          />
        </>
      )}
    </>
  );
}

export default App;
