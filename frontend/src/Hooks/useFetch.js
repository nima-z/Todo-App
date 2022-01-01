import { useState, useCallback } from "react";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (url, method = "GET", body = null) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  function clearError() {
    setError(null);
  }

  return { isLoading, error, clearError, sendRequest };
}
