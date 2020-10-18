import interval from "../node_modules/d3-time/src/interval";
import {toDateTime} from "./dateTimeUtil";

function zonedWeekday(firstDayOfWeek, zone) {
    const dt = toDateTime.bind(null, zone);
    return interval(function (date) {
        let dateTime = dt(date);
        date.setTime(dateTime.set({weekday: firstDayOfWeek <= dateTime.weekday ? firstDayOfWeek : firstDayOfWeek - 7}).startOf("day").valueOf());
    }, function (date, step) {
        date.setTime(dt(date).plus({day: step * 7}).valueOf());
    }, function (start, end) {
        return dt(end).diff(dt(start), "week").weeks;
    });
}

export function zonedWeek(firstDayOfWeek, zone) {
    return zonedWeekday(firstDayOfWeek, zone);
}
export function zonedWeeks(firstDayOfWeek, zone) {
    return zonedWeekday(firstDayOfWeek, zone).range;
}

export var zonedMonday = zonedWeekday.bind(null, 1);
export var zonedTuesday = zonedWeekday.bind(null, 2);
export var zonedWednesday = zonedWeekday.bind(null, 3);
export var zonedThursday = zonedWeekday.bind(null, 4);
export var zonedFriday = zonedWeekday.bind(null, 5);
export var zonedSaturday = zonedWeekday.bind(null, 6);
export var zonedSunday = zonedWeekday.bind(null, 7);

export function zonedMondays(zone) {
    return zonedMonday(zone).range;
}

export function zonedTuesdays(zone) {
    return zonedTuesday(zone).range;
}

export function zonedWednesdays(zone) {
    return zonedWednesday(zone).range;
}

export function zonedThursdays(zone) {
    return zonedThursday(zone).range;
}

export function zonedFridays(zone) {
    return zonedFriday(zone).range;
}

export function zonedSaturdays(zone) {
    return zonedSaturday(zone).range;
}

export function zonedSundays(zone) {
    return zonedSunday(zone).range;
}


