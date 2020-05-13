# blinkin admin panel
We have 5 components into this Component
1) Users
2) AddUsers
3) Dashboard
4) Logs
5) Call activity

## Add dependencies into package.json

### Users

```js
import { Users } from "blinkin-admin-panel";
```

```js
<Users
      fetchAPI={fetchAPI}
      fetchUserById={fetchUserById}
      updateUserData={updateUserData}
      deleteUsers={deleteUsers}
    />
```
### Users handing Fetch Props
```js
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
  let data = await response.json();

  callback(data);
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
  let data = await response.json();

  callback(data);
};
```

## Add Users

```js
import { AddUsers } from "blinkin-admin-panel";
```

```js
  <AddUsers
        handleSingleUserAPI={handleSingleUserAPI}
        handleBulkUploadFile={handleBulkUploadFile}
      />
```

### Add Users handing Fetch Props

```js
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
```

## Dashboard

```js
import { Dashboard } from "blinkin-admin-panel";
```

```js
<Dashboard fetchData={fetchData} fetchUserData={fetchUserData} />
```

### Dashboard handing Fetch Props

```js
  let fetchData = async type => {
    let url = `${detailBoardURL}${type}`;
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders
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
      headers: myHeaders
    });
    return await response.json();
  };
```

