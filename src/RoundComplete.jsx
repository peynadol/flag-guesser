import ReactConfetti from "react-confetti";
export default function RoundComplete({ correctCount, totalQuestions, onReset, score, incorrectAnswers }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onReset();
    }
  };

  return (
    <>
      {correctCount === totalQuestions ? <ReactConfetti /> : null}
      <div className="results-container" onKeyDown={handleKeyDown}>
        <h2>Round Complete!</h2>
        {correctCount === totalQuestions ? <p>Perfect Score!</p> : null}
        <p className="score">{`You scored ${score}`}</p>

        {incorrectAnswers.length > 0 && (
          <div className="mistakes-section">
            <h3>Review your mistakes:</h3>
            {incorrectAnswers.map((item, index) => (
              <div key={index} className="mistake-card">
                <img
                  src={item.country.flags.png}
                  alt={item.country.flags.alt}
                  width="100"
                />
                <div className="mistake-details">
                  <p>
                    <strong>Your guess:</strong> {item.userGuess}
                  </p>
                  <p>
                    <strong>Correct answer:</strong> {item.country.name.common}
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
          <button type="submit" className="reset-btn" autoFocus>
            Play Again
          </button>
        </form>
      </div>
    </>
  );
}
