import {utcFormat} from "d3-time-format";
import {calendar} from "../node_modules/d3-scale/src/time";
import {initRange} from "../node_modules/d3-scale/src/init";
import zonedYear from "./zonedYear";
import zonedMonth from "./zonedMonth";
import {zonedWeek} from "./zonedWeek";
import zonedDay from "./zonedDay";
import zonedHour from "./zonedHour";
import zonedMinute from "./zonedMinute";
import {utcMillisecond, utcSecond} from "d3-time";
import {DateTime} from "luxon";

export default function zonedTime(zone, firstDayOfWeek, ...additionalArguments) {
  return initRange.apply(calendar(zonedYear(zone), zonedMonth(zone), zonedWeek(firstDayOfWeek, zone), zonedDay(zone), zonedHour(zone), zonedMinute(zone), utcSecond, utcMillisecond, utcFormat)
      .domain([DateTime.fromObject({year: 2000, month: 1, day: 1, zone: zone}).toJSDate(), DateTime.fromObject({year: 2000, month: 1, day: 2, zone: zone})]), additionalArguments);
}
