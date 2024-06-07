import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedSunday.floor(date) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2010, 11, 26));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2010, 11, 26));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 0, 1, 0, 0, 1)), date.utc(2010, 11, 26));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 0, 1, 23, 59, 59)), date.utc(2010, 11, 26));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 0, 2, 0, 0, 0)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 0, 2, 0, 0, 1)), date.utc(2011, 0, 2));
});

it(`zonedSunday.floor(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 2, 13, 1)), date.utc(2011, 2, 13));
  assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(2011, 10, 6, 1)), date.utc(2011, 10, 6));
});

// // TODO not sure if luxon can do that...
// tape.skip("zonedSunday.floor(date) handles years in the first century", () => {
//   assert.deepEqual(time.zonedSunday("UTC").floor(date.utc(11, 10, 6, 7)), date.utc(11, 10, 1));
// });

it(`zonedSunday.ceil(date) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 1)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 0, 1, 23, 59, 59)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 0, 2, 0, 0, 0)), date.utc(2011, 0, 2));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 0, 2, 0, 0, 1)), date.utc(2011, 0, 9));
});

it(`zonedSunday.ceil(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 2, 13, 1)), date.utc(2011, 2, 20));
  assert.deepEqual(time.zonedSunday("UTC").ceil(date.utc(2011, 10, 6, 1)), date.utc(2011, 10, 13));
});

it(`zonedSunday.offset(date) is an alias for zonedSunday.offset(date, 1)`, () => {
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999)), date.utc(2011, 0, 7, 23, 59, 59, 999));
});

it(`zonedSunday.offset(date, step) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedSunday("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedSunday.offset(date, step) does not round the passed-in date`, () => {
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 0, 7, 23, 59, 59, 999));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 11, 17, 23, 59, 59, 456));
});

it(`zonedSunday.offset(date, step) allows step to be negative`, () => {
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 1), -1), date.utc(2010, 10, 24));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2011, 0, 1), -2), date.utc(2010, 11, 18));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2011, 0, 1), -1), date.utc(2010, 11, 25));
});

it(`zonedSunday.offset(date, step) allows step to be positive`, () => {
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 10, 24), +1), date.utc(2010, 11, 1));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 18), +2), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 25), +1), date.utc(2011, 0, 1));
});

it(`zonedSunday.offset(date, step) allows step to be zero`, () => {
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedSunday("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedSunday.range(start, stop) returns Sundays between start (inclusive) and stop (exclusive)`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(date.utc(2011, 11, 1), date.utc(2012, 0, 15)), [
    date.utc(2011, 11, 4),
    date.utc(2011, 11, 11),
    date.utc(2011, 11, 18),
    date.utc(2011, 11, 25),
    date.utc(2012, 0, 1),
    date.utc(2012, 0, 8)
  ]);
});

it(`zonedSunday.range(start, stop) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(date.utc(2011, 11, 1, 12, 23), date.utc(2012, 0, 14, 12, 23)), [
    date.utc(2011, 11, 4),
    date.utc(2011, 11, 11),
    date.utc(2011, 11, 18),
    date.utc(2011, 11, 25),
    date.utc(2012, 0, 1),
    date.utc(2012, 0, 8)
  ]);
});

it(`zonedSunday.range(start, stop) coerces start and stop to dates`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(+date.utc(2011, 11, 1), +date.utc(2012, 0, 15)), [
    date.utc(2011, 11, 4),
    date.utc(2011, 11, 11),
    date.utc(2011, 11, 18),
    date.utc(2011, 11, 25),
    date.utc(2012, 0, 1),
    date.utc(2012, 0, 8)
  ]);
});

it(`zonedSunday.range(start, stop) returns the empty array for invalid dates`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(new Date(NaN), Infinity), []);
});

it(`zonedSunday.range(start, stop) returns the empty array if start >= stop`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(date.utc(2011, 11, 10), date.utc(2011, 10, 4)), []);
  assert.deepEqual(time.zonedSunday("UTC").range(date.utc(2011, 10, 1), date.utc(2011, 10, 1)), []);
});

it(`zonedSunday.range(start, stop, step) returns every step Sunday`, () => {
  assert.deepEqual(time.zonedSunday("UTC").range(date.utc(2011, 11, 1), date.utc(2012, 0, 15), 2), [
    date.utc(2011, 11, 4),
    date.utc(2011, 11, 18),
    date.utc(2012, 0, 1)
  ]);
});

it(`zonedSunday.count(start, end) counts Sundays after start (exclusive) and before end (inclusive)`, () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 4)), 0);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 5)), 1);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 6)), 1);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 12)), 2);

  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2012, 0, 1), date.utc(2012, 0, 7)), 0);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2012, 0, 1), date.utc(2012, 0, 8)), 1);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2012, 0, 1), date.utc(2012, 0, 9)), 1);
});

it(`zonedSunday.count(start, end) does not observe daylight saving`, () => {
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 1)), 11);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 3)), 11);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 4)), 11);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 0)), 45);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 1)), 45);
  assert.strictEqual(time.zonedSunday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 2)), 45);
});
