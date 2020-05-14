import { useState, useEffect, useCallback } from "react";

const useUsersData = (
  fetchUserData,
  type,
  activeDays,
  pageno,
  downloadStatus
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const callAPI = useCallback(async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    let data = await fetchUserData(type, pageno, activeDays);
    setResponse(data);
    setLoading(false);
  }, [fetchUserData, type, pageno, activeDays]);

  useEffect(() => {
    if (downloadStatus) {
      console.log("hello download");
    }
  }, [downloadStatus]);

  let downloadResponse = async () => {
    console.log("download things");
    let response = await fetchUserData(type, null, 0, null);
    return response;
  };

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  return {
    loading,
    response,
    error,
    downloadResponse
  };
};

export default useUsersData;
