var tape = require("tape"),
    time = require("../../"),
    date = require("../date-util");

var zone = "America/Los_Angeles";

tape(`zonedYear(${zone}).every(n).floor(date) returns integer multiples of n years`, function(test) {
  test.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2009, 11, 31, 23, 59, 59)), date.zoned(zone, 2000, 00, 01));
  test.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2010, 00, 01, 00, 00, 00)), date.zoned(zone, 2010, 00, 01));
  test.deepEqual(time.zonedYear(zone).every(10).floor(date.zoned(zone, 2010, 00, 01, 00, 00, 01)), date.zoned(zone, 2010, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).every(n).ceil(date) returns integer multiples of n years`, function(test) {
  test.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 1999, 11, 31, 23, 59, 59)), date.zoned(zone, 2000, 00, 01));
  test.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 2000, 00, 01, 00, 00, 00)), date.zoned(zone, 2000, 00, 01));
  test.deepEqual(time.zonedYear(zone).every(100).ceil(date.zoned(zone, 2000, 00, 01, 00, 00, 01)), date.zoned(zone, 2100, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).every(n).offset(date, count) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear(zone).every(5).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedYear(${zone}).every(n).offset(date, count) does not round the passed-in-date`, function(test) {
  test.deepEqual(time.zonedYear(zone).every(5).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2015, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedYear(zone).every(5).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2000, 11, 31, 23, 59, 59, 456));
  test.end();
});

tape(`zonedYear(${zone}).every(n) does not define interval.count or interval.every`, function(test) {
  var decade = time.zonedYear(zone).every(10);
  test.equal(decade.count, undefined);
  test.equal(decade.every, undefined);
  test.end();
});

tape(`zonedYear(${zone}).every(n).range(start, stop) returns multiples of n years`, function(test) {
  test.deepEqual(time.zonedYear(zone).every(10).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2031, 0, 1)), [
    date.zoned(zone, 2010, 0, 1),
    date.zoned(zone, 2020, 0, 1),
    date.zoned(zone, 2030, 0, 1)
  ]);
  test.end();
});
