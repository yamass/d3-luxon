import {timeInterval as interval} from "../../node_modules/d3-time/src/interval.js";
import {toDateTime} from "../dateTimeUtil.js";

function zonedYear(zone = "UTC") {
  const dt = toDateTime.bind(null, zone);
  return interval(function (date) {
    date.setTime(dt(date).startOf("year").valueOf());
  }, function (date, step) {
    date.setTime(dt(date).plus({year: step}).valueOf());
  }, function (start, end) {
    return dt(end).diff(dt(start), "year").years;
  }, function (date) {
    return dt(date).year;
  });
}

export default zonedYear;

export function zonedYears(zone, ...additionalArguments) {
  return zonedYear(zone).range(additionalArguments);
}
