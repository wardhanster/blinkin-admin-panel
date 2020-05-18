import React from "react";
import { AddUsers } from "./components";

import axios from "axios";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "x-token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGgiLCJlbWFpbCI6InJhbmppdGgudkBibGlua2luLmlvIiwiY29tcGFueV9pZCI6MSwibGFzdF9sb2dpbl9hdCI6IjIwMjAtMDUtMTIgMDU6MjQ6MDYiLCJzZXNzaW9uX2lkIjoiWUUzU3VpYmNsNDJlTmNRMXdYRFN4b3VQNVhpUXUxc1ZTR3ZCRE14eUE0TENNcjV2djR0RHJtWWRxSm5HIiwiY291bnRyeSI6IklOIiwiZXhwaXJ5IjoxNTkwNDcwNjQ2LCJpc19jb21wYW55X2FkbWluIjp0cnVlfQ.0gWxeOGMlzkeTGNDR1TsX3j2u_vIBWhrhASMY8W79To"
);

const addSingleUrl =
  "https://staging-framework.blinkin.io/v1/admin/add-single-user";

function App() {
  let handleSingleUserAPI = async (singleUserDataJSON, callBack) => {
    let formData = new FormData();
    Object.keys(singleUserDataJSON).forEach(key =>
      formData.append(key, singleUserDataJSON[key])
    );

    let response = await fetch(addSingleUrl, {
      method: "POST",
      headers: myHeaders,
      body: formData
    });
    let data = await response.json();
    callBack(data);
  };

  let handleBulkUploadFile = (file, uploadProgress, uploadSuccess) => {
    let data = new FormData();
    data.append("file", file.file[0]);
    data.append("pass_gen", file.pass_gen);

    let upload_url =
      "https://staging-framework.blinkin.io/v1/admin/add-bulk-users";

    const config = {
      headers: {
        "x-token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1OSwibmFtZSI6IlJhbmppdGggdiIsImVtYWlsIjoicmFuaml0aC52QGJsaW5raW4uaW8iLCJjb21wYW55X2lkIjoxLCJsYXN0X2xvZ2luX2F0IjoiMjAyMC0wNS0wNSAwODoyMDozMCIsInNlc3Npb25faWQiOiI1c1M3YWR6ZGw4SmZFNlV2UkZ4UlhrVjZWeU42Z3pmOUFzZU01OU5XQk5Fb1FNazlIQVN2MHA3U1U5U2UiLCJjb3VudHJ5IjoiSU4iLCJleHBpcnkiOjE1ODk4NzY0MzAsImlzX2NvbXBhbnlfYWRtaW4iOnRydWV9.1IYAthiWrIdrM9kYLloRPngjD2V-8GOsPi2K_-7Tytg",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        uploadProgress(percentCompleted);
      }
    };

    axios
      .post(upload_url, data, config)
      .then(res => uploadSuccess(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <AddUsers
        handleSingleUserAPI={handleSingleUserAPI}
        handleBulkUploadFile={handleBulkUploadFile}
      />
    </>
  );
}

export default App;
