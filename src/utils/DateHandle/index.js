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
    return (
      parseInt(min) + " " + window.strings.Dashboard_minute ||
      " minute" + (parseInt(min) > 1 ? "s" : "") + " ago"
    );
  var h = min / 60;
  if (h < 24)
    return (
      parseInt(h) + " " + window.strings.Dashboard_hour ||
      " hour" + (parseInt(h) > 1 ? "s" : "") + " ago"
    );
  var d = h / 24;
  if (d < 30)
    return (
      parseInt(d) + " " + window.strings.Dashboard_day ||
      " day" + (parseInt(d) > 1 ? "s" : "") + " ago"
    );
  var m = d / 30;
  if (m < 12)
    return (
      parseInt(m) + " " + window.strings.Dashboard_month ||
      " month" + (parseInt(m) > 1 ? "s" : "") + " ago"
    );
  var y = m / 12;
  return (
    parseInt(y) + " " + window.strings.Dashboard_year ||
    " year" + (parseInt(y) > 1 ? "s" : "") + " ago"
  );
}
