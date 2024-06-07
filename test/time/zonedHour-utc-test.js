import assert from "assert";
import * as time from "../../dist/index.js";
import * as date from "../date-util.js";

it(`zonedHour.floor(date) returns hours`, () => {
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2010, 11, 31, 23, 59)), date.utc(2010, 11, 31, 23));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 0, 1, 0, 0)), date.utc(2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 0, 1, 0, 1)), date.utc(2011, 0, 1, 0));
});

it(`zonedHour.floor(date) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 8, 59)), date.utc(2011, 2, 13, 8));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 9, 0)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 9, 1)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 9, 59)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 10, 0)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 2, 13, 10, 1)), date.utc(2011, 2, 13, 10));
});

it(`zonedHour.floor(date) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 7, 59)), date.utc(2011, 10, 6, 7));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 8, 0)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 8, 1)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 8, 59)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 9, 0)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour("UTC").floor(date.utc(2011, 10, 6, 9, 1)), date.utc(2011, 10, 6, 9));
});


it(`zonedHour.ceil(date) returns hours`, () => {
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2010, 11, 31, 23, 59)), date.utc(2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 0, 1, 0, 0)), date.utc(2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 0, 1, 0, 1)), date.utc(2011, 0, 1, 1));
});

it(`zonedHour.ceil(date) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 8, 59)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 9, 0)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 9, 1)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 9, 59)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 10, 0)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 2, 13, 10, 1)), date.utc(2011, 2, 13, 11));
});

it(`zonedHour.ceil(date) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 7, 59)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 8, 0)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 8, 1)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 8, 59)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 9, 0)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour("UTC").ceil(date.utc(2011, 10, 6, 9, 1)), date.utc(2011, 10, 6, 10));
});

it(`zonedHour.offset(date) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedHour("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedHour.offset(date) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 0, 1, 0, 59, 59, 999));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2010, 11, 31, 21, 59, 59, 456));
});

it(`zonedHour.offset(date) allows negative offsets`, () => {
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 12), -1), date.utc(2010, 11, 31, 11));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2011, 0, 1, 1), -2), date.utc(2010, 11, 31, 23));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2011, 0, 1, 0), -1), date.utc(2010, 11, 31, 23));
});

it(`zonedHour.offset(date) allows positive offsets`, () => {
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 11), +1), date.utc(2010, 11, 31, 12));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23), +2), date.utc(2011, 0, 1, 1));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23), +1), date.utc(2011, 0, 1, 0));
});

it(`zonedHour.offset(date) allows zero offset`, () => {
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedHour("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedHour.range(start, stop) returns hours`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2010, 11, 31, 12, 30), date.utc(2010, 11, 31, 15, 30)), [
    date.utc(2010, 11, 31, 13),
    date.utc(2010, 11, 31, 14),
    date.utc(2010, 11, 31, 15)
  ]);
});

it(`zonedHour.range(start, stop) has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2010, 11, 31, 23), date.utc(2011, 0, 1, 2))[0], date.utc(2010, 11, 31, 23));
});

it(`zonedHour.range(start, stop) has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2010, 11, 31, 23), date.utc(2011, 0, 1, 2))[2], date.utc(2011, 0, 1, 1));
});

it(`zonedHour.range(start, stop) can skip hours`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2011, 1, 1, 1), date.utc(2011, 1, 1, 13), 3), [
    date.utc(2011, 1, 1, 1),
    date.utc(2011, 1, 1, 4),
    date.utc(2011, 1, 1, 7),
    date.utc(2011, 1, 1, 10)
  ]);
});

it(`zonedHour.range(start, stop) does not observe the start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2011, 2, 13, 1), date.utc(2011, 2, 13, 5)), [
    date.utc(2011, 2, 13, 1),
    date.utc(2011, 2, 13, 2),
    date.utc(2011, 2, 13, 3),
    date.utc(2011, 2, 13, 4)
  ]);
});

it(`zonedHour.range(start, stop) does not observe the end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour("UTC").range(date.utc(2011, 10, 6, 0), date.utc(2011, 10, 6, 2)), [
    date.utc(2011, 10, 6, 0),
    date.utc(2011, 10, 6, 1)
  ]);
});

it(`zonedHour.every(step) returns every stepth hour, starting with the first hour of the day`, () => {
  assert.deepEqual(time.zonedHour("UTC").every(4).range(date.utc(2008, 11, 30, 12, 47), date.utc(2008, 11, 31, 13, 57)), [date.utc(2008, 11, 30, 16), date.utc(2008, 11, 30, 20), date.utc(2008, 11, 31, 0), date.utc(2008, 11, 31, 4), date.utc(2008, 11, 31, 8), date.utc(2008, 11, 31, 12)]);
  assert.deepEqual(time.zonedHour("UTC").every(12).range(date.utc(2008, 11, 30, 12, 47), date.utc(2008, 11, 31, 13, 57)), [date.utc(2008, 11, 31, 0), date.utc(2008, 11, 31, 12)]);
});
