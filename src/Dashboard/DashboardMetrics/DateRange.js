import React, { useState } from "react";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export default function DateRange(props) {
  const [value, setValue] = useState();
  const onChange = (date) => {
    props.onChange(date, props.type);
    setValue(date);
  };
  return (
    <div>
      <DateRangePicker onChange={onChange} value={value} />
    </div>
  );
}
