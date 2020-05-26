import React from "react";
import { Users } from "./components";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "x-token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDUtMjUgMTE6MzE6NDAiLCJzZXNzaW9uX2lkIjoiQlA2VnlNM3o1S2ZXdGc4WGEzTG5VUUpXZVZPSE5FaUZpOUh1aFNLbWFXYnhKS0NmSnlERHNpRlZPT3pWIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkxNjE1OTAwLCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.Sr22Bit_sNqXw4zK_2_VaM97VWq1hwg583Q4LNKMO30"
);

const fetchAPI = async (paginate, pageNo, searchTerm = null) => {
  let queryString;
  if (searchTerm) {
    queryString = Object.keys(searchTerm)
      .map(key => key + "=" + searchTerm[key])
      .join("&");
  }
  let usersUrl;
  if (queryString) {
    usersUrl = `https://staging-framework.blinkin.io/v1/admin/get-users?paginate=${paginate}&page=${pageNo}&${queryString}`;
  } else {
    usersUrl = `https://staging-framework.blinkin.io/v1/admin/get-users?paginate=${paginate}&page=${pageNo}`;
  }
  let response = await fetch(usersUrl, {
    method: "GET",
    headers: myHeaders
  });
  let data = await response.json();
  return data;
};

const fetchUserById = async userId => {
  let getUser = `https://staging-framework.blinkin.io/v1/admin/get-user/${userId}`;
  let response = await fetch(getUser, {
    method: "GET",
    headers: myHeaders
  });
  let data = await response.json();
  return data;
};

const updateUserData = async (id, userJson, callback) => {
  let postUser = `https://staging-framework.blinkin.io/v1/admin/edit-user/${id}`;

  let formData = new FormData();
  Object.keys(userJson).forEach(key => formData.append(key, userJson[key]));

  let response = await fetch(postUser, {
    method: "POST",
    headers: myHeaders,
    body: formData
  });
  return await response.json();
};

const deleteUsers = async (ids, callback) => {
  let deleteUserUrl =
    "https://staging-framework.blinkin.io/v1/admin/delete-users";
  let formData = new FormData();
  formData.append("users", JSON.stringify(ids));

  let response = await fetch(deleteUserUrl, {
    method: "POST",
    headers: myHeaders,
    body: formData
  });
  return await response.json();
};

function App() {
  return (
    <Users
      fetchAPI={fetchAPI}
      fetchUserById={fetchUserById}
      updateUserData={updateUserData}
      deleteUsers={deleteUsers}
    />
  );
}
export default App;
