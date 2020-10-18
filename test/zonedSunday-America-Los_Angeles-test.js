var tape = require("tape"),
    time = require("../"),
    date = require("./date");

var zone = "America/Los_Angeles";

tape(`zonedSunday(${zone}).floor(date) returns Sundays`, function(test) {
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 11, 26));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2010, 11, 26));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2010, 11, 26));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 00, 01, 23, 59, 59)), date.zoned(zone, 2010, 11, 26));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 00, 02, 00, 00, 00)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 00, 02, 00, 00, 01)), date.zoned(zone, 2011, 00, 02));
  test.end();
});

tape(`zonedSunday(${zone}).floor(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 02, 13, 01)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedSunday(zone).floor(date.zoned(zone, 2011, 10, 06, 01)), date.zoned(zone, 2011, 10, 06));
  test.end();
});

tape(`zonedSunday(${zone}).ceil(date) returns Sundays`, function(test) {
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 00, 01, 23, 59, 59)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 00, 02, 00, 00, 00)), date.zoned(zone, 2011, 00, 02));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 00, 02, 00, 00, 01)), date.zoned(zone, 2011, 00, 09));
  test.end();
});

tape(`zonedSunday(${zone}).ceil(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 02, 13, 01)), date.zoned(zone, 2011, 02, 20));
  test.deepEqual(time.zonedSunday(zone).ceil(date.zoned(zone, 2011, 10, 06, 01)), date.zoned(zone, 2011, 10, 13));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date) is an alias for zonedSunday(${zone}).offset(date, 1)`, function(test) {
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999)), date.zoned(zone, 2011, 00, 07, 23, 59, 59, 999));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date, step) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedSunday(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date, step) does not round the passed-in date`, function(test) {
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 07, 23, 59, 59, 999));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 17, 23, 59, 59, 456));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date, step) allows step to be negative`, function(test) {
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 01), -1), date.zoned(zone, 2010, 10, 24));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2011, 00, 01), -2), date.zoned(zone, 2010, 11, 18));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2011, 00, 01), -1), date.zoned(zone, 2010, 11, 25));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date, step) allows step to be positive`, function(test) {
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 10, 24), +1), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 18), +2), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 25), +1), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedSunday(${zone}).offset(date, step) allows step to be zero`, function(test) {
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedSunday(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop) returns Sundays between start (inclusive) and stop (exclusive)`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 01), date.zoned(zone, 2012, 00, 15)), [
    date.zoned(zone, 2011, 11, 04),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 00, 08)
  ]);
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop) returns Sundays`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 01, 12, 23), date.zoned(zone, 2012, 00, 14, 12, 23)), [
    date.zoned(zone, 2011, 11, 04),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 00, 08)
  ]);
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop) coerces start and stop to dates`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(+date.zoned(zone, 2011, 11, 01), +date.zoned(zone, 2012, 00, 15)), [
    date.zoned(zone, 2011, 11, 04),
    date.zoned(zone, 2011, 11, 11),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2011, 11, 25),
    date.zoned(zone, 2012, 00, 01),
    date.zoned(zone, 2012, 00, 08)
  ]);
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop) returns the empty array for invalid dates`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(new Date(NaN), Infinity), []);
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop) returns the empty array if start >= stop`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 10), date.zoned(zone, 2011, 10, 04)), []);
  test.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 10, 01), date.zoned(zone, 2011, 10, 01)), []);
  test.end();
});

tape(`zonedSunday(${zone}).range(start, stop, step) returns every step Sunday`, function(test) {
  test.deepEqual(time.zonedSunday(zone).range(date.zoned(zone, 2011, 11, 01), date.zoned(zone, 2012, 00, 15), 2), [
    date.zoned(zone, 2011, 11, 04),
    date.zoned(zone, 2011, 11, 18),
    date.zoned(zone, 2012, 00, 01)
  ]);
  test.end();
});

tape(`zonedSunday(${zone}).count(start, end) counts Sundays after start (exclusive) and before end (inclusive)`, function(test) {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2014, 00, 01), date.zoned(zone, 2014, 00, 04)), 0);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2014, 00, 01), date.zoned(zone, 2014, 00, 05)), 1);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2014, 00, 01), date.zoned(zone, 2014, 00, 06)), 1);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2014, 00, 01), date.zoned(zone, 2014, 00, 12)), 2);

  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2012, 00, 01), date.zoned(zone, 2012, 00, 07)), 0);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2012, 00, 01), date.zoned(zone, 2012, 00, 08)), 1);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2012, 00, 01), date.zoned(zone, 2012, 00, 09)), 1);
  test.end();
});

tape(`zonedSunday(${zone}).count(start, end) observes daylight saving`, function(test) {
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 01)), 11);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 03)), 11);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 04)), 11);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 00)), 45);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 01)), 45);
  test.equal(time.zonedSunday(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 02)), 45);
  test.end();
});
