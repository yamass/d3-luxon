import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedYear.floor(date) returns years`, () => {
  assert.deepEqual(time.zonedYear("UTC").floor(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2010, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").floor(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").floor(date.utc(2011, 0, 1, 0, 0, 1)), date.utc(2011, 0, 1));
});

it(`zonedYear.floor(date) does not modify the specified date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59);
  assert.deepEqual(time.zonedYear("UTC").floor(d), date.utc(2010, 0, 1));
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59));
});

it(`zonedYear.floor(date) correctly handles years in the first century`, () => {
  assert.deepEqual(time.zonedYear("UTC").floor(date.utc(11, 10, 6, 7)), date.utc(11, 0, 1));
});

it(`zonedYear.ceil(date) returns years`, () => {
  assert.deepEqual(time.zonedYear("UTC").ceil(date.utc(2010, 11, 31, 23, 59, 59)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 0)), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").ceil(date.utc(2011, 0, 1, 0, 0, 1)), date.utc(2012, 0, 1));
});

it(`zonedYear.offset(date, count) does not modify the passed-in date`, () => {
  var d = date.utc(2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear("UTC").offset(d, +1);
  assert.deepEqual(d, date.utc(2010, 11, 31, 23, 59, 59, 999));
});

it(`zonedYear.offset(date, count) does not round the passed-in-date`, () => {
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), +1), date.utc(2011, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 456), -2), date.utc(2008, 11, 31, 23, 59, 59, 456));
});

it(`zonedYear.offset(date, count) allows negative offsets`, () => {
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 11, 1), -1), date.utc(2009, 11, 1));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2011, 0, 1), -2), date.utc(2009, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2011, 0, 1), -1), date.utc(2010, 0, 1));
});

it(`zonedYear.offset(date, count) allows positive offsets`, () => {
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2009, 11, 1), +1), date.utc(2010, 11, 1));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2009, 0, 1), +2), date.utc(2011, 0, 1));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 0, 1), +1), date.utc(2011, 0, 1));
});

it(`zonedYear.offset(date, count) allows zero offset`, () => {
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 11, 31, 23, 59, 59, 999), 0), date.utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepEqual(time.zonedYear("UTC").offset(date.utc(2010, 11, 31, 23, 59, 58, 0), 0), date.utc(2010, 11, 31, 23, 59, 58, 0));
});

it(`zonedYear.every(step) returns every stepth year, starting with year zero`, () => {
  assert.deepEqual(time.zonedYear("UTC").every(5).range(date.utc(2008), date.utc(2023)), [date.utc(2010), date.utc(2015), date.utc(2020)]);
});

it(`zonedYear.range(start, stop) returns years`, () => {
  assert.deepEqual(time.zonedYear("UTC").range(date.utc(2010, 0, 1), date.utc(2013, 0, 1)), [
    date.utc(2010, 0, 1),
    date.utc(2011, 0, 1),
    date.utc(2012, 0, 1)
  ]);
});

it(`zonedYear.range(start, stop) has an inclusive lower bound`, () => {
  assert.deepEqual(time.zonedYear("UTC").range(date.utc(2010, 0, 1), date.utc(2013, 0, 1))[0], date.utc(2010, 0, 1));
});

it(`zonedYear.range(start, stop) has an exclusive upper bound`, () => {
  assert.deepEqual(time.zonedYear("UTC").range(date.utc(2010, 0, 1), date.utc(2013, 0, 1))[2], date.utc(2012, 0, 1));
});

it(`zonedYear.range(start, stop, step) can skip years`, () => {
  assert.deepEqual(time.zonedYear("UTC").range(date.utc(2009, 0, 1), date.utc(2029, 0, 1), 5), [
    date.utc(2009, 0, 1),
    date.utc(2014, 0, 1),
    date.utc(2019, 0, 1),
    date.utc(2024, 0, 1)
  ]);
});
