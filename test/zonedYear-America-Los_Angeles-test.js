var tape = require("tape"),
    time = require("../"),
    date = require("./date");

var zone = "America/Los_Angeles";

tape(`zonedYear(${zone}).floor(date) returns years`, function(test) {
  test.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2010, 00, 01));
  test.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).floor(date) does not modify the specified date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59);
  test.deepEqual(time.zonedYear(zone).floor(d), date.zoned(zone, 2010, 00, 01));
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59));
  test.end();
});

tape(`zonedYear(${zone}).floor(date) correctly handles years in the first century`, function(test) {
  test.deepEqual(time.zonedYear(zone).floor(date.zoned(zone, 0011, 10, 06, 07)), date.zoned(zone, 0011, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).ceil(date) returns years`, function(test) {
  test.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2010, 11, 31, 23, 59, 59)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 00)), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedYear(zone).ceil(date.zoned(zone, 2011, 00, 01, 00, 00, 01)), date.zoned(zone, 2012, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).offset(date, count) does not modify the passed-in date`, function(test) {
  var d = date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999);
  time.zonedYear(zone).offset(d, +1);
  test.deepEqual(d, date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.end();
});

tape(`zonedYear(${zone}).offset(date, count) does not round the passed-in-date`, function(test) {
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), +1), date.zoned(zone, 2011, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 456), -2), date.zoned(zone, 2008, 11, 31, 23, 59, 59, 456));
  test.end();
});

tape(`zonedYear(${zone}).offset(date, count) allows negative offsets`, function(test) {
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 01), -1), date.zoned(zone, 2009, 11, 01));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2011, 00, 01), -2), date.zoned(zone, 2009, 00, 01));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2011, 00, 01), -1), date.zoned(zone, 2010, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).offset(date, count) allows positive offsets`, function(test) {
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2009, 11, 01), +1), date.zoned(zone, 2010, 11, 01));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2009, 00, 01), +2), date.zoned(zone, 2011, 00, 01));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 00, 01), +1), date.zoned(zone, 2011, 00, 01));
  test.end();
});

tape(`zonedYear(${zone}).offset(date, count) allows zero offset`, function(test) {
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 59, 999));
  test.deepEqual(time.zonedYear(zone).offset(date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000), 0), date.zoned(zone, 2010, 11, 31, 23, 59, 58, 000));
  test.end();
});

tape(`zonedYear(${zone}).every(step) returns every stepth year, starting with year zero`, function(test) {
  test.deepEqual(time.zonedYear(zone).every(5).range(date.zoned(zone, 2008), date.zoned(zone, 2023)), [date.zoned(zone, 2010), date.zoned(zone, 2015), date.zoned(zone, 2020)]);
  test.end();
});

tape(`zonedYear(${zone}).range(start, stop) returns years`, function(test) {
  test.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1)), [
    date.zoned(zone, 2010, 0, 1),
    date.zoned(zone, 2011, 0, 1),
    date.zoned(zone, 2012, 0, 1)
  ]);
  test.end();
});

tape(`zonedYear(${zone}).range(start, stop) has an inclusive lower bound`, function(test) {
  test.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1))[0], date.zoned(zone, 2010, 0, 1));
  test.end();
});

tape(`zonedYear(${zone}).range(start, stop) has an exclusive upper bound`, function(test) {
  test.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2013, 0, 1))[2], date.zoned(zone, 2012, 0, 1));
  test.end();
});

tape(`zonedYear(${zone}).range(start, stop, step) can skip years`, function(test) {
  test.deepEqual(time.zonedYear(zone).range(date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2029, 0, 1), 5), [
    date.zoned(zone, 2009, 0, 1),
    date.zoned(zone, 2014, 0, 1),
    date.zoned(zone, 2019, 0, 1),
    date.zoned(zone, 2024, 0, 1)
  ]);
  test.end();
});
