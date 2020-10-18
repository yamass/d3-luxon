import interval from "../node_modules/d3-time/src/interval";
import {toDateTime} from "./dateTimeUtil";

function zonedHour(zone) {
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

export function zonedHours(zone) {
    return zonedHour(zone).range;
}
