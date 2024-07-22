import { useState, useEffect } from "react";

interface ApiState<T> {
  movies: T | [];
  error: string | null;
  isLoading: boolean;
}

export default function useMovies<T>(
  query: string,
  url: string,
  callback: () => void
): ApiState<T> {
  const [movies, setMovies] = useState<T | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    callback();
    const controller = new AbortController();
    async function fetchMovies(): Promise<void | Error | null> {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(url);

        if (!res.ok)
          throw new Error("Something went wrong with fetching the movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("movie not found");

        setMovies(data.Search);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        }
        throw new Error("error for the fetch API");
      } finally {
        setIsLoading(false);
      }
    }

    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, url, callback]);

  return { movies, error, isLoading };
}
