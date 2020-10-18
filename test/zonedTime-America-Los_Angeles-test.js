var tape = require("tape"),
    interpolate = require("d3-interpolate"),
    zonedTime = require("../"),
    scale = require("../"),
    date = require("./date");

var zone = "America/Los_Angeles";

tape("time.domain([-1e50, 1e50]) is equivalent to time.domain([NaN, NaN])", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([-1e50, 1e50]);
  test.equal(isNaN(x.domain()[0]), true); // Note: also coerced on retrieval, so insufficient test!
  test.equal(isNaN(x.domain()[1]), true);
  test.deepEqual(x.ticks(10), []);
  test.end();
});

tape("time.domain(domain) accepts an iterable", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain(new Set([date.zoned(zone, 2009), date.zoned(zone, 2010)]));
  test.deepEqual(x.domain(), [date.zoned(zone, 2009), date.zoned(zone, 2010)]);
  test.end();
});

tape("time.nice() is an alias for time.nice(10)", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 17), date.zoned(zone, 2009, 0, 1, 23, 42)]);
  test.deepEqual(x.nice().domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
  test.end();
});

tape("time.nice() can nice sub-second domains", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2013, 0, 1, 12, 0, 0, 0), date.zoned(zone, 2013, 0, 1, 12, 0, 0, 128)]);
  test.deepEqual(x.nice().domain(), [date.zoned(zone, 2013, 0, 1, 12, 0, 0, 0), date.zoned(zone, 2013, 0, 1, 12, 0, 0, 130)]);
  test.end();
});

tape("time.nice() can nice multi-year domains", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2001, 0, 1), date.zoned(zone, 2138, 0, 1)]);
  test.deepEqual(x.nice().domain(), [date.zoned(zone, 2000, 0, 1), date.zoned(zone, 2140, 0, 1)]);
  test.end();
});

tape("time.nice() can nice empty domains", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
  test.deepEqual(x.nice().domain(), [date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
  test.end();
});

tape("time.nice(count) nices using the specified tick count", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 17), date.zoned(zone, 2009, 0, 1, 23, 42)]);
  test.deepEqual(x.nice(100).domain(), [date.zoned(zone, 2009, 0, 1, 0, 15), date.zoned(zone, 2009, 0, 1, 23, 45)]);
  test.deepEqual(x.nice(10).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
  test.end();
});

tape("time.nice(interval) nices using the specified time interval", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48)]);
  test.deepEqual(x.nice(zonedTime.zonedDay(zone)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
  test.deepEqual(x.nice(zonedTime.zonedWeek(zone, 7)).domain(), [date.zoned(zone, 2008, 11, 28), date.zoned(zone, 2009, 0, 4)]);
  test.deepEqual(x.nice(zonedTime.zonedMonth(zone)).domain(), [date.zoned(zone, 2008, 11, 1), date.zoned(zone, 2009, 1, 1)]);
  test.deepEqual(x.nice(zonedTime.zonedYear(zone)).domain(), [date.zoned(zone, 2008, 0, 1), date.zoned(zone, 2010, 0, 1)]);
  test.end();
});

tape("time.nice(interval) can nice empty domains", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
  test.deepEqual(x.nice(zonedTime.zonedDay(zone)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
  test.end();
});

tape("time.nice(interval) can nice a polylinear domain, only affecting its extent", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48), date.zoned(zone, 2009, 0, 2, 23, 48)]).nice(zonedTime.zonedDay(zone));
  test.deepEqual(x.domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 1, 23, 48), date.zoned(zone, 2009, 0, 3)]);
  test.end();
});

tape("time.nice(interval.every(step)) nices using the specified time interval and step", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48)]);
  test.deepEqual(x.nice(zonedTime.zonedDay(zone).every(3)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 4)]);
  test.deepEqual(x.nice(zonedTime.zonedWeek(zone, 7).every(2)).domain(), [date.zoned(zone, 2008, 11, 21), date.zoned(zone, 2009, 0, 4)]);
  test.deepEqual(x.nice(zonedTime.zonedMonth(zone).every(3)).domain(), [date.zoned(zone, 2008, 9, 1), date.zoned(zone, 2009, 3, 1)]);
  test.deepEqual(x.nice(zonedTime.zonedYear(zone).every(10)).domain(), [date.zoned(zone, 2000, 0, 1), date.zoned(zone, 2010, 0, 1)]);
  test.end();
});

tape("time.copy() isolates changes to the domain", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]), y = x.copy();
  x.domain([date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2011, 0, 1)]);
  test.deepEqual(y.domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]);
  test.equal(x(date.zoned(zone, 2010, 0, 1)), 0);
  test.equal(y(date.zoned(zone, 2010, 0, 1)), 1);
  y.domain([date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2012, 0, 1)]);
  test.equal(x(date.zoned(zone, 2011, 0, 1)), 1);
  test.equal(y(date.zoned(zone, 2011, 0, 1)), 0);
  test.deepEqual(x.domain(), [date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2011, 0, 1)]);
  test.deepEqual(y.domain(), [date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2012, 0, 1)]);
  test.end();
});

tape("time.copy() isolates changes to the range", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]), y = x.copy();
  x.range([1, 2]);
  test.deepEqual(x.invert(1), date.zoned(zone, 2009, 0, 1));
  test.deepEqual(y.invert(1), date.zoned(zone, 2010, 0, 1));
  test.deepEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  test.deepEqual(x.invert(2), date.zoned(zone, 2010, 0, 1));
  test.deepEqual(y.invert(2), date.zoned(zone, 2009, 0, 1));
  test.deepEqual(x.range(), [1, 2]);
  test.deepEqual(y.range(), [2, 3]);
  test.end();
});

tape("time.copy() isolates changes to the interpolator", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]).range(["red", "blue"]),
      i = x.interpolate(),
      y = x.copy();
  x.interpolate(interpolate.interpolateHsl);
  test.equal(x(date.zoned(zone, 2009, 6, 1)), "rgb(255, 0, 253)");
  test.equal(y(date.zoned(zone, 2009, 6, 1)), "rgb(129, 0, 126)");
  test.equal(y.interpolate(), i);
  test.end();
});

tape("time.copy() isolates changes to clamping", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]).clamp(true), y = x.copy();
  x.clamp(false);
  test.equal(x(date.zoned(zone, 2011, 0, 1)), 2);
  test.equal(y(date.zoned(zone, 2011, 0, 1)), 1);
  test.equal(y.clamp(), true);
  y.clamp(false);
  test.equal(x(date.zoned(zone, 2011, 0, 1)), 2);
  test.equal(y(date.zoned(zone, 2011, 0, 1)), 2);
  test.equal(x.clamp(), false);
  test.end();
});

tape("time.clamp(true).invert(value) never returns a value outside the domain", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).clamp(true);
  test.ok(x.invert(0) instanceof Date);
  test.ok(x.invert(0) !== x.invert(0)); // returns a distinct copy
  test.equal(+x.invert(-1), +x.domain()[0]);
  test.equal(+x.invert(0), +x.domain()[0]);
  test.equal(+x.invert(1), +x.domain()[1]);
  test.equal(+x.invert(2), +x.domain()[1]);
  test.end();
});

tape("time.ticks(interval) observes the specified tick interval", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 1, 0), date.zoned(zone, 2011, 0, 1, 12, 4, 4)]);
  test.deepEqual(x.ticks(zonedTime.zonedMinute(zone)), [
    date.zoned(zone, 2011, 0, 1, 12, 1),
    date.zoned(zone, 2011, 0, 1, 12, 2),
    date.zoned(zone, 2011, 0, 1, 12, 3),
    date.zoned(zone, 2011, 0, 1, 12, 4)
  ]);
  test.end();
});

tape("time.ticks(interval.every(step)) observes the specified tick interval and step", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 33, 4)]);
  test.deepEqual(x.ticks(zonedTime.zonedMinute(zone).every(10)), [
    date.zoned(zone, 2011, 0, 1, 12, 0),
    date.zoned(zone, 2011, 0, 1, 12, 10),
    date.zoned(zone, 2011, 0, 1, 12, 20),
    date.zoned(zone, 2011, 0, 1, 12, 30)
  ]);
  test.end();
});

tape("time.ticks(count) can generate sub-second ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 1)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0,   0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 200),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 400),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 600),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 800),
    date.zoned(zone, 2011, 0, 1, 12, 0, 1,   0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-second ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 4)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 1),
    date.zoned(zone, 2011, 0, 1, 12, 0, 2),
    date.zoned(zone, 2011, 0, 1, 12, 0, 3),
    date.zoned(zone, 2011, 0, 1, 12, 0, 4)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 5-second ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 20)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 5),
    date.zoned(zone, 2011, 0, 1, 12, 0, 10),
    date.zoned(zone, 2011, 0, 1, 12, 0, 15),
    date.zoned(zone, 2011, 0, 1, 12, 0, 20)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 15-second ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 50)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 15),
    date.zoned(zone, 2011, 0, 1, 12, 0, 30),
    date.zoned(zone, 2011, 0, 1, 12, 0, 45)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 30-second ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 1, 50)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 30),
    date.zoned(zone, 2011, 0, 1, 12, 1, 0),
    date.zoned(zone, 2011, 0, 1, 12, 1, 30)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-minute ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 27), date.zoned(zone, 2011, 0, 1, 12, 4, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 1),
    date.zoned(zone, 2011, 0, 1, 12, 2),
    date.zoned(zone, 2011, 0, 1, 12, 3),
    date.zoned(zone, 2011, 0, 1, 12, 4)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 5-minute ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 3, 27), date.zoned(zone, 2011, 0, 1, 12, 21, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 5),
    date.zoned(zone, 2011, 0, 1, 12, 10),
    date.zoned(zone, 2011, 0, 1, 12, 15),
    date.zoned(zone, 2011, 0, 1, 12, 20)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 15-minute ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 8, 27), date.zoned(zone, 2011, 0, 1, 13, 4, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 15),
    date.zoned(zone, 2011, 0, 1, 12, 30),
    date.zoned(zone, 2011, 0, 1, 12, 45),
    date.zoned(zone, 2011, 0, 1, 13, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 30-minute ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 28, 27), date.zoned(zone, 2011, 0, 1, 14, 4, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 30),
    date.zoned(zone, 2011, 0, 1, 13, 0),
    date.zoned(zone, 2011, 0, 1, 13, 30),
    date.zoned(zone, 2011, 0, 1, 14, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-hour ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 28, 27), date.zoned(zone, 2011, 0, 1, 16, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 13, 0),
    date.zoned(zone, 2011, 0, 1, 14, 0),
    date.zoned(zone, 2011, 0, 1, 15, 0),
    date.zoned(zone, 2011, 0, 1, 16, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 3-hour ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 14, 28, 27), date.zoned(zone, 2011, 0, 2, 1, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 15, 0),
    date.zoned(zone, 2011, 0, 1, 18, 0),
    date.zoned(zone, 2011, 0, 1, 21, 0),
    date.zoned(zone, 2011, 0, 2, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 6-hour ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 2, 14, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 18, 0),
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 2, 6, 0),
    date.zoned(zone, 2011, 0, 2, 12, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 12-hour ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 3, 21, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 2, 12, 0),
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 3, 12, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-day ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 5, 21, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 4, 0, 0),
    date.zoned(zone, 2011, 0, 5, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 2-day ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 2, 16, 28, 27), date.zoned(zone, 2011, 0, 9, 21, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 5, 0, 0),
    date.zoned(zone, 2011, 0, 7, 0, 0),
    date.zoned(zone, 2011, 0, 9, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-week ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 23, 21, 34, 12)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 9, 0, 0),
    date.zoned(zone, 2011, 0, 16, 0, 0),
    date.zoned(zone, 2011, 0, 23, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-month ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 18), date.zoned(zone, 2011, 4, 2)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 1, 1, 0, 0),
    date.zoned(zone, 2011, 2, 1, 0, 0),
    date.zoned(zone, 2011, 3, 1, 0, 0),
    date.zoned(zone, 2011, 4, 1, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 3-month ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2010, 11, 18), date.zoned(zone, 2011, 10, 2)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 0, 0),
    date.zoned(zone, 2011, 3, 1, 0, 0),
    date.zoned(zone, 2011, 6, 1, 0, 0),
    date.zoned(zone, 2011, 9, 1, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate 1-year ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2010, 11, 18), date.zoned(zone, 2014, 2, 2)]);
  test.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 0, 0),
    date.zoned(zone, 2012, 0, 1, 0, 0),
    date.zoned(zone, 2013, 0, 1, 0, 0),
    date.zoned(zone, 2014, 0, 1, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) can generate multi-year ticks", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 0, 11, 18), date.zoned(zone, 2014, 2, 2)]);
  test.deepEqual(x.ticks(6), [
    date.zoned(zone,  500, 0, 1, 0, 0),
    date.zoned(zone, 1000, 0, 1, 0, 0),
    date.zoned(zone, 1500, 0, 1, 0, 0),
    date.zoned(zone, 2000, 0, 1, 0, 0)
  ]);
  test.end();
});

tape("time.ticks(count) returns one tick for an empty domain", function(test) {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2014, 2, 2), date.zoned(zone, 2014, 2, 2)]);
  test.deepEqual(x.ticks(6), [date.zoned(zone, 2014, 2, 2)]);
  test.end();
});

tape("time.ticks() returns descending ticks for a descending domain", function(test) {
  var x = zonedTime.scaleZoned(zone, 7);
  test.deepEqual(x.domain([date.zoned(zone, 2014, 2, 2), date.zoned(zone, 2010, 11, 18)]).ticks(4), [date.zoned(zone, 2014, 0, 1, 0, 0), date.zoned(zone, 2013, 0, 1, 0, 0), date.zoned(zone, 2012, 0, 1, 0, 0), date.zoned(zone, 2011, 0, 1, 0, 0)]);
  test.deepEqual(x.domain([date.zoned(zone, 2011, 10, 2), date.zoned(zone, 2010, 11, 18)]).ticks(4), [date.zoned(zone, 2011, 9, 1, 0, 0), date.zoned(zone, 2011, 6, 1, 0, 0), date.zoned(zone, 2011, 3, 1, 0, 0), date.zoned(zone, 2011, 0, 1, 0, 0)]);
  test.end();
});
