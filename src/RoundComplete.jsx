export default function RoundComplete({ onReset, score }) {
  return (
    <>
      <p>Round Complete!</p>
      <p>{`You scored ${score}`}</p>
      <button onClick={onReset}>Reset</button>
    </>
  );
}
