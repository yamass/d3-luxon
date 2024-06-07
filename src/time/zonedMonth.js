import interval from "d3-time/src/interval.js";
import {toDateTime} from "../dateTimeUtil.js";

function zonedMonth(zone = "UTC") {
  const dt = toDateTime.bind(null, zone);
  return interval(function (date) {
    date.setTime(dt(date).startOf("month").valueOf());
  }, function (date, step) {
    date.setTime(dt(date).plus({month: step}).valueOf());
  }, function (start, end) {
    return dt(end).diff(dt(start), "month").months;
  }, function (date) {
    return dt(date).month - 1;
  });
}

export default zonedMonth;

export function zonedMonths(zone, ...additionalArguments) {
  return zonedMonth(zone).range(additionalArguments);
}
