var tape = require("tape"),
    time = require("../"),
    date = require("./date");

var zone = "America/Los_Angeles";

tape(`zonedDay(${zone})() is equivalent to zonedDay(${zone}).floor(new Date)`, function(test) {
  var t = new Date;
  test.deepEqual(time.zonedDay(zone)(), time.zonedDay(zone).floor(t));
  test.end();
});

tape(`zonedDay(${zone})(date) is equivalent to zonedDay(${zone}).floor(date)`, function(test) {
  var t = new Date;
  test.deepEqual(time.zonedDay(zone)(t), time.zonedDay(zone).floor(t));
  test.end();
});

tape(`zonedDay(${zone}).floor(date) returns days`, function(test) {
  test.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2010, 11, 31, 23)), date.zoned(zone, 2010, 11, 31));
  test.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2011, 00, 01, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 2011, 00, 01, 01)), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedDay(${zone}).floor(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 02, 12));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 02, 13, 10)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).floor(date.utc(2011, 10, 06, 10)), date.zoned(zone, 2011, 10, 06));
  test.end();
});

tape(`zonedDay(${zone}).floor(date) handles years in the first century`, function(test) {
  test.deepEqual(time.zonedDay(zone).floor(date.zoned(zone, 0011, 10, 06, 07)), date.zoned(zone, 0011, 10, 06));
  test.end();
});

tape(`zonedDay(${zone}).round(date) returns days`, function(test) {
  test.deepEqual(time.zonedDay(zone).round(date.zoned(zone, 2010, 11, 30, 13)), date.zoned(zone, 2010, 11, 31));
  test.deepEqual(time.zonedDay(zone).round(date.zoned(zone, 2010, 11, 30, 11)), date.zoned(zone, 2010, 11, 30));
  test.end();
});

tape(`zonedDay(${zone}).round(date) observes daylight saving`, function(test) {
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 02, 13, 20)), date.zoned(zone, 2011, 02, 14));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2011, 10, 06, 20)), date.zoned(zone, 2011, 10, 07));
  test.end();
});

tape(`zonedDay(${zone}).round(date) handles midnight in leap years`, function(test) {
  test.deepEqual(time.zonedDay(zone).round(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.deepEqual(time.zonedDay(zone).round(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.end();
});

tape(`zonedDay(${zone}).ceil(date) returns days`, function(test) {
  test.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 30, 23)), date.zoned(zone, 2010, 11, 31));
  test.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 31, 00)), date.zoned(zone, 2010, 11, 31));
  test.deepEqual(time.zonedDay(zone).ceil(date.zoned(zone, 2010, 11, 31, 01)), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedDay(${zone}).ceil(date) observes start of daylight saving`, function(test) {
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 02, 13, 07)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 02, 13, 08)), date.zoned(zone, 2011, 02, 13));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 02, 13, 09)), date.zoned(zone, 2011, 02, 14));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 02, 13, 10)), date.zoned(zone, 2011, 02, 14));
  test.end();
});

tape(`zonedDay(${zone}).ceil(date) observes end of daylight saving`, function(test) {
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 06, 07)), date.zoned(zone, 2011, 10, 06));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 06, 08)), date.zoned(zone, 2011, 10, 07));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 06, 09)), date.zoned(zone, 2011, 10, 07));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2011, 10, 06, 10)), date.zoned(zone, 2011, 10, 07));
  test.end();
});

tape(`zonedDay(${zone}).ceil(date) handles midnight for leap years`, function(test) {
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.deepEqual(time.zonedDay(zone).ceil(date.utc(2012, 02, 01, 00)), date.zoned(zone, 2012, 02, 01));
  test.end();
});

tape(`zonedDay(${zone}).offset(date) is an alias for zonedDay(${zone}).offset(date, 1)`, function(test) {
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999)), date.zoned(zone, 2011, 00, 01, 23, 59, 59, 999));
  test.end();
});

tape(`zonedDay(${zone}).offset(date, step) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedDay(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedDay(${zone}).offset(date, step) does not round the passed-in date`, function(test) {
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 00, 01, 23, 59, 59, 999));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2010, 11, 29, 23, 59, 59, 456));
  test.end();
});

tape(`zonedDay(${zone}).offset(date, step) allows step to be negative`, function(test) {
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31), -1), date.zoned(zone, 2010, 11, 30));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2011, 00, 01), -2), date.zoned(zone, 2010, 11, 30));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2011, 00, 01), -1), date.zoned(zone, 2010, 11, 31));
  test.end();
});

tape(`zonedDay(${zone}).offset(date, step) allows step to be positive`, function(test) {
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31), +1), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 30), +2), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 30), +1), date.zoned(zone, 2010, 11, 31));
  test.end();
});

tape(`zonedDay(${zone}).offset(date, step) allows step to be zero`, function(test) {
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedDay(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop) returns days between start (inclusive) and stop (exclusive)`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 04), date.zoned(zone, 2011, 10, 10)), [
    date.zoned(zone, 2011, 10, 04),
    date.zoned(zone, 2011, 10, 05),
    date.zoned(zone, 2011, 10, 06),
    date.zoned(zone, 2011, 10, 07),
    date.zoned(zone, 2011, 10, 08),
      date.zoned(zone, 2011, 10, 09)
]);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop) returns days`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 04, 02), date.zoned(zone, 2011, 10, 10, 13)), [
    date.zoned(zone, 2011, 10, 05),
    date.zoned(zone, 2011, 10, 06),
    date.zoned(zone, 2011, 10, 07),
    date.zoned(zone, 2011, 10, 08),
      date.zoned(zone, 2011, 10, 09),
  date.zoned(zone, 2011, 10, 10)
]);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop) coerces start and stop to dates`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(+date.zoned(zone, 2011, 10, 04), +date.zoned(zone, 2011, 10, 07)), [
    date.zoned(zone, 2011, 10, 04),
    date.zoned(zone, 2011, 10, 05),
    date.zoned(zone, 2011, 10, 06)
  ]);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop) returns the empty array for invalid dates`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(new Date(NaN), Infinity), []);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop) returns the empty array if start >= stop`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 10), date.zoned(zone, 2011, 10, 04)), []);
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 10), date.zoned(zone, 2011, 10, 10)), []);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop, step) returns every step day`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 10, 04, 02), date.zoned(zone, 2011, 10, 14, 13), 3), [
    date.zoned(zone, 2011, 10, 05),
    date.zoned(zone, 2011, 10, 08),
      date.zoned(zone, 2011, 10, 11),
      date.zoned(zone, 2011, 10, 14)
]);
  test.end();
});

tape(`zonedDay(${zone}).range(start, stop, step) returns the empty array if step is zero, negative or NaN`, function(test) {
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 00), 0), []);
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 00), -1), []);
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 00), 0.5), []);
  test.deepEqual(time.zonedDay(zone).range(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 00), NaN), []);
  test.end();
});

tape(`zonedDay(${zone}).count(start, end) counts days after start (exclusive) and before end (inclusive)`, function(test) {
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 00)), 128);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01, 01), date.zoned(zone, 2011, 04, 09, 00)), 128);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2010, 11, 31, 23), date.zoned(zone, 2011, 04, 09, 00)), 129);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 08, 23)), 127);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01, 00), date.zoned(zone, 2011, 04, 09, 01)), 128);
  test.end();
});

tape(`zonedDay(${zone}).count(start, end) observes daylight saving`, function(test) {
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 01)), 71);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 03)), 71);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 02, 13, 04)), 71);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 00)), 309);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 01)), 309);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 10, 06, 02)), 309);
  test.end();
});

tape(`zonedDay(${zone}).count(start, stop) does not exhibit floating-point rounding error`, function(test) {
  var d = date.zoned(zone, 2011, 4, 9);
  test.equal(time.zonedDay(zone).count(time.zonedYear(zone)(d), d), 128);
  test.end();
});

tape(`zonedDay(${zone}).count(start, end) returns 364 or 365 for a full year`, function(test) {
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 1999, 00, 01), date.zoned(zone, 1999, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2000, 00, 01), date.zoned(zone, 2000, 11, 31)), 365); // leap year
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2001, 00, 01), date.zoned(zone, 2001, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2002, 00, 01), date.zoned(zone, 2002, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2003, 00, 01), date.zoned(zone, 2003, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2004, 00, 01), date.zoned(zone, 2004, 11, 31)), 365); // leap year
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2005, 00, 01), date.zoned(zone, 2005, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2006, 00, 01), date.zoned(zone, 2006, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2007, 00, 01), date.zoned(zone, 2007, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2008, 00, 01), date.zoned(zone, 2008, 11, 31)), 365); // leap year
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2009, 00, 01), date.zoned(zone, 2009, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2010, 00, 01), date.zoned(zone, 2010, 11, 31)), 364);
  test.equal(time.zonedDay(zone).count(date.zoned(zone, 2011, 00, 01), date.zoned(zone, 2011, 11, 31)), 364);
  test.end();
});

tape(`zonedDay(${zone}).every(step) returns every stepth day, starting with the first day of the month`, function(test) {
  test.deepEqual(time.zonedDay(zone).every(3).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 5, 23, 48)), [date.zoned(zone, 2008, 11, 31), date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 4)]);
  test.deepEqual(time.zonedDay(zone).every(5).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 6, 23, 48)), [date.zoned(zone, 2008, 11, 31), date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 6)]);
  test.deepEqual(time.zonedDay(zone).every(7).range(date.zoned(zone, 2008, 11, 30, 0, 12), date.zoned(zone, 2009, 0, 8, 23, 48)), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 8)]);
  test.end();
});


