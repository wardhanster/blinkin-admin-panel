export function showMonthDateYear(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var month = monthNames[date.getMonth()];
  var newdate = date.getDate();
  var year = date.getFullYear();
  return `${month} ${newdate}, ${year}`;
}

export function dateToHowManyAgo(stringDate) {
  var currDate = new Date();
  var diffMs = currDate.getTime() - new Date(stringDate).getTime();
  var sec = diffMs / 1000;
  if (sec < 60)
    return parseInt(sec) + " second" + (parseInt(sec) > 1 ? "s" : "") + " ago";
  var min = sec / 60;
  if (min < 60)
    return parseInt(min) + " minute" + (parseInt(min) > 1 ? "s" : "") + " ago";
  var h = min / 60;
  if (h < 24)
    return parseInt(h) + " hour" + (parseInt(h) > 1 ? "s" : "") + " ago";
  var d = h / 24;
  if (d < 30)
    return parseInt(d) + " day" + (parseInt(d) > 1 ? "s" : "") + " ago";
  var m = d / 30;
  if (m < 12)
    return parseInt(m) + " month" + (parseInt(m) > 1 ? "s" : "") + " ago";
  var y = m / 12;
  return parseInt(y) + " year" + (parseInt(y) > 1 ? "s" : "") + " ago";
}

export function translateDateTime(data) {
  let dayNumber = data.split(" ")[0];
  let splitIdentify = data.split(" ")[1];
  let res, returnStructure;
  switch (splitIdentify) {
    case "day":
    case "days":
      res =
        splitIdentify === "day"
          ? `Vor ${dayNumber} Tag`
          : `Vor ${dayNumber} Tagen`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    case "second":
    case "seconds":
      res =
        splitIdentify === "second"
          ? `Vor ${dayNumber} Sekunde`
          : `Vor ${dayNumber} Sekunden`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    case "minute":
    case "minutes":
      res =
        splitIdentify === "minute"
          ? `Vor ${dayNumber} Minute`
          : `Vor ${dayNumber} Minuten`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    case "hour":
    case "hours":
      res =
        splitIdentify === "hour"
          ? `vor ${dayNumber} Stunde`
          : `Vor ${dayNumber} Stunde`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    case "month":
    case "months":
      res =
        splitIdentify === "month"
          ? `Vor ${dayNumber} Monat`
          : `Vor ${dayNumber} Monaten`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    case "year":
    case "years":
      res =
        splitIdentify === "year"
          ? `vor ${dayNumber} Jahr`
          : `Vor ${dayNumber} Jahren`;
      returnStructure = window.strings.getLanguage() === "en" ? data : res;
      return returnStructure;
    default:
      break;
  }
}
