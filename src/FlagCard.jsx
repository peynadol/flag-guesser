export default function FlagCard({ flag }) {
  return (
    <div className="flag-card">
      <img src={flag.png} alt={flag.alt} />
    </div>
  );
}
