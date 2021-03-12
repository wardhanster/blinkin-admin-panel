import React, { useState, useEffect } from "react";
import Select from "react-select";

import "./drop__down.css";

export default function DropDownSelect(props) {
  let {
    option,
    onSelect,
    clear,
    placeholder = `${window.strings.selectText || 'Select'}...`,
    defaultSelect = null,
    multi = true,
    blur = false,
  } = props;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  };

  useEffect(() => {
    if (clear) {
      setSelectedOption(null);
    }
  }, [clear]);

  return (
    <Select
      isMulti={multi}
      closeMenuOnSelect={false}
      placeholder={placeholder}
      value={defaultSelect || selectedOption}
      onChange={handleChange}
      options={option}
      blurInputOnSelect={blur}
    />
  );
}
