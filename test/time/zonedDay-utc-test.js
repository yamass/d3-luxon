import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedDay.floor(date) returns days`, () => {
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2010, 11, 31, 23)), date.utc(2010, 11, 31));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 0, 1, 0)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 0, 1, 1)), date.utc(2011, 0, 1));
});

it(`zonedDay.floor(date) does not observe daylight saving`, () => {
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 2, 13, 7)), date.utc(2011, 2, 13));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 2, 13, 8)), date.utc(2011, 2, 13));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 2, 13, 9)), date.utc(2011, 2, 13));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 2, 13, 10)), date.utc(2011, 2, 13));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 10, 6, 5)), date.utc(2011, 10, 6));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 10, 6, 6)), date.utc(2011, 10, 6));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 10, 6, 7)), date.utc(2011, 10, 6));
  assert.deepEqual(time.zonedDay("UTC").floor(date.utc(2011, 10, 6, 8)), date.utc(2011, 10, 6));
});

it(`zonedDay.round(date) returns days`, () => {
  assert.deepEqual(time.zonedDay("UTC").round(date.utc(2010, 11, 30, 13)), date.utc(2010, 11, 31));
  assert.deepEqual(time.zonedDay("UTC").round(date.utc(2010, 11, 30, 11)), date.utc(2010, 11, 30));
});

it(`zonedDay.ceil(date) returns days`, () => {
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2010, 11, 30, 23)), date.utc(2010, 11, 31));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2010, 11, 31, 0)), date.utc(2010, 11, 31));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2010, 11, 31, 1)), date.utc(2011, 0, 1));
});

it(`zonedDay.ceil(date) does not observe daylight saving`, () => {
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 2, 13, 7)), date.utc(2011, 2, 14));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 2, 13, 8)), date.utc(2011, 2, 14));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 2, 13, 9)), date.utc(2011, 2, 14));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 2, 13, 10)), date.utc(2011, 2, 14));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 10, 6, 5)), date.utc(2011, 10, 7));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 10, 6, 6)), date.utc(2011, 10, 7));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 10, 6, 7)), date.utc(2011, 10, 7));
  assert.deepEqual(time.zonedDay("UTC").ceil(date.utc(2011, 10, 6, 8)), date.utc(2011, 10, 7));
});

it(`zonedDay.offset(date) is an alias for zonedDay.offset(date, 1)`, () => {
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999)), date.utc(2011, 0, 1, 23, 59, 59, 999));
});

it(`zonedDay.offset(date, step) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedDay("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedDay.offset(date, step) does not round the passed-in date`, () => {
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 0, 1, 23, 59, 59, 999));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 11, 29, 23, 59, 59, 456));
});

it(`zonedDay.offset(date, step) allows step to be negative`, () => {
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31), -1), date.utc(2010, 11, 30));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2011, 0, 1), -2), date.utc(2010, 11, 30));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2011, 0, 1), -1), date.utc(2010, 11, 31));
});

it(`zonedDay.offset(date, step) allows step to be positive`, () => {
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31), +1), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 30), +2), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 30), +1), date.utc(2010, 11, 31));
});

it(`zonedDay.offset(date, step) allows step to be zero`, () => {
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedDay("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedDay.count(start, end) counts days after start (exclusive) and before end (inclusive)`, () => {
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1, 0), date.utc(2011, 4, 9, 0)), 128);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1, 1), date.utc(2011, 4, 9, 0)), 128);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2010, 11, 31, 23), date.utc(2011, 4, 9, 0)), 129);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1, 0), date.utc(2011, 4, 8, 23)), 127);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1, 0), date.utc(2011, 4, 9, 1)), 128);
});

it(`zonedDay.count(start, end) does not observe daylight saving`, () => {
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 1)), 71);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 3)), 71);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 4)), 71);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 0)), 309);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 1)), 309);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 2)), 309);
});

it(`zonedDay.count(start, end) returns 364 or 365 for a full year`, () => {
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(1999, 0, 1), date.utc(1999, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2000, 0, 1), date.utc(2000, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2001, 0, 1), date.utc(2001, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2002, 0, 1), date.utc(2002, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2003, 0, 1), date.utc(2003, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2004, 0, 1), date.utc(2004, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2005, 0, 1), date.utc(2005, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2006, 0, 1), date.utc(2006, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2007, 0, 1), date.utc(2007, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2008, 0, 1), date.utc(2008, 11, 31)), 365); // leap year
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2009, 0, 1), date.utc(2009, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2010, 0, 1), date.utc(2010, 11, 31)), 364);
  assert.strictEqual(time.zonedDay("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 11, 31)), 364);
});

it(`zonedDay.every(step) returns every stepth day, starting with the first day of the month`, () => {
  assert.deepEqual(time.zonedDay("UTC").every(3).range(date.utc(2008, 11, 30, 0, 12), date.utc(2009, 0, 5, 23, 48)), [date.utc(2008, 11, 31), date.utc(2009, 0, 1), date.utc(2009, 0, 4)]);
  assert.deepEqual(time.zonedDay("UTC").every(5).range(date.utc(2008, 11, 30, 0, 12), date.utc(2009, 0, 6, 23, 48)), [date.utc(2008, 11, 31), date.utc(2009, 0, 1), date.utc(2009, 0, 6)]);
  assert.deepEqual(time.zonedDay("UTC").every(7).range(date.utc(2008, 11, 30, 0, 12), date.utc(2009, 0, 8, 23, 48)), [date.utc(2009, 0, 1), date.utc(2009, 0, 8)]);
});
