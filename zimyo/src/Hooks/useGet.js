import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../services/apis";

const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(options).toString();
      const fullUrl = queryParams ? `${url}?${queryParams}` : url;
      const response = await apiClient.get(fullUrl);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, fetchData, setData };
};

export default useFetch;
