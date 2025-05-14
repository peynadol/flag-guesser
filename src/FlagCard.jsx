export default function FlagCard({ flag }) {
  return (
    <div className="flex justify-center items-center mb-4">
      <img
        src={flag.png}
        alt={flag.alt}
        className="w-64 h-auto rounded shadow-md"
      />
    </div>
  );
}
