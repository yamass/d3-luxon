import {timeInterval as interval} from "../../node_modules/d3-time/src/interval.js";
import {toDateTime} from "../dateTimeUtil.js";

function zonedHour(zone = "UTC") {
    const dt = toDateTime.bind(null, zone);
    return interval(function (date) {
        date.setTime(dt(date).startOf("hour").valueOf());
    }, function (date, step) {
        date.setTime(dt(date).plus({hour: step}).valueOf());
    }, function (start, end) {
        return dt(end).diff(dt(start), "hour").hours;
    }, function (date) {
        return dt(date).hour;
    });
}

export default zonedHour;

export function zonedHours(zone, ...additionalArguments) {
    return zonedHour(zone).range(additionalArguments);
}
