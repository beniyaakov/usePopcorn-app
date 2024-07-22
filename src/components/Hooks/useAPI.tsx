import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useApi = <T = unknown>(url: string, options?: RequestInit): ApiState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};

export default useApi;
