import { useEffect, useState } from "react";

import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";

const BASE_URL = "https://restcountries.com/v3.1/";

function App() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [flag, setFLag] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState(null);
  useEffect(() => {
    const getFlag = async () => {
      try {
        const response = await fetch(`${BASE_URL}name/sweden`);
        if (!response.ok) throw new Error("Failed to fetch");
        const [data] = await response.json();
        setFLag({
          png: data.flags.png,
          alt: data.flags.alt,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setFLag(null);
      }
    };
    getFlag();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserGuess(inputValue);
    setInputValue("");
  };

  return (
    <>
      {flag ? <FlagCard flag={flag} /> : undefined}
      {flag ? (
        <GuessInput
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : undefined}
      {userGuess ? <p>{`Your guess was ${userGuess}`}</p> : undefined}
    </>
  );
}

export default App;
