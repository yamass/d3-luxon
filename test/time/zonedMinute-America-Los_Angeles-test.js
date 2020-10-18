var tape = require("tape"),
    time = require("../../"),
    date = require("../date-util");

var zone = "America/Los_Angeles";

tape(`zonedMinute(${zone}).floor(date) returns minutes`, function(test) {
  test.deepEqual(time.zonedMinute(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 11, 31, 23, 59));
  test.deepEqual(time.zonedMinute(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01, 00, 00));
  test.deepEqual(time.zonedMinute(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 59)), date.zoned(zone, 2011, 00, 01, 00, 00));
  test.deepEqual(time.zonedMinute(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 01, 00)), date.zoned(zone, 2011, 00, 01, 00, 01));
  test.end();
});

tape(`zonedMinute(${zone}).ceil(date) returns minutes`, function(test) {
  test.deepEqual(time.zonedMinute(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 00, 01, 00, 00));
  test.deepEqual(time.zonedMinute(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01, 00, 00));
  test.deepEqual(time.zonedMinute(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 59)), date.zoned(zone, 2011, 00, 01, 00, 01));
  test.deepEqual(time.zonedMinute(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 01, 00)), date.zoned(zone, 2011, 00, 01, 00, 01));
  test.end();
});

tape(`zonedMinute(${zone}).offset(date) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedMinute(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedMinute(${zone}).offset(date) does not round the passed-in-date`, function(test) {
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 01, 00, 00, 59, 999));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 31, 23, 57, 59, 456));
  test.end();
});

tape(`zonedMinute(${zone}).offset(date) allows negative offsets`, function(test) {
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 12), -1), date.zoned(zone, 2010, 11, 31, 23, 11));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2011, 00, 01, 00, 01), -2), date.zoned(zone, 2010, 11, 31, 23, 59));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2011, 00, 01, 00, 00), -1), date.zoned(zone, 2010, 11, 31, 23, 59));
  test.end();
});

tape(`zonedMinute(${zone}).offset(date) allows positive offsets`, function(test) {
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 11), +1), date.zoned(zone, 2010, 11, 31, 23, 12));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59), +2), date.zoned(zone, 2011, 00, 01, 00, 01));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59), +1), date.zoned(zone, 2011, 00, 01, 00, 00));
  test.end();
});

tape(`zonedMinute(${zone}).offset(date) allows zero offset`, function(test) {
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedMinute(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), returns minutes`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.zoned(zone, 2010, 11, 31, 23, 59), date.zoned(zone, 2011, 0, 1, 0, 2)), [
    date.zoned(zone, 2010, 11, 31, 23, 59),
    date.zoned(zone, 2011, 0, 1, 0, 0),
    date.zoned(zone, 2011, 0, 1, 0, 1)
  ]);
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), has an inclusive lower bound`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.zoned(zone, 2010, 11, 31, 23, 59), date.zoned(zone, 2011, 0, 1, 0, 2))[0], date.zoned(zone, 2010, 11, 31, 23, 59));
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), has an exclusive upper bound`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.zoned(zone, 2010, 11, 31, 23, 59), date.zoned(zone, 2011, 0, 1, 0, 2))[2], date.zoned(zone, 2011, 0, 1, 0, 1));
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), can skip minutes`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.zoned(zone, 2011, 1, 1, 12, 7), date.zoned(zone, 2011, 1, 1, 13, 7), 15), [
    date.zoned(zone, 2011, 1, 1, 12, 7),
    date.zoned(zone, 2011, 1, 1, 12, 22),
    date.zoned(zone, 2011, 1, 1, 12, 37),
    date.zoned(zone, 2011, 1, 1, 12, 52)
  ]);
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), observes start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.utc(2011, 2, 13, 9, 59), date.utc(2011, 2, 13, 10, 2)), [
    date.utc(2011, 2, 13, 9, 59),
    date.utc(2011, 2, 13, 10, 0),
    date.utc(2011, 2, 13, 10, 1)
  ]);
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop), observes end of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(date.utc(2011, 10, 6, 8, 59), date.utc(2011, 10, 6, 9, 2)), [
    date.utc(2011, 10, 6, 8, 59),
    date.utc(2011, 10, 6, 9, 0),
    date.utc(2011, 10, 6, 9, 1)
  ]);
  test.end();
});

tape(`zonedMinute(${zone}).every(step) returns every stepth minute, starting with the first minute of the hour`, function(test) {
  test.deepEqual(time.zonedMinute(zone).every(15).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 30, 13, 57)), [date.zoned(zone, 2008, 11, 30, 13, 0), date.zoned(zone, 2008, 11, 30, 13, 15), date.zoned(zone, 2008, 11, 30, 13, 30), date.zoned(zone, 2008, 11, 30, 13, 45)]);
  test.deepEqual(time.zonedMinute(zone).every(30).range(date.zoned(zone, 2008, 11, 30, 12, 47), date.zoned(zone, 2008, 11, 30, 13, 57)), [date.zoned(zone, 2008, 11, 30, 13, 0), date.zoned(zone, 2008, 11, 30, 13, 30)]);
  test.end();
});

tape(`zonedMinute(${zone}).range(start, stop) returns every minute crossing the daylight savings boundary`, function(test) {
  test.deepEqual(time.zonedMinute(zone).range(new Date(1478422800000 - 2 * 6e4), new Date(1478422800000 + 2 * 6e4)), [
    new Date(1478422680000), // Sun Nov 06 2016 01:58:00 GMT-0700 (PDT)
    new Date(1478422740000), // Sun Nov 06 2016 01:59:00 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov 06 2016 01:00:00 GMT-0800 (PDT)
    new Date(1478422860000)  // Sun Nov 06 2016 01:01:00 GMT-0800 (PDT)
  ]);
  test.end();
});
