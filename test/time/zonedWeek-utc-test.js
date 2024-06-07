import assert from "assert";
import * as time from "../../src/index.js";
import * as date from "../date-util.js";

it(`zonedMonday/zonedTuesday/... is behaving the same as zonedWeek(zone, i)`, () => {
  let now = new Date();
  assert.deepEqual(time.zonedMonday("UTC").floor(now), time.zonedWeek("UTC", 1).floor(now));
  assert.deepEqual(time.zonedTuesday("UTC").floor(now), time.zonedWeek("UTC", 2).floor(now));
  assert.deepEqual(time.zonedWednesday("UTC").floor(now), time.zonedWeek("UTC", 3).floor(now));
  assert.deepEqual(time.zonedThursday("UTC").floor(now), time.zonedWeek("UTC", 4).floor(now));
  assert.deepEqual(time.zonedFriday("UTC").floor(now), time.zonedWeek("UTC", 5).floor(now));
  assert.deepEqual(time.zonedSaturday("UTC").floor(now), time.zonedWeek("UTC", 6).floor(now));
  assert.deepEqual(time.zonedSunday("UTC").floor(now), time.zonedWeek("UTC", 7).floor(now));
});
