import {utcFormat} from "d3-time-format";
import {calendar} from "../../node_modules/d3-scale/src/time.js";
import {initRange} from "../../node_modules/d3-scale/src/init.js";
import zonedYear from "../time/zonedYear.js";
import zonedMonth from "../time/zonedMonth.js";
import {zonedWeek} from "../time/zonedWeek.js";
import zonedDay from "../time/zonedDay.js";
import zonedHour from "../time/zonedHour.js";
import zonedMinute from "../time/zonedMinute.js";
import {utcSecond, utcMillisecond} from "d3-time";
import {bisector, tickStep} from "d3-array";
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

function ticker(year, month, week, day, hour, minute) {

    const durationSecond = 1000;
    const durationMinute = durationSecond * 60
    const durationHour = durationMinute * 60;
    const durationDay = durationHour * 24;
    const durationWeek = durationDay * 7;
    const durationMonth = durationDay * 30;
    const durationYear = durationDay * 365;

    const tickIntervals = [
        [utcSecond,  1,      durationSecond],
        [utcSecond,  5,  5 * durationSecond],
        [utcSecond, 15, 15 * durationSecond],
        [utcSecond, 30, 30 * durationSecond],
        [minute,  1,      durationMinute],
        [minute,  5,  5 * durationMinute],
        [minute, 15, 15 * durationMinute],
        [minute, 30, 30 * durationMinute],
        [  hour,  1,      durationHour  ],
        [  hour,  3,  3 * durationHour  ],
        [  hour,  6,  6 * durationHour  ],
        [  hour, 12, 12 * durationHour  ],
        [   day,  1,      durationDay   ],
        [   day,  2,  2 * durationDay   ],
        [  week,  1,      durationWeek  ],
        [ month,  1,      durationMonth ],
        [ month,  3,  3 * durationMonth ],
        [  year,  1,      durationYear  ]
    ];

    function ticks(start, stop, count) {
        const reverse = stop < start;
        if (reverse) [start, stop] = [stop, start];
        const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
        const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
        return reverse ? ticks.reverse() : ticks;
    }

    function tickInterval(start, stop, count) {
        const target = Math.abs(stop - start) / count;
        const i = bisector(([,, step]) => step).right(tickIntervals, target);
        if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
        if (i === 0) return utcMillisecond.every(Math.max(tickStep(start, stop, count), 1));
        const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        return t.every(step);
    }

    return [ticks, tickInterval];
}

export default function scaleZoned(zone, firstDayOfWeek, locale, ...additionalArguments) {
    const [timeTicks, timeTickInterval] = ticker(zonedYear(zone), zonedMonth(zone), zonedWeek(zone), zonedDay(zone), zonedHour(zone), zonedMinute(zone));
    let scale = initRange.apply(calendar(timeTicks, timeTickInterval, zonedYear(zone), zonedMonth(zone), zonedWeek(zone, firstDayOfWeek), zonedDay(zone), zonedHour(zone), zonedMinute(zone), utcSecond, utcFormat)
        .domain([DateTime.fromObject({year: 2000, month: 1, day: 1, zone: zone}).toJSDate(), DateTime.fromObject({year: 2000, month: 1, day: 2, zone: zone}).toJSDate()]), additionalArguments);
    scale.tickFormat = tickFormat.bind(null, zone, locale);
    return scale;
}
