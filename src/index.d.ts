import {ScaleTime} from "d3-scale";
import {CountableTimeInterval} from "d3-time";

// === Time ===

/**
 * Minutes Interval in the specified time zone; minutes (e.g., 01:02:00 AM); 60 seconds.
 * Note that ECMAScript ignores leap seconds.
 *
 * @param zone IANA time zone name
 */
export function zonedMinute(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedMinute(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedMinutes(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Hours Interval in the specified time zone; Hours (e.g., 01:00 AM); 60 minutes.
 *
 * @param zone IANA time zone name
 */
export function zonedHour(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedHour(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedHours(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Days Interval in the specified time zone; days (e.g., February 7, 2012 at 12:00 AM); 24 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedDay(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedDay(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedDays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval in Local Time. Alias for sunday; 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 * @param firstDayOfWeek 1=Monday, 7=Sunday
 */
export function zonedWeek(zone: string, firstDayOfWeek: number): CountableTimeInterval;

/**
 * This is a convenience alias for zonedWeek(firstDayOfWeek, zone).range(...).
 *
 * @param zone IANA time zone name
 * @param firstDayOfWeek 1=Monday, 7=Sunday
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedWeeks(zone: string, firstDayOfWeek: number, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Sunday-based weeks in the specified time zone (e.g., February 5, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedSunday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedSunday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedSundays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Monday-based weeks in the specified time zone (e.g., February 6, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedMonday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedMonday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedMondays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Tuesday-based weeks in the specified time zone (e.g., February 7, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedTuesday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedTuesday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedTuesdays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Wednesday-based weeks in the specified time zone (e.g., February 8, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedWednesday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedWednesday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedWednesdays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Thursday-based weeks in the specified time zone (e.g., February 9, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedThursday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedThursday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedThursdays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Friday-based weeks in the specified time zone (e.g., February 10, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedFriday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedFriday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedFridays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Week Interval for Saturday-based weeks in the specified time zone (e.g., February 11, 2012 at 12:00 AM).
 * 7 days and 168 hours.
 *
 * @param zone IANA time zone name
 */
export function zonedSaturday(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedSaturday(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedSaturdays(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Month Interval in the specified time zone; months (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.
 *
 * @param zone IANA time zone name
 */
export function zonedMonth(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedMonth(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedMonths(zone: string, start: Date, stop: Date, step?: number): Date[];

/**
 * Year Interval in the specified time zone; years (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.
 *
 * @param zone IANA time zone name
 */
export function zonedYear(zone: string): CountableTimeInterval;

/**
 * This is a convenience alias for zonedYear(zone).range(...).
 *
 * @param zone IANA time zone name
 * @param start A start date object for the range.
 * @param stop A stop date object for the range.
 * @param step An optional number of steps to apply when calculating the dates in the range.
 */
export function zonedYears(zone: string, start: Date, stop: Date, step?: number): Date[];


// === Scale ===
/**
 * Constructs a new time scale using the specified time zone with the domain [2000-01-01, 2000-01-02], the unit range [0, 1], the default interpolator and clamping disabled.
 *
 * The scale will have range and output of data type number.
 */
export function scaleZoned(zone: string, firstDayOfWeek: number): ScaleTime<number, number>;
/**
 * Constructs a new time scale using the specified time zone with the domain [2000-01-01, 2000-01-02], the default interpolator and clamping disabled.
 *
 * The generic corresponds to the data type of the range and output elements to be used.
 *
 * As range type and output type are the same, the interpolator factory used with the scale must match this behavior.
 *
 * The range must be set in accordance with the range element type.
 *
 * The interpolator factory may be set using the interpolate(...) method of the scale.
 */
export function scaleZoned<Output>(zone: string, firstDayOfWeek: number): ScaleTime<Output, Output>;
/**
 * Constructs a new time scale using the specified time zone with the domain [2000-01-01, 2000-01-02], the default interpolator and clamping disabled.
 *
 * The first generic corresponds to the data type of the range elements.
 * The second generic corresponds to the data type of the output elements generated by the scale.
 *
 * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
 * convert the interpolated range element to a corresponding output element.
 *
 * The range must be set in accordance with the range element type.
 *
 * The interpolator factory may be set using the interpolate(...) method of the scale.
 */
export function scaleZoned<Range, Output>(zone: string, firstDayOfWeek: number): ScaleTime<Range, Output>;
