export default function RoundComplete({
  onReset,
  correctCount,
  totalQuestions,
}) {
  return (
    <>
      <p>Round Complete!</p>
      <p>{`You scored ${correctCount} out of ${totalQuestions}!`}</p>
      <button onClick={onReset}>Reset</button>
    </>
  );
}
