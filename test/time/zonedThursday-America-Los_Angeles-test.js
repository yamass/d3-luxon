import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedThursday(${zone}).floor(date) returns Thursdays`, () => {
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 4, 23, 59, 59)), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 5, 0, 0, 0)), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 5, 0, 0, 1)), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 5, 23, 59, 59)), date.zoned(zone, 2010, 11, 30));
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 6, 0, 0, 0)), date.zoned(zone, 2011, 0, 6));
  assert.deepEqual(time.zonedThursday(zone).floor(date.zoned(zone, 2011, 0, 6, 0, 0, 1)), date.zoned(zone, 2011, 0, 6));
});

it(`zonedThursday(${zone}).count(start, end) counts Thursdays after start (exclusive) and before end (inclusive)`, () => {
  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 4)), 0);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 5)), 1);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 6)), 1);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2012, 0, 1), date.zoned(zone, 2012, 0, 12)), 2);

  //     January 2015
  // Su Mo Tu We Th Fr Sa
  //              1  2  3
  //  4  5  6  7  8  9 10
  // 11 12 13 14 15 16 17
  // 18 19 20 21 22 23 24
  // 25 26 27 28 29 30 31
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2015, 0, 1), date.zoned(zone, 2015, 0, 7)), 0);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2015, 0, 1), date.zoned(zone, 2015, 0, 8)), 1);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2015, 0, 1), date.zoned(zone, 2015, 0, 9)), 1);
});

it(`zonedThursday(${zone}).count(start, end) observes daylight saving`, () => {
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 1)), 10);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 3)), 10);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 2, 13, 4)), 10);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 0)), 44);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 1)), 44);
  assert.strictEqual(time.zonedThursday(zone).count(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 10, 6, 2)), 44);
});
