import { useState, useEffect, useCallback } from "react";

const useUsersData = (fetchUserData, type, activeDays,pageno) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const callAPI = useCallback(async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    let data = await fetchUserData(type,pageno,activeDays);
    setResponse(data);
    setLoading(false);
  }, [fetchUserData, type,pageno,activeDays]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  return {
    loading,
    response,
    error,
  };
};

export default useUsersData;
