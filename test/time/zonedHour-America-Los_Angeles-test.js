var tape = require("tape"),
    time = require("../../"),
    date = require("../date-util");

var zone = "America/Los_Angeles";

tape(`zonedHour(${zone}).floor(date) returns hours`, function(test) {
  test.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59)), date.zoned(zone, 2010, 11, 31, 23));
  test.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00)), date.zoned(zone, 2011, 00, 01, 00));
  test.deepEqual(time.zonedHour(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 01)), date.zoned(zone, 2011, 00, 01, 00));
  test.end();
});

tape(`zonedHour(${zone}).floor(date) observes start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 08, 59)), date.utc(2011, 02, 13, 08));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 09, 00)), date.utc(2011, 02, 13, 09));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 09, 01)), date.utc(2011, 02, 13, 09));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 09, 59)), date.utc(2011, 02, 13, 09));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 10, 00)), date.utc(2011, 02, 13, 10));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 02, 13, 10, 01)), date.utc(2011, 02, 13, 10));
  test.end();
});

tape(`zonedHour(${zone}).floor(date) observes end of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 07, 59)), date.utc(2011, 10, 06, 07));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 08, 00)), date.utc(2011, 10, 06, 08));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 08, 01)), date.utc(2011, 10, 06, 08));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 08, 59)), date.utc(2011, 10, 06, 08));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 09, 00)), date.utc(2011, 10, 06, 09));
  test.deepEqual(time.zonedHour(zone).floor(date.utc(2011, 10, 06, 09, 01)), date.utc(2011, 10, 06, 09));
  test.end();
});

tape(`zonedHour(${zone}).ceil(date) returns hours`, function(test) {
  test.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59)), date.zoned(zone, 2011, 00, 01, 00));
  test.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00)), date.zoned(zone, 2011, 00, 01, 00));
  test.deepEqual(time.zonedHour(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 01)), date.zoned(zone, 2011, 00, 01, 01));
  test.end();
});

tape(`zonedHour(${zone}).ceil(date) observes start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 08, 59)), date.utc(2011, 02, 13, 09));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 09, 00)), date.utc(2011, 02, 13, 09));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 09, 01)), date.utc(2011, 02, 13, 10));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 09, 59)), date.utc(2011, 02, 13, 10));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 10, 00)), date.utc(2011, 02, 13, 10));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 02, 13, 10, 01)), date.utc(2011, 02, 13, 11));
  test.end();
});

tape(`zonedHour(${zone}).ceil(date) observes end of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 07, 59)), date.utc(2011, 10, 06, 08));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 08, 00)), date.utc(2011, 10, 06, 08));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 08, 01)), date.utc(2011, 10, 06, 09));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 08, 59)), date.utc(2011, 10, 06, 09));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 09, 00)), date.utc(2011, 10, 06, 09));
  test.deepEqual(time.zonedHour(zone).ceil(date.utc(2011, 10, 06, 09, 01)), date.utc(2011, 10, 06, 10));
  test.end();
});

tape(`zonedHour(${zone}).offset(date) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedHour(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedHour(${zone}).offset(date) does not round the passed-in-date`, function(test) {
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 01, 00, 59, 59, 999));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 31, 21, 59, 59, 456));
  test.end();
});

tape(`zonedHour(${zone}).offset(date) allows negative offsets`, function(test) {
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 12), -1), date.zoned(zone, 2010, 11, 31, 11));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2011, 00, 01, 01), -2), date.zoned(zone, 2010, 11, 31, 23));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2011, 00, 01, 00), -1), date.zoned(zone, 2010, 11, 31, 23));
  test.end();
});

tape(`zonedHour(${zone}).offset(date) allows positive offsets`, function(test) {
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 11), +1), date.zoned(zone, 2010, 11, 31, 12));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23), +2), date.zoned(zone, 2011, 00, 01, 01));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23), +1), date.zoned(zone, 2011, 00, 01, 00));
  test.end();
});

tape(`zonedHour(${zone}).offset(date) allows zero offset`, function(test) {
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedHour(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) returns hours`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 12, 30), date.zoned(zone, 2010, 11, 31, 15, 30)), [
    date.zoned(zone, 2010, 11, 31, 13),
    date.zoned(zone, 2010, 11, 31, 14),
    date.zoned(zone, 2010, 11, 31, 15)
  ]);
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) has an inclusive lower bound`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 0, 1, 2))[0], date.zoned(zone, 2010, 11, 31, 23));
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) has an exclusive upper bound`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 0, 1, 2))[2], date.zoned(zone, 2011, 0, 1, 1));
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) can skip hours`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 1, 1, 1), date.zoned(zone, 2011, 1, 1, 13), 3), [
    date.zoned(zone, 2011, 1, 1, 1),
    date.zoned(zone, 2011, 1, 1, 4),
    date.zoned(zone, 2011, 1, 1, 7),
    date.zoned(zone, 2011, 1, 1, 10)
  ]);
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) observes start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 2, 13, 1), date.zoned(zone, 2011, 2, 13, 5)), [
    date.utc(2011, 2, 13, 9),
    date.utc(2011, 2, 13, 10),
    date.utc(2011, 2, 13, 11)
  ]);
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) observes end of daylight savings time`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(date.zoned(zone, 2011, 10, 6, 0), date.zoned(zone, 2011, 10, 6, 2)), [
    date.utc(2011, 10, 6, 7),
    date.utc(2011, 10, 6, 8),
    date.utc(2011, 10, 6, 9)
  ]);
  test.end();
});

tape(`zonedHour(${zone}).every(step) returns every stepth hour, starting with the first hour of the day`, function(test) {
  test.deepEqual(time.zonedHour(zone).every(4).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 31, 13, 57)), [date.zoned(zone, 2008, 11, 30, 16), date.zoned(zone, 2008, 11, 30, 20), date.zoned(zone, 2008, 11, 31, 0), date.zoned(zone, 2008, 11, 31, 4), date.zoned(zone, 2008, 11, 31, 8), date.zoned(zone, 2008, 11, 31, 12)]);
  test.deepEqual(time.zonedHour(zone).every(12).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 31, 13, 57)), [date.zoned(zone, 2008, 11, 31, 0), date.zoned(zone, 2008, 11, 31, 12)]);
  test.end();
});

tape(`zonedHour(${zone}).range(start, stop) returns every hour crossing the daylight savings boundary`, function(test) {
  test.deepEqual(time.zonedHour(zone).range(new Date(1478422800000 - 2 * 36e5), new Date(1478422800000 + 2 * 36e5)), [
    new Date(1478415600000), // Sun Nov 06 2016 00:00:00 GMT-0700 (PDT)
    new Date(1478419200000), // Sun Nov 06 2016 01:00:00 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov 06 2016 01:00:00 GMT-0800 (PDT)
    new Date(1478426400000)  // Sun Nov 06 2016 02:00:00 GMT-0800 (PDT)
  ]);
  test.end();
});
