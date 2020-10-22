import {utcFormat} from "d3-time-format";
import {calendar} from "../../node_modules/d3-scale/src/time";
import {initRange} from "../../node_modules/d3-scale/src/init";
import zonedYear from "../time/zonedYear";
import zonedMonth from "../time/zonedMonth";
import {zonedWeek} from "../time/zonedWeek";
import zonedDay from "../time/zonedDay";
import zonedHour from "../time/zonedHour";
import zonedMinute from "../time/zonedMinute";
import {utcMillisecond, utcSecond} from "d3-time";
import {DateTime} from "luxon";

const formatMillisecond = (dateTime) => "." + String(dateTime.millisecond).padStart(3, "0");
const formatSecond = (dateTime) => ":" + String(dateTime.second).padStart(2, "0");
const formatMinute = (dateTime) => dateTime.toLocaleParts({
    hour: "numeric",
    minute: "2-digit"
}).filter(p => p.type !== "dayPeriod").map(p => p.value).join("").trim();
const formatHour = (dateTime) => {
    let parts = dateTime.toLocaleParts({hour: "numeric", minute: "2-digit"});
    if (parts.find(p => p.type === "dayPeriod")) {
        return parts.filter(p => p.type !== "minute" && p.value !== ":").map(p => p.value).join("");
    } else {
        return parts.map(p => p.value).join("")
    }
}
const formatDay = (dateTime) => dateTime.toLocaleString({day: "numeric", month: "short"});
const formatMonth = (dateTime) => dateTime.toLocaleString({month: "long"});
const formatYear = (dateTime) => dateTime.toLocaleString({year: "numeric"});

export function tickFormat(zone, locale = (typeof (navigator) !== "undefined" && navigator.language) || "en-US") {
    return (date) => {
        const dateTime = DateTime.fromMillis(+date)
            .setZone(zone)
            .setLocale(locale);
        let formatter = dateTime.startOf("second") < dateTime ? formatMillisecond
            : dateTime.startOf("minute") < dateTime ? formatSecond
                : dateTime.startOf("hour") < dateTime ? formatMinute
                    : dateTime.startOf("day") < dateTime ? formatHour
                        : dateTime.startOf("month") < dateTime ? formatDay
                            : dateTime.startOf("year") < dateTime ? formatMonth
                                : formatYear;
        return formatter(dateTime);
    }
}

export default function scaleZoned(zone, firstDayOfWeek, locale, ...additionalArguments) {
    let scale = initRange.apply(calendar(zonedYear(zone), zonedMonth(zone), zonedWeek(zone, firstDayOfWeek), zonedDay(zone), zonedHour(zone), zonedMinute(zone), utcSecond, utcMillisecond, utcFormat)
        .domain([DateTime.fromObject({year: 2000, month: 1, day: 1, zone: zone}).toJSDate(), DateTime.fromObject({year: 2000, month: 1, day: 2, zone: zone}).toJSDate()]), additionalArguments);
    scale.tickFormat = tickFormat.bind(null, zone, locale);
    return scale;
}
