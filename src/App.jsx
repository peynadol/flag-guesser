import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";

import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";
import AnswerCounter from "./AnswerCounter";

const BASE_URL = "https://restcountries.com/v3.1/";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [gameRoundCountries, setGameRoundCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [totalQuestionCount, setTotalQuestionCount] = useState("");
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
    const isCorrect = checkCorrect(inputValue);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setUserGuess(inputValue);

    setInputValue("");
  };

  console.log(gameRoundCountries);

  const checkCorrect = (guess) => {
    if (!guess || !gameRoundCountries[currentCountryIndex]) return false;
    const commonName =
      gameRoundCountries[currentCountryIndex].name.common.toLowerCase();
    const officialName =
      gameRoundCountries[currentCountryIndex].name.official.toLowerCase();
    const allNames = [commonName, officialName];
    return allNames.includes(guess.toLowerCase().trim());
  };

  return (
    <>
      {gameRoundCountries[currentCountryIndex] ? (
        <FlagCard flag={gameRoundCountries[currentCountryIndex].flags} />
      ) : undefined}
      {gameRoundCountries[currentCountryIndex] ? (
        <GuessInput
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : undefined}
      {!userGuess ? undefined : checkCorrect() ? (
        <p>{`Correct`}</p>
      ) : (
        <p>{`Incorrect`}</p>
      )}
      <AnswerCounter correctCount={correctCount} />
    </>
  );
}

export default App;
