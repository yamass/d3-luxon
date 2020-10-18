import interval from "../node_modules/d3-time/src/interval";
import {toDateTime} from "./dateTimeUtil";

function zonedMinute(zone = "UTC") {
    const dt = toDateTime.bind(null, zone);
    return interval(function (date) {
        date.setTime(dt(date).startOf("minute").valueOf());
    }, function (date, step) {
        date.setTime(dt(date).plus({minute: step}).valueOf());
    }, function (start, end) {
        return dt(end).diff(dt(start), "minute").minutes;
    }, function (date) {
        return dt(date).minute;
    });
}

export default zonedMinute;

export function zonedMinutes(zone, ...additionalArguments) {
    return zonedMinute(zone).range(additionalArguments);
}
