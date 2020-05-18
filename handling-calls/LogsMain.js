import React from "react";
import { Logs } from "./components";

const headers = {
  headers: new Headers({
    "x-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDUtMTUgMDk6Mzg6MjIiLCJzZXNzaW9uX2lkIjoiUjNTWlV2aHY5NnVvQ2ltd2M2OTcyWEFKQ01BRXRwYXFHSVZzaTFGeUJla2NwWmJjZFE0VzBHOERLRjAxIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkwNzQ1MTAyLCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.tKudkQUXPZPUbKUPXKW7a1PDS6J0DiYV1M8ql1t68FA"
  })
};

const baseURL = "https://staging-framework.blinkin.io/v1";
const logsURL = "/admin/get-logs";

function App() {
  const getLogsAPI = async pageNo => {
    const response = await fetch(
      baseURL + logsURL + (pageNo ? `?page=${pageNo}` : ""),
      headers
    );
    const res = await response.json();
    return res;
  };

  const filteringLogsAPI = async (
    eventType,
    name,
    email,
    ip,
    paginate,
    date,
    country,
    position
  ) => {
    const response = await fetch(
      baseURL +
        logsURL +
        `?event_type=${eventType}&name=${name}&email=${email}&ip=${ip}&paginate=${paginate}&created_at=${date}&country=${country}&position=${position}`,
      headers
    );

    const res = await response.json();
    return res;
  };

  return (
    <>
      <Logs getAPI={getLogsAPI} filteringAPI={filteringLogsAPI} />
    </>
  );
}

export default App;
