import { useState, useEffect } from "react";

export function useGuessInput(initialPhase = "settings") {
  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitInput = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setUserGuess(trimmedValue);
    setInputValue("");
  };

  const clearUserGuess = () => {
    setUserGuess("");
  };

  useEffect(() => {
    clearUserGuess();
    setInputValue("");
  }, [initialPhase]);

  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.focus();
    }
  }, [userGuess]);

  return {
    inputValue,
    userGuess,
    handleInputChange,
    submitInput,
    setInputValue,
    setUserGuess,
    clearUserGuess,
  };
}
