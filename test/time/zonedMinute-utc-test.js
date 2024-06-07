import assert from "assert";
import * as time from "../../dist/index.js";
import * as date from "../date-util.js";

it(`zonedMinute.floor(date) returns minutes`, () => {
  assert.deepEqual(time.zonedMinute("UTC").floor(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2010, 11, 31, 23, 59));
  assert.deepEqual(time.zonedMinute("UTC").floor(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2011, 0, 1, 0, 0));
  assert.deepEqual(time.zonedMinute("UTC").floor(date.utc(2011, 0, 1, 0, 0, 59)), date.utc(2011, 0, 1, 0, 0));
  assert.deepEqual(time.zonedMinute("UTC").floor(date.utc(2011, 0, 1, 0, 1, 0)), date.utc(2011, 0, 1, 0, 1));
});

it(`zonedMinute.ceil(date) returns minutes`, () => {
  assert.deepEqual(time.zonedMinute("UTC").ceil(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2011, 0, 1, 0, 0));
  assert.deepEqual(time.zonedMinute("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2011, 0, 1, 0, 0));
  assert.deepEqual(time.zonedMinute("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 59)), date.utc(2011, 0, 1, 0, 1));
  assert.deepEqual(time.zonedMinute("UTC").ceil(date.utc(2011, 0, 1, 0, 1, 0)), date.utc(2011, 0, 1, 0, 1));
});

it(`zonedMinute.offset(date) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedMinute("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedMinute.offset(date) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 0, 1, 0, 0, 59, 999));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 11, 31, 23, 57, 59, 456));
});

it(`zonedMinute.offset(date) allows negative offsets`, () => {
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 12), -1), date.utc(2010, 11, 31, 23, 11));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2011, 0, 1, 0, 1), -2), date.utc(2010, 11, 31, 23, 59));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2011, 0, 1, 0, 0), -1), date.utc(2010, 11, 31, 23, 59));
});

it(`zonedMinute.offset(date) allows positive offsets`, () => {
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 11), +1), date.utc(2010, 11, 31, 23, 12));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59), +2), date.utc(2011, 0, 1, 0, 1));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59), +1), date.utc(2011, 0, 1, 0, 0));
});

it(`zonedMinute.offset(date) allows zero offset`, () => {
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedMinute("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedMinute.range(start, stop), returns minutes`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2010, 11, 31, 23, 59), date.utc(2011, 0, 1, 0, 2)), [
    date.utc(2010, 11, 31, 23, 59),
    date.utc(2011, 0, 1, 0, 0),
    date.utc(2011, 0, 1, 0, 1)
  ]);
});

it(`zonedMinute.range(start, stop), has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2010, 11, 31, 23, 59), date.utc(2011, 0, 1, 0, 2))[0], date.utc(2010, 11, 31, 23, 59));
});

it(`zonedMinute.range(start, stop), has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2010, 11, 31, 23, 59), date.utc(2011, 0, 1, 0, 2))[2], date.utc(2011, 0, 1, 0, 1));
});

it(`zonedMinute.range(start, stop), can skip minutes`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2011, 1, 1, 12, 7), date.utc(2011, 1, 1, 13, 7), 15), [
    date.utc(2011, 1, 1, 12, 7),
    date.utc(2011, 1, 1, 12, 22),
    date.utc(2011, 1, 1, 12, 37),
    date.utc(2011, 1, 1, 12, 52)
  ]);
});

it(`zonedMinute.range(start, stop), observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2011, 2, 13, 9, 59), date.utc(2011, 2, 13, 10, 2)), [
    date.utc(2011, 2, 13, 9, 59),
    date.utc(2011, 2, 13, 10, 0),
    date.utc(2011, 2, 13, 10, 1)
  ]);
});

it(`zonedMinute.range(start, stop), observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedMinute("UTC").range(date.utc(2011, 10, 6, 8, 59), date.utc(2011, 10, 6, 9, 2)), [
    date.utc(2011, 10, 6, 8, 59),
    date.utc(2011, 10, 6, 9, 0),
    date.utc(2011, 10, 6, 9, 1)
  ]);
});

it(`zonedMinute.every(step) returns every stepth minute, starting with the first minute of the hour`, () => {
  assert.deepEqual(time.zonedMinute("UTC").every(15).range(date.utc(2008, 11, 30, 12, 47), date.utc(2008, 11, 30, 13, 57)), [date.utc(2008, 11, 30, 13, 0), date.utc(2008, 11, 30, 13, 15), date.utc(2008, 11, 30, 13, 30), date.utc(2008, 11, 30, 13, 45)]);
  assert.deepEqual(time.zonedMinute("UTC").every(30).range(date.utc(2008, 11, 30, 12, 47), date.utc(2008, 11, 30, 13, 57)), [date.utc(2008, 11, 30, 13, 0), date.utc(2008, 11, 30, 13, 30)]);
});
