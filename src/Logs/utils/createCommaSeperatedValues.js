const createCommaSeperatedValues = value => {
  if (value) {
    return value.reduce((start, val, index) => {
      let v = start + val.value;
      if (index + 1 !== value.length) v += ",";
      return v;
    }, "");
  }
  return "";
};

export default createCommaSeperatedValues;
