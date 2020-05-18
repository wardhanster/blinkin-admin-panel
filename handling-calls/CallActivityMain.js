import React from "react";
import { CallActivity } from "./components";

const headers = {
  headers: new Headers({
    "x-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDUtMTUgMDk6Mzg6MjIiLCJzZXNzaW9uX2lkIjoiUjNTWlV2aHY5NnVvQ2ltd2M2OTcyWEFKQ01BRXRwYXFHSVZzaTFGeUJla2NwWmJjZFE0VzBHOERLRjAxIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkwNzQ1MTAyLCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.tKudkQUXPZPUbKUPXKW7a1PDS6J0DiYV1M8ql1t68FA"
  })
};

const baseURL = "https://staging-framework.blinkin.io/v1";
const callActivityURL = "/admin/get-call-acitivies";

function App() {
  const getCallActivityAPI = async pageNo => {
    const response = await fetch(
      baseURL + callActivityURL + (pageNo ? `?page=${pageNo}` : ""),
      headers
    );

    const res = await response.json();
    return res;
  };

  const filteringCallActivityAPI = async (
    name,
    email,
    date,
    paginate,
    country,
    position
  ) => {
    const response = await fetch(
      baseURL +
        callActivityURL +
        `?name=${name}&email=${email}&created_at=${date}&paginate=${paginate}&country=${country}&position=${position}`,
      headers
    );
    const res = await response.json();
    return res;
  };
  return (
    <>
      <CallActivity
        getAPI={getCallActivityAPI}
        filteringAPI={filteringCallActivityAPI}
      />
    </>
  );
}

export default App;
