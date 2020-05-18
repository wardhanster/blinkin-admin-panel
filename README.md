# blinkin admin panel
We have 5 components into this Component
1) Users
2) AddUsers
3) Dashboard
4) Logs
5) Call activity

## Add package into existing project

```js
npm install git+ssh://git@github.com:ranjith29v/blinkin-admin-panel.git
```

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
[Users Prop handling details](https://github.com/ranjith29v/blinkin-admin-panel/blob/master/handling-calls/UsersMain.js)

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
[Add Users prop handling details](https://github.com/ranjith29v/blinkin-admin-panel/blob/master/handling-calls/AddUsersMain.js)
## Note : Am using axios to test since we need to handle two things 1. progess percentage 2. On success message

## Dashboard

```js
import { Dashboard } from "blinkin-admin-panel";
```

```js
<Dashboard fetchData={fetchData} fetchUserData={fetchUserData} />
```

### Dashboard props handing

[Dashboard prop handling details](https://github.com/ranjith29v/blinkin-admin-panel/blob/master/handling-calls/DashboardMain.js)

## Call Activity

```js
import { CallActivity } from 'blinkin-admin-panel';
```
```js
<CallActivity
        getAPI={getCallActivityAPI}
        filteringAPI={filteringCallActivityAPI}
      />
```

### Call activity props handling

[Call activity prop handling details](https://github.com/ranjith29v/blinkin-admin-panel/blob/master/handling-calls/CallActivityMain.js)


## Logs
```js
import { Logs } from 'blinkin-admin-panel';
```
```js
<Logs getAPI={getLogsAPI} filteringAPI={filteringLogsAPI} />
```

### Logs props handling

[logs props handling details](https://github.com/ranjith29v/blinkin-admin-panel/blob/master/handling-calls/LogsMain.js)
