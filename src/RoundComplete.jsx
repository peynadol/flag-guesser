export default function RoundComplete({ onReset, score, incorrectAnswers }) {
  return (
    <div className="results-container">
      <h2>Round Complete!</h2>
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

      <button onClick={onReset} className="reset-btn">
        Play Again
      </button>
    </div>
  );
}
