import React from "react";

const continentButtonStyle = (isSelected) =>
  `px-4 py-2 ${
    isSelected ? "bg-blue-700" : "bg-blue-500"
  } text-white rounded hover:bg-blue-600 transition cursor-pointer focus:outline-offset-2 focus:outline-2 focus:outline-blue-400 active:bg-blue-800`;

const startButtonStyle =
  "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer active:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed";

export default function GameSettings({
  flagCountInput,
  onChange,
  onSubmit,
  isLoading,
  onSelect,
  currentContinent,
}) {
  const isInputValid =
    flagCountInput.trim() !== "" && parseInt(flagCountInput) >= 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInputValid) {
      onSubmit(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Flag Guessing Game 🌍</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium text-center">
            How many flags would you like to guess? (1-20)
          </label>
          <input
            type="text"
            value={flagCountInput}
            onChange={onChange}
            placeholder="Enter a number between 1-20"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
          {flagCountInput && parseInt(flagCountInput) > 20 && (
            <p className="text-sm text-orange-500">
              Maximum is 20 flags. Your game will use 20 flags.
            </p>
          )}
          {flagCountInput && parseInt(flagCountInput) < 1 && (
            <p className="text-sm text-orange-500">
              Minimum is 1 flag. Your game will use 1 flag.
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium text-center">
            Select a region
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => onSelect(null)}
              className={continentButtonStyle(!currentContinent)}
            >
              Worldwide
            </button>
            <button
              type="button"
              onClick={() => onSelect("Europe")}
              className={continentButtonStyle(currentContinent === "Europe")}
            >
              Europe
            </button>
            <button
              type="button"
              onClick={() => onSelect("Asia")}
              className={continentButtonStyle(currentContinent === "Asia")}
            >
              Asia
            </button>
            <button
              type="button"
              onClick={() => onSelect("Africa")}
              className={continentButtonStyle(currentContinent === "Africa")}
            >
              Africa
            </button>
            <button
              type="button"
              onClick={() => onSelect("Oceania")}
              className={continentButtonStyle(currentContinent === "Oceania")}
            >
              Oceania
            </button>
            <button
              type="button"
              onClick={() => onSelect("Americas")}
              className={continentButtonStyle(currentContinent === "Americas")}
            >
              Americas
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !isInputValid}
            className={startButtonStyle}
          >
            {isLoading ? "Loading..." : "Start Game"}
          </button>
        </div>
      </form>
    </div>
  );
}
