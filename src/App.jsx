import { useEffect, useState } from "react";

import FlagCard from "./FlagCard";

const BASE_URL = "https://restcountries.com/v3.1/";

function App() {
  const [flag, setFLag] = useState(null);
  useEffect(() => {
    const getFlag = async () => {
      try {
        const response = await fetch(`${BASE_URL}name/sweden`);
        if (!response.ok) throw new Error("Failed to fetch");
        const [data] = await response.json();
        setFLag({
          png: data.flags.png,
          alt: data.flags.alt,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setFLag(null);
      }
    };
    getFlag();
  }, []);

  return <>{flag ? <FlagCard flag={flag} /> : undefined}</>;
}

export default App;
