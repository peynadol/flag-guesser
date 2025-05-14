import { useEffect, useState } from "react";

const BASE_URL = "https://restcountries.com/v3.1/all";

export function useCountries() {
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch countries (Status: ${response.status})`
          );
        }

        const data = await response.json();

        const validCountries = data.filter(
          (country) =>
            country && country.name && country.name.common && country.flags
        );

        setAllCountries(validCountries);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setAllCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    getAllCountries();
  }, []);

  return { allCountries, isLoading, error };
}
