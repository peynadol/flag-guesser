export default function GuessInput(props) {
  return (
    <form
      className="flex flex-col items-center space-y-2"
      onSubmit={props.onSubmit}
    >
      <label className="text-lg font-medium">Guess the country!</label>
      <input
        type="text"
        onChange={props.onChange}
        value={props.value}
        autoFocus
        className="border border-gray-300 p-2 rounded w-64 text-center focus:outline-none focus:ring focus:border-blue-400"
      />
    </form>
  );
}
