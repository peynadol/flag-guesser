export default function GuessInput(props) {
  return (
    <>
      <form className="guess-input" onSubmit={props.onSubmit}>
        <label>Guess the country!</label>
        <input
          type="text"
          onChange={props.onChange}
          value={props.value}
          autoFocus
        />
      </form>
    </>
  );
}
