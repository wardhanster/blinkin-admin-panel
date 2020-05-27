import React, { useState, useEffect } from "react";
import "react-dates/initialize";
import { DateRangePicker, isInclusivelyAfterDay } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import localization from "moment/locale/en-au";

function DatePicker(props) {
  const { startDate, endDate, handleDatesChange } = props;
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    moment().locale("en", localization);
  }, []);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div>
      <DateRangePicker
        small
        block
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        isOutsideRange={day =>
          isInclusivelyAfterDay(day, moment().add(1, "days"))
        }
        initialVisibleMonth={() => moment().subtract(1, "month")}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
    </div>
  );
}

export default DatePicker;
