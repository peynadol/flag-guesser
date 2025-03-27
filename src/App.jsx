import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";

import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";
import AnswerCounter from "./AnswerCounter";
import RoundComplete from "./RoundComplete";

const BASE_URL = "https://restcountries.com/v3.1/";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [gameRoundCountries, setGameRoundCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [previousCountryIndex, setPreviousCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}all`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllCountries(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setAllCountries(null);
      }
    };
    getAllCountries();
  }, []);

  useEffect(() => {
    if (allCountries.length > 0) {
      const shuffled = arrayShuffle(allCountries);
      const firstFive = shuffled.slice(0, 5);
      setGameRoundCountries(firstFive);
      setCurrentCountryIndex(0);
    }
  }, [allCountries]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPreviousCountryIndex(currentCountryIndex);
    const isCorrect = checkCorrect(inputValue, currentCountryIndex);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setUserGuess(inputValue);
    setInputValue("");
    setCurrentCountryIndex((prev) => prev + 1);
  };

  const checkCorrect = (guess, index) => {
    if (!guess || !gameRoundCountries[index]) return false;
    const names = [
      gameRoundCountries[index].name.common.toLowerCase(),
      gameRoundCountries[index].name.official.toLowerCase(),
    ];

    return names.includes(guess.toLowerCase().trim());
  };

  const isRoundComplete = currentCountryIndex >= gameRoundCountries.length;

  const resetGame = () => {
    const newShuffled = arrayShuffle(allCountries.slice(0, 5));
    setGameRoundCountries(newShuffled);
    setCurrentCountryIndex(0);
    setCorrectCount(0);
    setUserGuess("");
  };

  return isRoundComplete ? (
    <RoundComplete
      onReset={resetGame}
      correctCount={correctCount}
      totalQuestions={gameRoundCountries.length}
    />
  ) : (
    <>
      {/* Game Screen */}
      {gameRoundCountries[currentCountryIndex] && (
        <>
          <FlagCard flag={gameRoundCountries[currentCountryIndex].flags} />
          <GuessInput
            value={inputValue}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </>
      )}

      {/* Feedback Message */}
      {userGuess && (
        <p>
          {checkCorrect(userGuess, previousCountryIndex)
            ? "Correct"
            : "Incorrect"}
        </p>
      )}

      {/* Counter */}
      <AnswerCounter
        questionNumber={currentCountryIndex + 1}
        questionAmount={gameRoundCountries.length}
      />
    </>
  );
}

export default App;
