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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function convertToHMS(seconds) {
  seconds = Number(seconds);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);
  h = h > 0 ? h + (h === 1 ? "hr " : "hrs ") : "";
  m = m > 0 ? m + (m === 1 ? "min " : "mins ") : "";
  s = s > 0 ? s + "sec" : "";
  return h + m + s;
}

export { createCommaSeperatedValues, formatDate, convertToHMS };
