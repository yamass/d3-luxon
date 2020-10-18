import interval from "../../node_modules/d3-time/src/interval";
import {toDateTime} from "../dateTimeUtil";

function zonedDay(zone = "UTC") {
    const dt = toDateTime.bind(null, zone);
    return interval(function (date) {
        date.setTime(dt(date).startOf("day").valueOf());
    }, function (date, step) {
        date.setTime(dt(date).plus({day: step}).valueOf());
    }, function (start, end) {
        return dt(end).diff(dt(start), "day").days;
    }, function (date) {
        return dt(date).day - 1; // -1 for the sake of consistency with the utc implementation
    });
}

export default zonedDay;

export function zonedDays(zone, ...additionalArguments) {
    return zonedDay(zone).range(additionalArguments);
}
