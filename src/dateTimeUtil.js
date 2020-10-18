import {DateTime} from "luxon";

export function applyDateTimeToDate(dateTime, date) {
    date.set
}

export function toDateTime(zone, date) {
    let dateTime = DateTime.fromMillis(+date);
    if (zone != null) {
        return dateTime.setZone(zone);
    } else {
        return dateTime;
    }
}