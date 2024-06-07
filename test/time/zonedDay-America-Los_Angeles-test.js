import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedDay(${zone})() is equivalent to zonedDay(${zone}).floor(new Date)`, () => {
  var t = new Date;
  assert.deepEqual(time.zonedDay(zone)(), time.zonedDay(zone).floor(t));
});

it(`zonedDay(${zone})(date) is equivalent to zonedDay(${zone}).floor(date)`, () => {
  var t = new Date;
  assert.deepEqual(time.zonedDay(zone)(t), time.zonedDay(zone).floor(t));
});

it(`zonedDay(${zone}).floor(date) returns days`, () => {
  assert.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2010, 11, 31, 23)), date.zoned(zone, 2010, 11, 31));
  assert.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2011, 0, 1, 0)), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2011, 0, 1, 1)), date.zoned(zone, 2011, 0, 1));
});

it(`zonedDay(${zone}).floor(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 2, 13, 7)), date.zoned(zone, 2011, 2, 12));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 2, 13, 8)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 2, 13, 9)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 2, 13, 10)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 6, 7)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 6, 8)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 6, 9)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 6, 10)), date.zoned(zone, 2011, 10, 6));
});

it(`zonedDay(${zone}).floor(date) handles years in the first century`, () => {
  assert.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 11, 10, 6, 7)), date.zoned(zone, 11, 10, 6));
});

it(`zonedDay(${zone}).round(date) returns days`, () => {
  assert.deepEqual(time.zonedDay(zone).round(date.zoned(zone, 2010, 11, 30, 13)), date.zoned(zone, 2010, 11, 31));
  assert.deepEqual(time.zonedDay(zone).round(date.zoned(zone, 2010, 11, 30, 11)), date.zoned(zone, 2010, 11, 30));
});

it(`zonedDay(${zone}).round(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 2, 13, 7)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 2, 13, 8)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 2, 13, 9)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 2, 13, 20)), date.zoned(zone, 2011, 2, 14));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 6, 7)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 6, 8)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 6, 9)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 6, 20)), date.zoned(zone, 2011, 10, 7));
});

it(`zonedDay(${zone}).round(date) handles midnight in leap years`, () => {
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2012, 2, 1, 0)), date.zoned(zone, 2012, 2, 1));
  assert.deepEqual(time.zonedDay(zone).round(date.utc(2012, 2, 1, 0)), date.zoned(zone, 2012, 2, 1));
});

it(`zonedDay(${zone}).ceil(date) returns days`, () => {
  assert.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 30, 23)), date.zoned(zone, 2010, 11, 31));
  assert.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 31, 0)), date.zoned(zone, 2010, 11, 31));
  assert.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 31, 1)), date.zoned(zone, 2011, 0, 1));
});

it(`zonedDay(${zone}).ceil(date) observes start of daylight saving`, () => {
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 2, 13, 7)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 2, 13, 8)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 2, 13, 9)), date.zoned(zone, 2011, 2, 14));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 2, 13, 10)), date.zoned(zone, 2011, 2, 14));
});

it(`zonedDay(${zone}).ceil(date) observes end of daylight saving`, () => {
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 6, 7)), date.zoned(zone, 2011, 10, 6));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 6, 8)), date.zoned(zone, 2011, 10, 7));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 6, 9)), date.zoned(zone, 2011, 10, 7));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 6, 10)), date.zoned(zone, 2011, 10, 7));
});

it(`zonedDay(${zone}).ceil(date) handles midnight for leap years`, () => {
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2012, 2, 1, 0)), date.zoned(zone, 2012, 2, 1));
  assert.deepEqual(time.zonedDay(zone).ceil(date.utc(2012, 2, 1, 0)), date.zoned(zone, 2012, 2, 1));
});

it(`zonedDay(${zone}).offset(date) is an alias for zonedDay(${zone}).offset(date, 1)`, () => {
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999)), date.zoned(zone, 2011, 0, 1, 23, 59, 59, 999));
});

it(`zonedDay(${zone}).offset(date, step) does not modify the passed-in date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedDay(zone).offset(d, +1);
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedDay(${zone}).offset(date, step) does not round the passed-in date`, () => {
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 0, 1, 23, 59, 59, 999));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 29, 23, 59, 59, 456));
});

it(`zonedDay(${zone}).offset(date, step) allows step to be negative`, () => {
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31), -1), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2011, 0, 1), -2), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2011, 0, 1), -1), date.zoned(zone, 2010, 11, 31));
});

it(`zonedDay(${zone}).offset(date, step) allows step to be positive`, () => {
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31), +1), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 30), +2), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 30), +1), date.zoned(zone, 2010, 11, 31));
});

it(`zonedDay(${zone}).offset(date, step) allows step to be zero`, () => {
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedDay(${zone}).range(start, stop) returns days between start (inclusive) and stop (exclusive)`, () => {
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 4), date.zoned(zone, 2011, 10, 10)), [
    date.zoned(zone, 2011, 10, 4),
    date.zoned(zone, 2011, 10, 5),
    date.zoned(zone, 2011, 10, 6),
    date.zoned(zone, 2011, 10, 7),
    date.zoned(zone, 2011, 10, 8),
      date.zoned(zone, 2011, 10, 9)
]);
});

it(`zonedDay(${zone}).range(start, stop) returns days`, () => {
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 4, 2), date.zoned(zone, 2011, 10, 10, 13)), [
    date.zoned(zone, 2011, 10, 5),
    date.zoned(zone, 2011, 10, 6),
    date.zoned(zone, 2011, 10, 7),
    date.zoned(zone, 2011, 10, 8),
      date.zoned(zone, 2011, 10, 9),
  date.zoned(zone, 2011, 10, 10)
]);
});

it(`zonedDay(${zone}).range(start, stop) coerces start and stop to dates`, () => {
  assert.deepEqual(time.zonedDay(zone).range(+date.zoned(zone, 2011, 10, 4), +date.zoned(zone, 2011, 10, 7)), [
    date.zoned(zone, 2011, 10, 4),
    date.zoned(zone, 2011, 10, 5),
    date.zoned(zone, 2011, 10, 6)
  ]);
});

it(`zonedDay(${zone}).range(start, stop) returns the empty array for invalid dates`, () => {
  assert.deepEqual(time.zonedDay(zone).range(new Date(NaN), Infinity), []);
});

it(`zonedDay(${zone}).range(start, stop) returns the empty array if start >= stop`, () => {
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 10), date.zoned(zone, 2011, 10, 4)), []);
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 10), date.zoned(zone, 2011, 10, 10)), []);
});

it(`zonedDay(${zone}).range(start, stop, step) returns every step day`, () => {
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 4, 2), date.zoned(zone, 2011, 10, 14, 13), 3), [
    date.zoned(zone, 2011, 10, 5),
    date.zoned(zone, 2011, 10, 8),
      date.zoned(zone, 2011, 10, 11),
      date.zoned(zone, 2011, 10, 14)
]);
});

it(`zonedDay(${zone}).range(start, stop, step) returns the empty array if step is zero, negative or NaN`, () => {
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 0), 0), []);
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 0), -1), []);
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 0), 0.5), []);
  assert.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 0), NaN), []);
});

it(`zonedDay(${zone}).count(start, end) counts days after start (exclusive) and before end (inclusive)`, () => {
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 0)), 128);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1, 1), date.zoned(zone, 2011, 4, 9, 0)), 128);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 4, 9, 0)), 129);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 8, 23)), 127);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1, 0), date.zoned(zone, 2011, 4, 9, 1)), 128);
});

it(`zonedDay(${zone}).count(start, end) observes daylight saving`, () => {
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 1)), 71);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 3)), 71);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 4)), 71);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 0)), 309);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 1)), 309);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 2)), 309);
});

it(`zonedDay(${zone}).count(start, stop) does not exhibit floating-point rounding error`, () => {
  var d = date.zoned(zone, 2011, 4, 9);
  assert.strictEqual(time.zonedDay(zone).count(time.zonedYear(zone)(d), d), 128);
});

it(`zonedDay(${zone}).count(start, end) returns 364 or 365 for a full year`, () => {
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 1999, 0, 1), date.zoned(zone, 1999, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2000, 0, 1), date.zoned(zone, 2000, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2001, 0, 1), date.zoned(zone, 2001, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2002, 0, 1), date.zoned(zone, 2002, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2003, 0, 1), date.zoned(zone, 2003, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2004, 0, 1), date.zoned(zone, 2004, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2005, 0, 1), date.zoned(zone, 2005, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2006, 0, 1), date.zoned(zone, 2006, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2007, 0, 1), date.zoned(zone, 2007, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2008, 0, 1), date.zoned(zone, 2008, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2010, 11, 31)), 364);
  assert.strictEqual(time.zonedDay(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 11, 31)), 364);
});

it(`zonedDay(${zone}).every(step) returns every stepth day, starting with the first day of the month`, () => {
  assert.deepEqual(time.zonedDay(zone).every(3).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 5, 23, 48)), [date.zoned(zone, 2008, 11, 31), date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 4)]);
  assert.deepEqual(time.zonedDay(zone).every(5).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 6, 23, 48)), [date.zoned(zone, 2008, 11, 31), date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 6)]);
  assert.deepEqual(time.zonedDay(zone).every(7).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 8, 23, 48)), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 8)]);
});


