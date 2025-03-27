export default function GuessInput(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <label>Guess the country!</label>
        <input type="text" onChange={props.onChange} value={props.value} />
      </form>
    </>
  );
}
