import { useState, useEffect, useCallback } from "react";

const useDashboard = (fetchCall, activeDays) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    let data = await fetchCall(activeDays);
    setResponse(data.records.count);
    setLoading(false);
  }, [fetchCall, activeDays]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  return {
    loading,
    response,
    error,
  };
};

export default useDashboard;
