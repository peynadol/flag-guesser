import ReactConfetti from "react-confetti";

export default function RoundComplete({
  correctCount,
  totalQuestions,
  onReset,
  score,
  incorrectAnswers,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onReset();
    }
  };

  return (
    <>
      {correctCount === totalQuestions && <ReactConfetti />}
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6"
        onKeyDown={handleKeyDown}
      >
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Round Complete!</h2>

          {correctCount === totalQuestions && (
            <p className="text-green-600 font-semibold">Perfect Score!</p>
          )}

          <p className="text-lg font-medium">{`You scored ${score}`}</p>

          {incorrectAnswers.length > 0 && (
            <div className="space-y-4 text-left">
              <h3 className="text-lg font-semibold text-red-600">
                Review your mistakes:
              </h3>
              {incorrectAnswers.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-red-50 border border-red-200 p-4 rounded"
                >
                  <img
                    src={item.country.flags.png}
                    alt={item.country.flags.alt}
                    className="w-20 h-auto rounded"
                  />
                  <div className="text-sm">
                    <p>
                      <strong>Your guess:</strong> {item.userGuess}
                    </p>
                    <p>
                      <strong>Correct answer:</strong>{" "}
                      {item.country.name.common}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              autoFocus
            >
              Play Again
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
