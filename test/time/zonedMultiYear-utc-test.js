import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedYear.every(n).floor(date) returns integer multiples of n years`, () => {
  assert.deepEqual(time.zonedYear("UTC").every(10).floor(date.utc(2009, 11, 31, 23, 59, 59)), date.utc(2000, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").every(10).floor(date.utc(2010, 0, 1, 0, 0, 0)), date.utc(2010, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").every(10).floor(date.utc(2010, 0, 1, 0, 0, 1)), date.utc(2010, 0, 1));
});

it(`zonedYear.every(n).ceil(date) returns integer multiples of n years`, () => {
  assert.deepEqual(time.zonedYear("UTC").every(100).ceil(date.utc(1999, 11, 31, 23, 59, 59)), date.utc(2000, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").every(100).ceil(date.utc(2000, 0, 1, 0, 0, 0)), date.utc(2000, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").every(100).ceil(date.utc(2000, 0, 1, 0, 0, 1)), date.utc(2100, 0, 1));
});

it(`zonedYear.every(n).offset(date, count) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear("UTC").every(5).offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedYear.every(n).offset(date, count) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedYear("UTC").every(5).offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2015, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear("UTC").every(5).offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2000, 11, 31, 23, 59, 59, 456));
});

it(`zonedYear.every(n) does not define interval.count or interval.every`, () => {
  var decade = time.zonedYear("UTC").every(10);
  assert.strictEqual(decade.count, undefined);
  assert.strictEqual(decade.every, undefined);
});

it(`zonedYear.every(n).range(start, stop) returns multiples of n years`, () => {
  assert.deepEqual(time.zonedYear("UTC").every(10).range(date.utc(2010, 0, 1), date.utc(2031, 0, 1)), [
    date.utc(2010, 0, 1),
    date.utc(2020, 0, 1),
    date.utc(2030, 0, 1)
  ]);
});
