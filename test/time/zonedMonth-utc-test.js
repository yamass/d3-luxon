import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedMonth.floor(date) returns months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2010, 11, 31, 23)), date.utc(2010, 11, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 0, 1, 0)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 0, 1, 1)), date.utc(2011, 0, 1));
});

it(`zonedMonth.floor(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 2, 13, 7)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 2, 13, 8)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 2, 13, 9)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 2, 13, 10)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 10, 6, 7)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 10, 6, 8)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 10, 6, 9)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(2011, 10, 6, 10)), date.utc(2011, 10, 1));
});

it(`zonedMonth.floor(date) handles years in the first century`, () => {
  assert.deepEqual(time.zonedMonth("UTC").floor(date.utc(11, 10, 6, 7)), date.utc(11, 10, 1));
});

it(`zonedMonth.round(date) returns months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2010, 11, 16, 12)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2010, 11, 16, 11)), date.utc(2010, 11, 1));
});

it(`zonedMonth.round(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 2, 13, 7)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 2, 13, 8)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 2, 13, 9)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 2, 13, 20)), date.utc(2011, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 10, 6, 7)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 10, 6, 8)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 10, 6, 9)), date.utc(2011, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2011, 10, 6, 20)), date.utc(2011, 10, 1));
});

it(`zonedMonth.round(date) handles midnight for leap years`, () => {
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2012, 2, 1, 0)), date.utc(2012, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").round(date.utc(2012, 2, 1, 0)), date.utc(2012, 2, 1));
});

it(`zonedMonth.ceil(date) returns months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2010, 10, 30, 23)), date.utc(2010, 11, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2010, 11, 1, 1)), date.utc(2011, 0, 1));
});

it(`zonedMonth.ceil(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 2, 13, 7)), date.utc(2011, 3, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 2, 13, 8)), date.utc(2011, 3, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 2, 13, 9)), date.utc(2011, 3, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 2, 13, 10)), date.utc(2011, 3, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 10, 6, 7)), date.utc(2011, 11, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 10, 6, 8)), date.utc(2011, 11, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 10, 6, 9)), date.utc(2011, 11, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2011, 10, 6, 10)), date.utc(2011, 11, 1));
});

it(`zonedMonth.ceil(date) handles midnight for leap years`, () => {
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2012, 2, 1, 0)), date.utc(2012, 2, 1));
  assert.deepEqual(time.zonedMonth("UTC").ceil(date.utc(2012, 2, 1, 0)), date.utc(2012, 2, 1));
});

it(`zonedMonth.offset(date) is an alias for zonedMonth.offset(date, 1)`, () => {
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999)), date.utc(2011, 0, 31, 23, 59, 59, 999));
});

it(`zonedMonth.offset(date, step) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedMonth("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedMonth.offset(date, step) does not round the passed-in date`, () => {
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 0, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 9, 31, 23, 59, 59, 456));
});

it(`zonedMonth.offset(date, step) allows step to be negative`, () => {
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31), -1), date.utc(2010, 10, 30)); // !!
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2011, 0, 1), -2), date.utc(2010, 10, 1));
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2011, 0, 1), -1), date.utc(2010, 11, 1));
});

it(`zonedMonth.offset(date, step) allows step to be positive`, () => {
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31), +1), date.utc(2011, 0, 31));
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 30), +2), date.utc(2011, 1, 28)); // !!
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 30), +1), date.utc(2011, 0, 30));
});

it(`zonedMonth.offset(date, step) allows step to be zero`, () => {
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedMonth("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedMonth.range(start, stop) returns months between start (inclusive) and stop (exclusive)`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 11, 1), date.utc(2012, 5, 1)), [
    date.utc(2011, 11, 1),
    date.utc(2012, 0, 1),
    date.utc(2012, 1, 1),
    date.utc(2012, 2, 1),
    date.utc(2012, 3, 1),
    date.utc(2012, 4, 1)
  ]);
});

it(`zonedMonth.range(start, stop) returns months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 10, 4, 2), date.utc(2012, 4, 10, 13)), [
    date.utc(2011, 11, 1),
    date.utc(2012, 0, 1),
    date.utc(2012, 1, 1),
    date.utc(2012, 2, 1),
    date.utc(2012, 3, 1),
    date.utc(2012, 4, 1)
  ]);
});

it(`zonedMonth.range(start, stop) coerces start and stop to dates`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(+date.utc(2011, 10, 4), +date.utc(2012, 1, 7)), [
    date.utc(2011, 11, 1),
    date.utc(2012, 0, 1),
    date.utc(2012, 1, 1)
  ]);
});

it(`zonedMonth.range(start, stop) returns the empty array for invalid dates`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(new Date(NaN), Infinity), []);
});

it(`zonedMonth.range(start, stop) returns the empty array if start >= stop`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 11, 10), date.utc(2011, 10, 4)), []);
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 10, 1), date.utc(2011, 10, 1)), []);
});

it(`zonedMonth.range(start, stop) returns months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2010, 10, 31), date.utc(2011, 2, 1)), [
    date.utc(2010, 11, 1),
    date.utc(2011, 0, 1),
    date.utc(2011, 1, 1)
  ]);
});

it(`zonedMonth.range(start, stop) has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2010, 10, 31), date.utc(2011, 2, 1))[0], date.utc(2010, 11, 1));
});

it(`zonedMonth.range(start, stop) has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2010, 10, 31), date.utc(2011, 2, 1))[2], date.utc(2011, 1, 1));
});

it(`zonedMonth.range(start, stop) can skip months`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 1, 1), date.utc(2012, 1, 1), 3), [
    date.utc(2011, 1, 1),
    date.utc(2011, 4, 1),
    date.utc(2011, 7, 1),
    date.utc(2011, 10, 1)
  ]);
});

it(`zonedMonth.range(start, stop) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 0, 1), date.utc(2011, 4, 1)), [
    date.utc(2011, 0, 1),
    date.utc(2011, 1, 1),
    date.utc(2011, 2, 1),
    date.utc(2011, 3, 1)
  ]);
});

it(`zonedMonth.range(start, stop) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedMonth("UTC").range(date.utc(2011, 9, 1), date.utc(2012, 1, 1)), [
    date.utc(2011, 9, 1),
    date.utc(2011, 10, 1),
    date.utc(2011, 11, 1),
    date.utc(2012, 0, 1)
  ]);
});

it(`zonedMonth.count(start, end) counts months after start (exclusive) and before end (inclusive)`, () => {
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 4, 1)), 4);
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 3, 30)), 3);
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2010, 11, 31), date.utc(2011, 3, 30)), 4);
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2010, 11, 31), date.utc(2011, 4, 1)), 5);
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2009, 11, 31), date.utc(2012, 4, 1)), 29);
  assert.strictEqual(time.zonedMonth("UTC").count(date.utc(2012, 4, 1), date.utc(2009, 11, 31)), -29);
});

it(`zonedMonth.every(step) returns every stepth month, starting with the first month of the year`, () => {
  assert.deepEqual(time.zonedMonth("UTC").every(3).range(date.utc(2008, 11, 3), date.utc(2010, 6, 5)), [date.utc(2009, 0, 1), date.utc(2009, 3, 1), date.utc(2009, 6, 1), date.utc(2009, 9, 1), date.utc(2010, 0, 1), date.utc(2010, 3, 1), date.utc(2010, 6, 1)]);
});
