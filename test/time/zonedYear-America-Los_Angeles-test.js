import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedYear(${zone}).floor(date) returns years`, () => {
  assert.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 0, 1));
  assert.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 0, 0)), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2011, 0, 1, 0, 0, 1)), date.zoned(zone, 2011, 0, 1));
});

it(`zonedYear(${zone}).floor(date) does not modify the specified date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59);
  assert.deepEqual(time.zonedYear(zone).floor(d), date.zoned(zone, 2010, 0, 1));
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59));
});

it(`zonedYear(${zone}).floor(date) correctly handles years in the first century`, () => {
  assert.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 11, 10, 6, 7)), date.zoned(zone, 11, 0, 1));
});

it(`zonedYear(${zone}).ceil(date) returns years`, () => {
  assert.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 0, 0)), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2011, 0, 1, 0, 0, 1)), date.zoned(zone, 2012, 0, 1));
});

it(`zonedYear(${zone}).offset(date, count) does not modify the passed-in date`, () => {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear(zone).offset(d, +1);
  assert.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedYear(${zone}).offset(date, count) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2008, 11, 31, 23, 59, 59, 456));
});

it(`zonedYear(${zone}).offset(date, count) allows negative offsets`, () => {
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 1), -1), date.zoned(zone, 2009, 11, 1));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2011, 0, 1), -2), date.zoned(zone, 2009, 0, 1));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2011, 0, 1), -1), date.zoned(zone, 2010, 0, 1));
});

it(`zonedYear(${zone}).offset(date, count) allows positive offsets`, () => {
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2009, 11, 1), +1), date.zoned(zone, 2010, 11, 1));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2009, 0, 1), +2), date.zoned(zone, 2011, 0, 1));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 0, 1), +1), date.zoned(zone, 2011, 0, 1));
});

it(`zonedYear(${zone}).offset(date, count) allows zero offset`, () => {
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedYear(${zone}).every(step) returns every stepth year, starting with year zero`, () => {
  assert.deepEqual(time.zonedYear(zone).every(5).range(date.zoned(zone, 2008), date.zoned(zone, 2023)), [date.zoned(zone, 2010), date.zoned(zone, 2015), date.zoned(zone, 2020)]);
});

it(`zonedYear(${zone}).range(start, stop) returns years`, () => {
  assert.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1)), [
    date.zoned(zone, 2010, 0, 1),
    date.zoned(zone, 2011, 0, 1),
    date.zoned(zone, 2012, 0, 1)
  ]);
});

it(`zonedYear(${zone}).range(start, stop) has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1))[0], date.zoned(zone, 2010, 0, 1));
});

it(`zonedYear(${zone}).range(start, stop) has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1))[2], date.zoned(zone, 2012, 0, 1));
});

it(`zonedYear(${zone}).range(start, stop, step) can skip years`, () => {
  assert.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2029, 0, 1), 5), [
    date.zoned(zone, 2009, 0, 1),
    date.zoned(zone, 2014, 0, 1),
    date.zoned(zone, 2019, 0, 1),
    date.zoned(zone, 2024, 0, 1)
  ]);
});
