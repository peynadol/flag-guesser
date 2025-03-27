import { useEffect, useState } from "react";

import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";

const BASE_URL = "https://restcountries.com/v3.1/";

function App() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(`${BASE_URL}name/finland`);
        if (!response.ok) throw new Error("Failed to fetch");
        const [data] = await response.json();
        setCountryInfo(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setCountryInfo(null);
      }
    };
    getCountry();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserGuess(inputValue);
    checkCorrect();

    setInputValue("");
  };

  const checkCorrect = () => {
    if (!userGuess || !countryInfo) return false;
    const commonName = countryInfo.name.common.toLowerCase();
    const officialName = countryInfo.name.official.toLowerCase();
    const allNames = [commonName, officialName];
    return allNames.includes(userGuess.toLowerCase().trim());
  };

  return (
    <>
      {countryInfo ? <FlagCard flag={countryInfo.flags} /> : undefined}
      {countryInfo ? (
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
    </>
  );
}

export default App;
