const continentButtonStyle =
  "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer focus:outline-offset-2 focus:outline-2 focus:outline-blue-400 active:bg-blue-800";

const startButtonStyle =
  "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer active:bg-green-700";

export default function GameSettings({
  flagCount,
  onChange,
  onSubmit,
  isLoading,
  onSelect,
  currentContinent,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium text-center">
            How many flags would you like to guess? (1-20)
          </label>
          <input
            type="text"
            value={flagCount}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={startButtonStyle}
          >
            {isLoading ? "Loading..." : "Start Game"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={continentButtonStyle}
          >
            Worldwide
          </button>
          <button
            type="button"
            onClick={() => onSelect("Europe")}
            className={continentButtonStyle}
          >
            Europe
          </button>
          <button
            type="button"
            onClick={() => onSelect("Asia")}
            className={continentButtonStyle}
          >
            Asia
          </button>
          <button
            type="button"
            onClick={() => onSelect("Africa")}
            className={continentButtonStyle}
          >
            Africa
          </button>
          <button
            type="button"
            onClick={() => onSelect("Oceania")}
            className={continentButtonStyle}
          >
            Oceania
          </button>
          <button
            type="button"
            onClick={() => onSelect("Americas")}
            className={continentButtonStyle}
          >
            Americas
          </button>
        </div>
      </form>
    </div>
  );
}
