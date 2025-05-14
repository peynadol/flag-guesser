import { useGameState } from "./hooks/useGameState";
import { useSettings } from "./hooks/useSettings";
import { useCountries } from "./hooks/useCountries";
import { useGuessInput } from "./hooks/useGuessInput";
import FlagCard from "./FlagCard";
import GuessInput from "./GuessInput";
import AnswerCounter from "./AnswerCounter";
import RoundComplete from "./RoundComplete";
import GameSettings from "./GameSettings";

function App() {
  const { allCountries, isLoading, error } = useCountries();

  const {
    flagCountInput,
    selectedContinent,
    handleFlagCountChange,
    handleContinentSelect,
    getValidatedFlagCount,
    resetSettings,
  } = useSettings();

  const {
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
  } = useGameState(allCountries);

  const {
    inputValue,
    userGuess,
    handleInputChange: handleGuessInputChange,
    submitInput,
    clearUserGuess,
  } = useGuessInput(gamePhase);

  const currentCountry = gameRoundCountries[currentCountryIndex];
  const score = `${correctCount}/${gameRoundCountries.length}`;

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    submitInput(inputValue);
    submitGuess(inputValue);
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();
    const flagCount = getValidatedFlagCount();
    startNewGame(flagCount, selectedContinent);
    setGamePhase("playing");
  };

  const handleResetGame = () => {
    resetGame();
    resetSettings();
    clearUserGuess();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-xl font-bold text-red-600">
          Error loading countries
        </h2>
        <p>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {gamePhase === "settings" ? (
        <GameSettings
          isLoading={isLoading}
          onSubmit={handleSettingsSubmit}
          onChange={handleFlagCountChange}
          currentContinent={selectedContinent}
          onSelect={handleContinentSelect}
          flagCountInput={flagCountInput}
        />
      ) : gamePhase === "complete" ? (
        <RoundComplete
          onReset={handleResetGame}
          incorrectAnswers={incorrectAnswers}
          score={score}
          correctCount={correctCount}
          totalQuestions={gameRoundCountries.length}
        />
      ) : (
        currentCountry && (
          <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-md">
            <FlagCard flag={currentCountry.flags} />
            <GuessInput
              value={inputValue}
              onChange={handleGuessInputChange}
              onSubmit={handleGuessSubmit}
              disabled={gamePhase !== "playing"}
            />
            {userGuess &&
              previousCountryIndex >= 0 &&
              previousCountryIndex < gameRoundCountries.length &&
              currentCountryIndex > 0 && (
                <p className="text-lg font-semibold">
                  {checkCorrect(userGuess, previousCountryIndex)
                    ? "✅ Correct! The answer was " +
                      gameRoundCountries[previousCountryIndex].name.common
                    : "❌ Incorrect! The answer was " +
                      gameRoundCountries[previousCountryIndex].name.common}
                </p>
              )}
            <AnswerCounter
              questionNumber={currentCountryIndex + 1}
              questionAmount={gameRoundCountries.length}
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
