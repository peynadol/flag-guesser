export default function GameSettings({
  flagCount,
  onChange,
  onSubmit,
  isLoading,
  onSelect,
  currentContinent,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>How many flags would you like to guess? (1-50)</label>
      <input type="text" value={flagCount} onChange={onChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Start Game"}
      </button>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`continent-btn ${!currentContinent ? "active" : ""}`}
      >
        Worldwide
      </button>
      <button
        type="button"
        onClick={() => onSelect("Europe")}
        className={`continent-btn ${
          currentContinent === "Europe" ? "active" : ""
        }`}
      >
        Europe
      </button>
      <button
        type="button"
        onClick={() => onSelect("Asia")}
        className={`continent-btn ${
          currentContinent === "Asia" ? "active" : ""
        }`}
      >
        Asia
      </button>
      <button
        type="button"
        onClick={() => onSelect("Africa")}
        className={`continent-btn ${
          currentContinent === "Africa" ? "active" : ""
        }`}
      >
        Africa
      </button>
      <button
        type="button"
        onClick={() => onSelect("Oceania")}
        className={`continent-btn ${
          currentContinent === "Oceania" ? "active" : ""
        }`}
      >
        Oceania
      </button>
      <button
        type="button"
        onClick={() => onSelect("Americas")}
        className={`continent-btn ${
          currentContinent === "Americas" ? "active" : ""
        }`}
      >
        Americas
      </button>
    </form>
  );
}
