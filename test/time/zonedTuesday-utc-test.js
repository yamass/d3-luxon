import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedTuesday.floor(date) returns Tuesdays`, () => {
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 2, 23, 59, 59)), date.utc(2010, 11, 28));
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 3, 0, 0, 0)), date.utc(2010, 11, 28));
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 3, 0, 0, 1)), date.utc(2010, 11, 28));
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 3, 23, 59, 59)), date.utc(2010, 11, 28));
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 4, 0, 0, 0)), date.utc(2011, 0, 4));
  assert.deepEqual(time.zonedTuesday("UTC").floor(date.utc(2011, 0, 4, 0, 0, 1)), date.utc(2011, 0, 4));
});

it(`zonedTuesday.count(start, end) counts Tuesdays after start (exclusive) and before end (inclusive)`, () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 6)), 0);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 7)), 1);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 8)), 1);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2014, 0, 1), date.utc(2014, 0, 14)), 2);

  //     January 2013
  // Su Mo Tu We Th Fr Sa
  //        1  2  3  4  5
  //  6  7  8  9 10 11 12
  // 13 14 15 16 17 18 19
  // 20 21 22 23 24 25 26
  // 27 28 29 30 31
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2013, 0, 1), date.utc(2013, 0, 7)), 0);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2013, 0, 1), date.utc(2013, 0, 8)), 1);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2013, 0, 1), date.utc(2013, 0, 9)), 1);
});

it(`zonedTuesday.count(start, end) does not observe daylight saving`, () => {
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 1)), 10);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 3)), 10);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 2, 13, 4)), 10);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 0)), 44);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 1)), 44);
  assert.strictEqual(time.zonedTuesday("UTC").count(date.utc(2011, 0, 1), date.utc(2011, 10, 6, 2)), 44);
});
