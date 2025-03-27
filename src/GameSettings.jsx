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
        className={!currentContinent ? "active" : ""}
      >
        Worldwide
      </button>
      <button
        type="button"
        onClick={() => onSelect("Europe")}
        className={currentContinent === "Europe" ? "active" : ""}
      >
        Europe
      </button>
      <button
        type="button"
        onClick={() => onSelect("Asia")}
        className={currentContinent === "Asia" ? "active" : ""}
      >
        Asia
      </button>
      <button
        type="button"
        onClick={() => onSelect("Africa")}
        className={currentContinent === "Africa" ? "active" : ""}
      >
        Africa
      </button>
      <button
        type="button"
        onClick={() => onSelect("Oceania")}
        className={currentContinent === "Oceania" ? "active" : ""}
      >
        Oceania
      </button>
    </form>
  );
}
