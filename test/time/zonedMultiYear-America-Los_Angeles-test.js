import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedYear(${zone}).every(n).floor(date) returns integer multiples of n years`, () => {
  assert.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2009, 11, 31, 23, 59, 59)), date.zoned(zone, 2000, 0, 1));
  assert.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2010, 0, 1, 0, 0, 0)), date.zoned(zone, 2010, 0, 1));
  assert.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2010, 0, 1, 0, 0, 1)), date.zoned(zone, 2010, 0, 1));
});

it(`zonedYear(${zone}).every(n).ceil(date) returns integer multiples of n years`, () => {
  assert.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 1999, 11, 31, 23, 59, 59)), date.zoned(zone, 2000, 0, 1));
  assert.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 2000, 0, 1, 0, 0, 0)), date.zoned(zone, 2000, 0, 1));
  assert.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 2000, 0, 1, 0, 0, 1)), date.zoned(zone, 2100, 0, 1));
});

it(`zonedYear(${zone}).every(n).offset(date, count) does not modify the passed-in date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear(zone).every(5).offset(d, +1);
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedYear(${zone}).every(n).offset(date, count) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedYear(zone).every(5).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2015, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear(zone).every(5).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2000, 11, 31, 23, 59, 59, 456));
});

it(`zonedYear(${zone}).every(n) does not define interval.count or interval.every`, () => {
  var decade = time.zonedYear(zone).every(10);
  assert.strictEqual(decade.count, undefined);
  assert.strictEqual(decade.every, undefined);
});

it(`zonedYear(${zone}).every(n).range(start, stop) returns multiples of n years`, () => {
  assert.deepEqual(time.zonedYear(zone).every(10).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2031, 0, 1)), [
    date.zoned(zone, 2010, 0, 1),
    date.zoned(zone, 2020, 0, 1),
    date.zoned(zone, 2030, 0, 1)
  ]);
});
