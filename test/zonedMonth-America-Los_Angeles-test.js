var tape = require("tape"),
    time = require("../"),
    date = require("./date");

var zone = "America/Los_Angeles";

tape(`zonedMonth(${zone}).floor(date) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) observes the start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 02, 13, 01)), date.zoned(zone, 2011, 02, 01));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) observes the end of the daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 10, 06, 01)), date.zoned(zone, 2011, 10, 01));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) correctly handles years in the first century`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 0011, 10, 06, 07)), date.zoned(zone, 0011, 10, 01));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2011, 01, 01));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) observes the start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 02, 13, 01)), date.zoned(zone, 2011, 03, 01));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) observes the end of the daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 10, 06, 01)), date.zoned(zone, 2011, 11, 01));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedMonth(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) does not round the passed-in-date`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 09, 31, 23, 59, 59, 456));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) allows negative offsets`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 01), -1), date.zoned(zone, 2010, 10, 01));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2011, 00, 01), -2), date.zoned(zone, 2010, 10, 01));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2011, 00, 01), -1), date.zoned(zone, 2010, 11, 01));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) allows positive offsets`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 10, 01), +1), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 10, 01), +2), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 01), +1), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) allows zero offset`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2010, 11, 31, 23)), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 00, 01, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 2011, 00, 01, 01)), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 02, 13, 10)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).floor(date.utc(2011, 10, 06, 10)), date.zoned(zone, 2011, 10, 01));
  test.end();
});

tape(`zonedMonth(${zone}).floor(date) handles years in the first century`, function(test) {
  test.deepEqual(time.zonedMonth(zone).floor(date.zoned(zone, 0011, 10, 06, 07)), date.zoned(zone, 0011, 10, 01));
  test.end();
});

tape(`zonedMonth(${zone}).round(date) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).round(date.zoned(zone, 2010, 11, 16, 12)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.zoned(zone, 2010, 11, 16, 11)), date.zoned(zone, 2010, 11, 01));
  test.end();
});

tape(`zonedMonth(${zone}).round(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 02, 13, 20)), date.zoned(zone, 2011, 02, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 10, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2011, 10, 06, 20)), date.zoned(zone, 2011, 10, 01));
  test.end();
});

tape(`zonedMonth(${zone}).round(date) handles midnight for leap years`, function(test) {
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.deepEqual(time.zonedMonth(zone).round(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2010, 10, 30, 23)), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2010, 11, 01, 01)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 1, 1)), date.zoned(zone, 2011, 1, 1));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 2, 1)), date.zoned(zone, 2011, 2, 1));
  test.deepEqual(time.zonedMonth(zone).ceil(date.zoned(zone, 2011, 3, 1)), date.zoned(zone, 2011, 3, 1));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 03, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 03, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 03, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 02, 13, 10)), date.zoned(zone, 2011, 03, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 11, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 11, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 11, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2011, 10, 06, 10)), date.zoned(zone, 2011, 11, 01));
  test.end();
});

tape(`zonedMonth(${zone}).ceil(date) handles midnight for leap years`, function(test) {
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.deepEqual(time.zonedMonth(zone).ceil(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date) is an alias for zonedMonth(${zone}).offset(date, 1)`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999)), date.zoned(zone, 2011, 00, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date, step) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedMonth(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date, step) does not round the passed-in date`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 09, 31, 23, 59, 59, 456));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date, step) allows step to be negative`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31), -1), date.zoned(zone, 2010, 10, 30));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2011, 00, 01), -2), date.zoned(zone, 2010, 10, 01));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2011, 00, 01), -1), date.zoned(zone, 2010, 11, 01));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date, step) allows step to be positive`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31), +1), date.zoned(zone, 2011, 00, 31));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 30), +2), date.zoned(zone, 2011, 01, 28));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 30), +1), date.zoned(zone, 2011, 00, 30));
  test.end();
});

tape(`zonedMonth(${zone}).offset(date, step) allows step to be zero`, function(test) {
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedMonth(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) returns months between start (inclusive) and stop (exclusive)`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 11, 01), date.zoned(zone, 2012, 05, 01)), [
    date.zoned(zone, 2011, 11, 01),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 01, 01),
    date.zoned(zone, 2012, 02, 01),
    date.zoned(zone, 2012, 03, 01),
    date.zoned(zone, 2012, 04, 01)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 10, 04, 02), date.zoned(zone, 2012, 04, 10, 13)), [
    date.zoned(zone, 2011, 11, 01),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 01, 01),
    date.zoned(zone, 2012, 02, 01),
    date.zoned(zone, 2012, 03, 01),
    date.zoned(zone, 2012, 04, 01)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) coerces start and stop to dates`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(+date.zoned(zone, 2011, 10, 04), +date.zoned(zone, 2012, 01, 07)), [
    date.zoned(zone, 2011, 11, 01),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 01, 01)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) returns the empty array for invalid dates`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(new Date(NaN), Infinity), []);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) returns the empty array if start >= stop`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 11, 10), date.zoned(zone, 2011, 10, 04)), []);
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 10, 01), date.zoned(zone, 2011, 10, 01)), []);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) returns months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2010, 10, 30), date.zoned(zone, 2011, 2, 1)), [
    date.zoned(zone, 2010, 11, 1),
    date.zoned(zone, 2011, 0, 1),
    date.zoned(zone, 2011, 1, 1)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) has an inclusive lower bound`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2010, 11, 01), date.zoned(zone, 2011, 2, 1))[0], date.zoned(zone, 2010, 11, 1));
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) has an exclusive upper bound`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2010, 11, 1), date.zoned(zone, 2011, 2, 1))[2], date.zoned(zone, 2011, 1, 1));
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) can skip months`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 1, 1), date.zoned(zone, 2012, 1, 1), 3), [
    date.zoned(zone, 2011, 1, 1),
    date.zoned(zone, 2011, 4, 1),
    date.zoned(zone, 2011, 7, 1),
    date.zoned(zone, 2011, 10, 1)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) observes start of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2011, 4, 1)), [
    date.zoned(zone, 2011, 0, 1),
    date.zoned(zone, 2011, 1, 1),
    date.zoned(zone, 2011, 2, 1),
    date.zoned(zone, 2011, 3, 1)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).range(start, stop) observes end of daylight savings time`, function(test) {
  test.deepEqual(time.zonedMonth(zone).range(date.zoned(zone, 2011, 9, 1), date.zoned(zone, 2012, 1, 1)), [
    date.zoned(zone, 2011, 9, 1),
    date.zoned(zone, 2011, 10, 1),
    date.zoned(zone, 2011, 11, 1),
    date.zoned(zone, 2012, 0, 1)
  ]);
  test.end();
});

tape(`zonedMonth(${zone}).count(start, end) counts months after start (exclusive) and before end (inclusive)`, function(test) {
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 04, 01)), 4);
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 03, 30)), 3);
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2010, 11, 31), date.zoned(zone, 2011, 03, 30)), 4);
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2010, 11, 31), date.zoned(zone, 2011, 04, 01)), 5);
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2009, 11, 31), date.zoned(zone, 2012, 04, 01)), 29);
  test.equal(time.zonedMonth(zone).count(date.zoned(zone, 2012, 04, 01), date.zoned(zone, 2009, 11, 31)), -29);
  test.end();
});

tape(`zonedMonth(${zone}).every(step) returns every stepth month, starting with the first month of the year`, function(test) {
  test.deepEqual(time.zonedMonth(zone).every(3).range(date.zoned(zone, 2008, 11, 3), date.zoned(zone, 2010, 6, 5)), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 3, 1), date.zoned(zone, 2009, 6, 1), date.zoned(zone, 2009, 9, 1), date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2010, 3, 1), date.zoned(zone, 2010, 6, 1)]);
  test.end();
});
