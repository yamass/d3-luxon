import assert from "assert";
import * as time from "../../dist/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedSunday(${zone}).floor(date) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 11, 26));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 0, 0)), date.zoned(zone, 2010, 11, 26));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 0, 1)), date.zoned(zone, 2010, 11, 26));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 0, 1, 23, 59, 59)), date.zoned(zone, 2010, 11, 26));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 0, 2, 0, 0, 0)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 0, 2, 0, 0, 1)), date.zoned(zone, 2011, 0, 2));
});

it(`zonedSunday(${zone}).floor(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 2, 13, 1)), date.zoned(zone, 2011, 2, 13));
  assert.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 10, 6, 1)), date.zoned(zone, 2011, 10, 6));
});

it(`zonedSunday(${zone}).ceil(date) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 0, 0)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 0, 1)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 0, 1, 23, 59, 59)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 0, 2, 0, 0, 0)), date.zoned(zone, 2011, 0, 2));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 0, 2, 0, 0, 1)), date.zoned(zone, 2011, 0, 9));
});

it(`zonedSunday(${zone}).ceil(date) observes daylight saving`, () => {
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 2, 13, 1)), date.zoned(zone, 2011, 2, 20));
  assert.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 10, 6, 1)), date.zoned(zone, 2011, 10, 13));
});

it(`zonedSunday(${zone}).offset(date) is an alias for zonedSunday(${zone}).offset(date, 1)`, () => {
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999)), date.zoned(zone, 2011, 0, 7, 23, 59, 59, 999));
});

it(`zonedSunday(${zone}).offset(date, step) does not modify the passed-in date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedSunday(zone).offset(d, +1);
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedSunday(${zone}).offset(date, step) does not round the passed-in date`, () => {
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 0, 7, 23, 59, 59, 999));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 17, 23, 59, 59, 456));
});

it(`zonedSunday(${zone}).offset(date, step) allows step to be negative`, () => {
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 1), -1), date.zoned(zone, 2010, 10, 24));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2011, 0, 1), -2), date.zoned(zone, 2010, 11, 18));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2011, 0, 1), -1), date.zoned(zone, 2010, 11, 25));
});

it(`zonedSunday(${zone}).offset(date, step) allows step to be positive`, () => {
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 10, 24), +1), date.zoned(zone, 2010, 11, 1));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 18), +2), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 25), +1), date.zoned(zone, 2011, 0, 1));
});

it(`zonedSunday(${zone}).offset(date, step) allows step to be zero`, () => {
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedSunday(${zone}).range(start, stop) returns Sundays between start (inclusive) and stop (exclusive)`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 1), date.zoned(zone, 2012, 0, 15)), [
    date.zoned(zone, 2011, 11, 4),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 0, 1),
    date.zoned(zone, 2012, 0, 8)
  ]);
});

it(`zonedSunday(${zone}).range(start, stop) returns Sundays`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 1, 12, 23), date.zoned(zone, 2012, 0, 14, 12, 23)), [
    date.zoned(zone, 2011, 11, 4),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 0, 1),
    date.zoned(zone, 2012, 0, 8)
  ]);
});

it(`zonedSunday(${zone}).range(start, stop) coerces start and stop to dates`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(+date.zoned(zone, 2011, 11, 1), +date.zoned(zone, 2012, 0, 15)), [
    date.zoned(zone, 2011, 11, 4),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 0, 1),
    date.zoned(zone, 2012, 0, 8)
  ]);
});

it(`zonedSunday(${zone}).range(start, stop) returns the empty array for invalid dates`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(new Date(NaN), Infinity), []);
});

it(`zonedSunday(${zone}).range(start, stop) returns the empty array if start >= stop`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 10), date.zoned(zone, 2011, 10, 4)), []);
  assert.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 10, 1), date.zoned(zone, 2011, 10, 1)), []);
});

it(`zonedSunday(${zone}).range(start, stop, step) returns every step Sunday`, () => {
  assert.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 1), date.zoned(zone, 2012, 0, 15), 2), [
    date.zoned(zone, 2011, 11, 4),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2012, 0, 1)
  ]);
});

it(`zonedSunday(${zone}).count(start, end) counts Sundays after start (exclusive) and before end (inclusive)`, () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2014, 0, 1), date.zoned(zone, 2014, 0, 4)), 0);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2014, 0, 1), date.zoned(zone, 2014, 0, 5)), 1);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2014, 0, 1), date.zoned(zone, 2014, 0, 6)), 1);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2014, 0, 1), date.zoned(zone, 2014, 0, 12)), 2);

  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 7)), 0);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 8)), 1);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 9)), 1);
});

it(`zonedSunday(${zone}).count(start, end) observes daylight saving`, () => {
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 1)), 11);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 3)), 11);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 4)), 11);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 0)), 45);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 1)), 45);
  assert.strictEqual(time.zonedSunday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 2)), 45);
});
