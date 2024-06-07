import interval from "d3-time/src/interval.js";
import {toDateTime} from "../dateTimeUtil.js";

function zonedWeekday(zone = "UTC", firstDayOfWeek = 7) {
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

export function zonedWeek(zone, firstDayOfWeek) {
    return zonedWeekday(zone, firstDayOfWeek);
}
export function zonedWeeks(zone, firstDayOfWeek, ...additionalArguments) {
    return zonedWeekday(zone, firstDayOfWeek).range(additionalArguments);
}

export var zonedMonday = function(zone) {return zonedWeekday(zone, 1);}
export var zonedTuesday = function(zone) {return zonedWeekday(zone, 2);}
export var zonedWednesday = function(zone) {return zonedWeekday(zone, 3);}
export var zonedThursday = function(zone) {return zonedWeekday(zone, 4);}
export var zonedFriday = function(zone) {return zonedWeekday(zone, 5);}
export var zonedSaturday = function(zone) {return zonedWeekday(zone, 6);}
export var zonedSunday = function(zone) {return zonedWeekday(zone, 7);}

export function zonedMondays(zone, ...additionalArguments) {return zonedWeekday(zone, 1).range(additionalArguments);}
export function zonedTuesdays(zone, ...additionalArguments) {return zonedWeekday(zone, 2).range(additionalArguments);}
export function zonedWednesdays(zone, ...additionalArguments) {return zonedWeekday(zone, 3).range(additionalArguments);}
export function zonedThursdays(zone, ...additionalArguments) {return zonedWeekday(zone, 4).range(additionalArguments);}
export function zonedFridays(zone, ...additionalArguments) {return zonedWeekday(zone, 5).range(additionalArguments);}
export function zonedSaturdays(zone, ...additionalArguments) {return zonedWeekday(zone, 6).range(additionalArguments);}
export function zonedSundays(zone, ...additionalArguments) {return zonedWeekday(zone, 7).range(additionalArguments);}


