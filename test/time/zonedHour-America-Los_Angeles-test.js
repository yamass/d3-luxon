import assert from "assert";
import * as time from "../../dist/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedHour(${zone}).floor(date) returns hours`, () => {
  assert.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59)), date.zoned(zone, 2010, 11, 31, 23));
  assert.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 0)), date.zoned(zone, 2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 1)), date.zoned(zone, 2011, 0, 1, 0));
});

it(`zonedHour(${zone}).floor(date) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 8, 59)), date.utc(2011, 2, 13, 8));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 9, 0)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 9, 1)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 9, 59)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 10, 0)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 2, 13, 10, 1)), date.utc(2011, 2, 13, 10));
});

it(`zonedHour(${zone}).floor(date) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 7, 59)), date.utc(2011, 10, 6, 7));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 8, 0)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 8, 1)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 8, 59)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 9, 0)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 6, 9, 1)), date.utc(2011, 10, 6, 9));
});

it(`zonedHour(${zone}).ceil(date) returns hours`, () => {
  assert.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59)), date.zoned(zone, 2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 0)), date.zoned(zone, 2011, 0, 1, 0));
  assert.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 1)), date.zoned(zone, 2011, 0, 1, 1));
});

it(`zonedHour(${zone}).ceil(date) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 8, 59)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 9, 0)), date.utc(2011, 2, 13, 9));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 9, 1)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 9, 59)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 10, 0)), date.utc(2011, 2, 13, 10));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 2, 13, 10, 1)), date.utc(2011, 2, 13, 11));
});

it(`zonedHour(${zone}).ceil(date) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 7, 59)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 8, 0)), date.utc(2011, 10, 6, 8));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 8, 1)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 8, 59)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 9, 0)), date.utc(2011, 10, 6, 9));
  assert.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 6, 9, 1)), date.utc(2011, 10, 6, 10));
});

it(`zonedHour(${zone}).offset(date) does not modify the passed-in date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedHour(zone).offset(d, +1);
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedHour(${zone}).offset(date) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 0, 1, 0, 59, 59, 999));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 31, 21, 59, 59, 456));
});

it(`zonedHour(${zone}).offset(date) allows negative offsets`, () => {
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 12), -1), date.zoned(zone, 2010, 11, 31, 11));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2011, 0, 1, 1), -2), date.zoned(zone, 2010, 11, 31, 23));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2011, 0, 1, 0), -1), date.zoned(zone, 2010, 11, 31, 23));
});

it(`zonedHour(${zone}).offset(date) allows positive offsets`, () => {
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 11), +1), date.zoned(zone, 2010, 11, 31, 12));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23), +2), date.zoned(zone, 2011, 0, 1, 1));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23), +1), date.zoned(zone, 2011, 0, 1, 0));
});

it(`zonedHour(${zone}).offset(date) allows zero offset`, () => {
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedHour(${zone}).range(start, stop) returns hours`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 12, 30), date.zoned(zone, 2010, 11, 31, 15, 30)), [
    date.zoned(zone, 2010, 11, 31, 13),
    date.zoned(zone, 2010, 11, 31, 14),
    date.zoned(zone, 2010, 11, 31, 15)
  ]);
});

it(`zonedHour(${zone}).range(start, stop) has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 0, 1, 2))[0], date.zoned(zone, 2010, 11, 31, 23));
});

it(`zonedHour(${zone}).range(start, stop) has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 0, 1, 2))[2], date.zoned(zone, 2011, 0, 1, 1));
});

it(`zonedHour(${zone}).range(start, stop) can skip hours`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 1, 1, 1), date.zoned(zone, 2011, 1, 1, 13), 3), [
    date.zoned(zone, 2011, 1, 1, 1),
    date.zoned(zone, 2011, 1, 1, 4),
    date.zoned(zone, 2011, 1, 1, 7),
    date.zoned(zone, 2011, 1, 1, 10)
  ]);
});

it(`zonedHour(${zone}).range(start, stop) observes start of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 2, 13, 1), date.zoned(zone, 2011, 2, 13, 5)), [
    date.utc(2011, 2, 13, 9),
    date.utc(2011, 2, 13, 10),
    date.utc(2011, 2, 13, 11)
  ]);
});

it(`zonedHour(${zone}).range(start, stop) observes end of daylight savings time`, () => {
  assert.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 10, 6, 0), date.zoned(zone, 2011, 10, 6, 2)), [
    date.utc(2011, 10, 6, 7),
    date.utc(2011, 10, 6, 8),
    date.utc(2011, 10, 6, 9)
  ]);
});

it(`zonedHour(${zone}).every(step) returns every stepth hour, starting with the first hour of the day`, () => {
  assert.deepEqual(time.zonedHour(zone).every(4).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 31, 13, 57)), [date.zoned(zone, 2008, 11, 30, 16), date.zoned(zone, 2008, 11, 30, 20), date.zoned(zone, 2008, 11, 31, 0), date.zoned(zone, 2008, 11, 31, 4), date.zoned(zone, 2008, 11, 31, 8), date.zoned(zone, 2008, 11, 31, 12)]);
  assert.deepEqual(time.zonedHour(zone).every(12).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 31, 13, 57)), [date.zoned(zone, 2008, 11, 31, 0), date.zoned(zone, 2008, 11, 31, 12)]);
});

it(`zonedHour(${zone}).range(start, stop) returns every hour crossing the daylight savings boundary`, () => {
  assert.deepEqual(time.zonedHour(zone).range(new Date(1478422800000 - 2 * 36e5), new Date(1478422800000 + 2 * 36e5)), [
    new Date(1478415600000), // Sun Nov 06 2016 00:00:00 GMT-0700 (PDT)
    new Date(1478419200000), // Sun Nov 06 2016 01:00:00 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov 06 2016 01:00:00 GMT-0800 (PDT)
    new Date(1478426400000)  // Sun Nov 06 2016 02:00:00 GMT-0800 (PDT)
  ]);
});
