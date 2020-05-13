import React from "react";
import "./snackbar.css";

const snackBar = (status, msg) => {
  return (
    <div id="snackbar" className={status ? "show" : ""}>
      {msg}
    </div>
  );
};

export default snackBar;
