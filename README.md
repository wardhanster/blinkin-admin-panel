# blinkin admin panel (870 kb)

We have 5 components into this library

1. Users

2. AddUsers

3. Dashboard

4. Call activity

5. Logs

## Add package into existing project

```js

npm install git+ssh://git@github.com:ranjith29v/blinkin-admin-panel.git

```

or add as dependency in your package.json file

```
"blinkin-admin-panel": "github:wardhanster/blinkin-admin-panel.git#<Commit of your build in master branch>"
```

### Development

This package is a standalone package. So you have to install this inside a dummy project for development.

#### How to run project :-

1. Unzip and install packages for dummy app.

2. Goto src directory of dummy project.

3. Clone current project inside **/src** directory of dummy project. Now **/src** should look like **/src/blinkin-admin-panel** .

4. Import componet which you have to work in **App.js** eg.
   `import { Users } from './blinkin-admin-panel/src'`

5. Import required methods for that components from **/non-native-dependencies/services/adminStore** directory or from **/non-native-dependencies/services/userStore** depending upon the required prop.

6. Fetch latest user token from main BlinkIn app with proper authentication for accessing admin module. Update token direcly inside **/non-native-dependencies/services** .

7. If there is any methods missing in **/non-native-dependencies/services**, make sure copy them from main BlinkIn app services into dummy app services.

### How to Build

1. Goto **/src/blinkin-admin-panel** directory of dummy app.

2. Make sure **react** and **react-dom** version sync with main BlinkIn app.

3. If dependencies are in proper version, run `npm run build` to build your code.

4. After successfully building the code, commit your code and push to remote repo.

5. Copy full **commit hash** of your latest push on GitHub and use that in main Blinkin package.json for pulling latest build.

### Users

```js
import { Users } from 'blinkin-admin-panel';
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
import { AddUsers } from 'blinkin-admin-panel';
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
import { Dashboard } from 'blinkin-admin-panel';
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
