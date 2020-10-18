var tape = require("tape"),
    time = require("../../"),
    date = require("../date-util");

var zone = "America/Los_Angeles";

tape(`zonedMonday/zonedTuesday/... is behaving the same as zonedWeek(zone, i)`, function(test) {
  let now = new Date();
  test.deepEqual(time.zonedMonday(zone).floor(now), time.zonedWeek(zone, 1).floor(now));
  test.deepEqual(time.zonedTuesday(zone).floor(now), time.zonedWeek(zone, 2).floor(now));
  test.deepEqual(time.zonedWednesday(zone).floor(now), time.zonedWeek(zone, 3).floor(now));
  test.deepEqual(time.zonedThursday(zone).floor(now), time.zonedWeek(zone, 4).floor(now));
  test.deepEqual(time.zonedFriday(zone).floor(now), time.zonedWeek(zone, 5).floor(now));
  test.deepEqual(time.zonedSaturday(zone).floor(now), time.zonedWeek(zone, 6).floor(now));
  test.deepEqual(time.zonedSunday(zone).floor(now), time.zonedWeek(zone, 7).floor(now));
  test.end();
});
