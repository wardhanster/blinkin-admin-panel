import React from "react";
import { Dashboard } from "./components";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "x-token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDUtMTUgMDk6Mzg6MjIiLCJzZXNzaW9uX2lkIjoiUjNTWlV2aHY5NnVvQ2ltd2M2OTcyWEFKQ01BRXRwYXFHSVZzaTFGeUJla2NwWmJjZFE0VzBHOERLRjAxIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkwNzQ1MTAyLCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.tKudkQUXPZPUbKUPXKW7a1PDS6J0DiYV1M8ql1t68FA"
);

const baseURL = "https://staging-framework.blinkin.io/v1/admin/";

const detailBoardURL = `${baseURL}get-dashboard?duration=`;

const usersWithNoCallsURL = `${baseURL}get-users-with-no-calls?paginate=5&duration=`;
const inActiveUsersURL = `${baseURL}get-inactive-users?paginate=5&duration=`;
const mostActiveUsersURL = `${baseURL}get-most-active-users?duration=`;
const fetchMetricsURL = `${baseURL}get-typeform-metrics`;

const urls = {
  userswithnocalls: usersWithNoCallsURL,
  inactiveusers: inActiveUsersURL,
  mostactiveUsers: mostActiveUsersURL,
};

function App() {
  let fetchData = async (type) => {
    let url = `${detailBoardURL}${type}`;
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    return await response.json();
  };

  let fetchUserData = async (type, pageno = null, duration) => {
    let url;
    if (pageno) {
      url = `${urls[type]}${duration}&page=${pageno}`;
    } else {
      url = `${urls[type]}${duration}`;
    }
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    return await response.json();
  };

  let fetchMetrics = async (filterData) => {
    let url;
    if (filterData) {
      url = `${fetchMetricsURL}?filters=${encodeURIComponent(
        JSON.stringify(filterData)
      )}`;
    } else {
      url = fetchMetricsURL;
    }
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    return await response.json();
  };

  return (
    <>
      <Dashboard
        fetchData={fetchData}
        fetchUserData={fetchUserData}
        fetchMetrics={fetchMetrics}
      />
    </>
  );
}

export default App;
