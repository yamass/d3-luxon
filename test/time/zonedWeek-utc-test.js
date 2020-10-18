var tape = require("tape"),
    time = require("../../"),
    date = require("../date-util");

tape(`zonedMonday/zonedTuesday/... is behaving the same as zonedWeek(zone, i)`, function(test) {
  let now = new Date();
  test.deepEqual(time.zonedMonday("UTC").floor(now), time.zonedWeek("UTC", 1).floor(now));
  test.deepEqual(time.zonedTuesday("UTC").floor(now), time.zonedWeek("UTC", 2).floor(now));
  test.deepEqual(time.zonedWednesday("UTC").floor(now), time.zonedWeek("UTC", 3).floor(now));
  test.deepEqual(time.zonedThursday("UTC").floor(now), time.zonedWeek("UTC", 4).floor(now));
  test.deepEqual(time.zonedFriday("UTC").floor(now), time.zonedWeek("UTC", 5).floor(now));
  test.deepEqual(time.zonedSaturday("UTC").floor(now), time.zonedWeek("UTC", 6).floor(now));
  test.deepEqual(time.zonedSunday("UTC").floor(now), time.zonedWeek("UTC", 7).floor(now));
  test.end();
});
