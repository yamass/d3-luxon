import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it(`zonedMonday/zonedTuesday/... is behaving the same as zonedWeek(zone, i)`, () => {
  let now = new Date();
  assert.deepEqual(time.zonedMonday(zone).floor(now), time.zonedWeek(zone, 1).floor(now));
  assert.deepEqual(time.zonedTuesday(zone).floor(now), time.zonedWeek(zone, 2).floor(now));
  assert.deepEqual(time.zonedWednesday(zone).floor(now), time.zonedWeek(zone, 3).floor(now));
  assert.deepEqual(time.zonedThursday(zone).floor(now), time.zonedWeek(zone, 4).floor(now));
  assert.deepEqual(time.zonedFriday(zone).floor(now), time.zonedWeek(zone, 5).floor(now));
  assert.deepEqual(time.zonedSaturday(zone).floor(now), time.zonedWeek(zone, 6).floor(now));
  assert.deepEqual(time.zonedSunday(zone).floor(now), time.zonedWeek(zone, 7).floor(now));
});
