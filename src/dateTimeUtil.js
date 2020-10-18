import {DateTime} from "luxon";

export function toDateTime(zone, date) {
    let dateTime = DateTime.fromMillis(+date);
    return zone != null ? dateTime.setZone(zone) : dateTime;
}