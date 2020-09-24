import React from "react";

import "./button__group_days.css";

export default function ButtonGroupDays(props) {
  const { activeDays, setClick, classUpdate } = props;

  const handleBtnClick = (data) => {
    setClick(data);
  };

  return (
    <div className={`btn-main btn-group  btn-group-sm ${classUpdate}`}>
      <button
        type="button"
        className={
          activeDays === 1
            ? "btn btn-sm btn-primary"
            : "btn btn-sm btn-outline-primary"
        }
        onClick={() => handleBtnClick(1)}
      >
        {window.strings.Dashboard_yesterday || "Yesterday"}
      </button>
      <button
        type="button"
        className={
          activeDays === 7 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        onClick={() => handleBtnClick(7)}
      >
        7 {window.strings.Dashboard_days || "Days"}
      </button>
      <button
        type="button"
        className={
          activeDays === 30 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        onClick={() => handleBtnClick(30)}
      >
        30 {window.strings.Dashboard_days || "Days"}
      </button>
      <button
        type="button"
        className={
          activeDays === 90 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        onClick={() => handleBtnClick(90)}
      >
        90 {window.strings.Dashboard_days || "Days"}
      </button>
      <button
        type="button"
        className={
          activeDays === 0 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        onClick={() => handleBtnClick(0)}
      >
        {window.strings.Dashboard_days || "All Time"}
      </button>
    </div>
  );
}
