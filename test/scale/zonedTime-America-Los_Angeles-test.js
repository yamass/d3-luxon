import assert from "assert";
import * as interpolate from "d3-interpolate";
import * as zonedTime from "../../dist/index.js";
import * as date from "../date-util.js";

var zone = "America/Los_Angeles";

it("time.domain([-1e50, 1e50]) is equivalent to time.domain([NaN, NaN])", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([-1e50, 1e50]);
  assert.strictEqual(isNaN(x.domain()[0]), true); // Note: also coerced on retrieval, so insufficient test!
  assert.strictEqual(isNaN(x.domain()[1]), true);
  assert.deepEqual(x.ticks(10), []);
});

it("time.domain(domain) accepts an iterable", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain(new Set([date.zoned(zone, 2009), date.zoned(zone, 2010)]));
  assert.deepEqual(x.domain(), [date.zoned(zone, 2009), date.zoned(zone, 2010)]);
});

it("time.nice() is an alias for time.nice(10)", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 17), date.zoned(zone, 2009, 0, 1, 23, 42)]);
  assert.deepEqual(x.nice().domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
});

it("time.nice() can nice sub-second domains", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2013, 0, 1, 12, 0, 0, 0), date.zoned(zone, 2013, 0, 1, 12, 0, 0, 128)]);
  assert.deepEqual(x.nice().domain(), [date.zoned(zone, 2013, 0, 1, 12, 0, 0, 0), date.zoned(zone, 2013, 0, 1, 12, 0, 0, 130)]);
});

it("time.nice() can nice multi-year domains", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2001, 0, 1), date.zoned(zone, 2138, 0, 1)]);
  assert.deepEqual(x.nice().domain(), [date.zoned(zone, 2000, 0, 1), date.zoned(zone, 2140, 0, 1)]);
});

it("time.nice() can nice empty domains", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
  assert.deepEqual(x.nice().domain(), [date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
});

it("time.nice(count) nices using the specified tick count", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 17), date.zoned(zone, 2009, 0, 1, 23, 42)]);
  assert.deepEqual(x.nice(100).domain(), [date.zoned(zone, 2009, 0, 1, 0, 15), date.zoned(zone, 2009, 0, 1, 23, 45)]);
  assert.deepEqual(x.nice(10).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
});

it("time.nice(interval) nices using the specified time interval", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay(zone)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
  assert.deepEqual(x.nice(zonedTime.zonedWeek(zone, 7)).domain(), [date.zoned(zone, 2008, 11, 28), date.zoned(zone, 2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedMonth(zone)).domain(), [date.zoned(zone, 2008, 11, 1), date.zoned(zone, 2009, 1, 1)]);
  assert.deepEqual(x.nice(zonedTime.zonedYear(zone)).domain(), [date.zoned(zone, 2008, 0, 1), date.zoned(zone, 2010, 0, 1)]);
});

it("time.nice(interval) can nice empty domains", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 0, 12)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay(zone)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 2)]);
});

it("time.nice(interval) can nice a polylinear domain, only affecting its extent", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48), date.zoned(zone, 2009, 0, 2, 23, 48)]).nice(zonedTime.zonedDay(zone));
  assert.deepEqual(x.domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 1, 23, 48), date.zoned(zone, 2009, 0, 3)]);
});

it("time.nice(interval.every(step)) nices using the specified time interval and step", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1, 0, 12), date.zoned(zone, 2009, 0, 1, 23, 48)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay(zone).every(3)).domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedWeek(zone, 7).every(2)).domain(), [date.zoned(zone, 2008, 11, 21), date.zoned(zone, 2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedMonth(zone).every(3)).domain(), [date.zoned(zone, 2008, 9, 1), date.zoned(zone, 2009, 3, 1)]);
  assert.deepEqual(x.nice(zonedTime.zonedYear(zone).every(10)).domain(), [date.zoned(zone, 2000, 0, 1), date.zoned(zone, 2010, 0, 1)]);
});

it("time.copy() isolates changes to the domain", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]), y = x.copy();
  x.domain([date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2011, 0, 1)]);
  assert.deepEqual(y.domain(), [date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]);
  assert.strictEqual(x(date.zoned(zone, 2010, 0, 1)), 0);
  assert.strictEqual(y(date.zoned(zone, 2010, 0, 1)), 1);
  y.domain([date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2012, 0, 1)]);
  assert.strictEqual(x(date.zoned(zone, 2011, 0, 1)), 1);
  assert.strictEqual(y(date.zoned(zone, 2011, 0, 1)), 0);
  assert.deepEqual(x.domain(), [date.zoned(zone, 2010, 0, 1), date.zoned(zone, 2011, 0, 1)]);
  assert.deepEqual(y.domain(), [date.zoned(zone, 2011, 0, 1), date.zoned(zone, 2012, 0, 1)]);
});

it("time.copy() isolates changes to the range", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]), y = x.copy();
  x.range([1, 2]);
  assert.deepEqual(x.invert(1), date.zoned(zone, 2009, 0, 1));
  assert.deepEqual(y.invert(1), date.zoned(zone, 2010, 0, 1));
  assert.deepEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assert.deepEqual(x.invert(2), date.zoned(zone, 2010, 0, 1));
  assert.deepEqual(y.invert(2), date.zoned(zone, 2009, 0, 1));
  assert.deepEqual(x.range(), [1, 2]);
  assert.deepEqual(y.range(), [2, 3]);
});

it("time.copy() isolates changes to the interpolator", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]).range(["red", "blue"]),
      i = x.interpolate(),
      y = x.copy();
  x.interpolate(interpolate.interpolateHsl);
  assert.strictEqual(x(date.zoned(zone, 2009, 6, 1)), "rgb(255, 0, 253)");
  assert.strictEqual(y(date.zoned(zone, 2009, 6, 1)), "rgb(129, 0, 126)");
  assert.strictEqual(y.interpolate(), i);
});

it("time.copy() isolates changes to clamping", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2009, 0, 1), date.zoned(zone, 2010, 0, 1)]).clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(date.zoned(zone, 2011, 0, 1)), 2);
  assert.strictEqual(y(date.zoned(zone, 2011, 0, 1)), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(date.zoned(zone, 2011, 0, 1)), 2);
  assert.strictEqual(y(date.zoned(zone, 2011, 0, 1)), 2);
  assert.strictEqual(x.clamp(), false);
});

it("time.clamp(true).invert(value) never returns a value outside the domain", () => {
  var x = zonedTime.scaleZoned(zone, 7).clamp(true);
  assert.equal(x.invert(0) instanceof Date, true);
  assert.equal(x.invert(0) !== x.invert(0), true); // returns a distinct copy
  assert.strictEqual(+x.invert(-1), +x.domain()[0]);
  assert.strictEqual(+x.invert(0), +x.domain()[0]);
  assert.strictEqual(+x.invert(1), +x.domain()[1]);
  assert.strictEqual(+x.invert(2), +x.domain()[1]);
});

it("time.ticks(interval) observes the specified tick interval", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 1, 0), date.zoned(zone, 2011, 0, 1, 12, 4, 4)]);
  assert.deepEqual(x.ticks(zonedTime.zonedMinute(zone)), [
    date.zoned(zone, 2011, 0, 1, 12, 1),
    date.zoned(zone, 2011, 0, 1, 12, 2),
    date.zoned(zone, 2011, 0, 1, 12, 3),
    date.zoned(zone, 2011, 0, 1, 12, 4)
  ]);
});

it("time.ticks(interval.every(step)) observes the specified tick interval and step", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 33, 4)]);
  assert.deepEqual(x.ticks(zonedTime.zonedMinute(zone).every(10)), [
    date.zoned(zone, 2011, 0, 1, 12, 0),
    date.zoned(zone, 2011, 0, 1, 12, 10),
    date.zoned(zone, 2011, 0, 1, 12, 20),
    date.zoned(zone, 2011, 0, 1, 12, 30)
  ]);
});

it("time.ticks(count) can generate sub-second ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 1)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0,   0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 200),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 400),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 600),
    date.zoned(zone, 2011, 0, 1, 12, 0, 0, 800),
    date.zoned(zone, 2011, 0, 1, 12, 0, 1,   0)
  ]);
});

it("time.ticks(count) can generate 1-second ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 4)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 1),
    date.zoned(zone, 2011, 0, 1, 12, 0, 2),
    date.zoned(zone, 2011, 0, 1, 12, 0, 3),
    date.zoned(zone, 2011, 0, 1, 12, 0, 4)
  ]);
});

it("time.ticks(count) can generate 5-second ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 20)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 5),
    date.zoned(zone, 2011, 0, 1, 12, 0, 10),
    date.zoned(zone, 2011, 0, 1, 12, 0, 15),
    date.zoned(zone, 2011, 0, 1, 12, 0, 20)
  ]);
});

it("time.ticks(count) can generate 15-second ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 0, 50)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 15),
    date.zoned(zone, 2011, 0, 1, 12, 0, 30),
    date.zoned(zone, 2011, 0, 1, 12, 0, 45)
  ]);
});

it("time.ticks(count) can generate 30-second ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 0), date.zoned(zone, 2011, 0, 1, 12, 1, 50)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 0, 0),
    date.zoned(zone, 2011, 0, 1, 12, 0, 30),
    date.zoned(zone, 2011, 0, 1, 12, 1, 0),
    date.zoned(zone, 2011, 0, 1, 12, 1, 30)
  ]);
});

it("time.ticks(count) can generate 1-minute ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 0, 27), date.zoned(zone, 2011, 0, 1, 12, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 1),
    date.zoned(zone, 2011, 0, 1, 12, 2),
    date.zoned(zone, 2011, 0, 1, 12, 3),
    date.zoned(zone, 2011, 0, 1, 12, 4)
  ]);
});

it("time.ticks(count) can generate 5-minute ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 3, 27), date.zoned(zone, 2011, 0, 1, 12, 21, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 5),
    date.zoned(zone, 2011, 0, 1, 12, 10),
    date.zoned(zone, 2011, 0, 1, 12, 15),
    date.zoned(zone, 2011, 0, 1, 12, 20)
  ]);
});

it("time.ticks(count) can generate 15-minute ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 8, 27), date.zoned(zone, 2011, 0, 1, 13, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 15),
    date.zoned(zone, 2011, 0, 1, 12, 30),
    date.zoned(zone, 2011, 0, 1, 12, 45),
    date.zoned(zone, 2011, 0, 1, 13, 0)
  ]);
});

it("time.ticks(count) can generate 30-minute ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 28, 27), date.zoned(zone, 2011, 0, 1, 14, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 12, 30),
    date.zoned(zone, 2011, 0, 1, 13, 0),
    date.zoned(zone, 2011, 0, 1, 13, 30),
    date.zoned(zone, 2011, 0, 1, 14, 0)
  ]);
});

it("time.ticks(count) can generate 1-hour ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 12, 28, 27), date.zoned(zone, 2011, 0, 1, 16, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 13, 0),
    date.zoned(zone, 2011, 0, 1, 14, 0),
    date.zoned(zone, 2011, 0, 1, 15, 0),
    date.zoned(zone, 2011, 0, 1, 16, 0)
  ]);
});

it("time.ticks(count) can generate 3-hour ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 14, 28, 27), date.zoned(zone, 2011, 0, 2, 1, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 15, 0),
    date.zoned(zone, 2011, 0, 1, 18, 0),
    date.zoned(zone, 2011, 0, 1, 21, 0),
    date.zoned(zone, 2011, 0, 2, 0, 0)
  ]);
});

it("time.ticks(count) can generate 6-hour ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 2, 14, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 18, 0),
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 2, 6, 0),
    date.zoned(zone, 2011, 0, 2, 12, 0)
  ]);
});

it("time.ticks(count) can generate 12-hour ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 3, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 2, 12, 0),
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 3, 12, 0)
  ]);
});

it("time.ticks(count) can generate 1-day ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 5, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 4, 0, 0),
    date.zoned(zone, 2011, 0, 5, 0, 0)
  ]);
});

it("time.ticks(count) can generate 2-day ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 2, 16, 28, 27), date.zoned(zone, 2011, 0, 9, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 3, 0, 0),
    date.zoned(zone, 2011, 0, 5, 0, 0),
    date.zoned(zone, 2011, 0, 7, 0, 0),
    date.zoned(zone, 2011, 0, 9, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-week ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 1, 16, 28, 27), date.zoned(zone, 2011, 0, 23, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 2, 0, 0),
    date.zoned(zone, 2011, 0, 9, 0, 0),
    date.zoned(zone, 2011, 0, 16, 0, 0),
    date.zoned(zone, 2011, 0, 23, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-month ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2011, 0, 18), date.zoned(zone, 2011, 4, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 1, 1, 0, 0),
    date.zoned(zone, 2011, 2, 1, 0, 0),
    date.zoned(zone, 2011, 3, 1, 0, 0),
    date.zoned(zone, 2011, 4, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate 3-month ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2010, 11, 18), date.zoned(zone, 2011, 10, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 0, 0),
    date.zoned(zone, 2011, 3, 1, 0, 0),
    date.zoned(zone, 2011, 6, 1, 0, 0),
    date.zoned(zone, 2011, 9, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-year ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2010, 11, 18), date.zoned(zone, 2014, 2, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.zoned(zone, 2011, 0, 1, 0, 0),
    date.zoned(zone, 2012, 0, 1, 0, 0),
    date.zoned(zone, 2013, 0, 1, 0, 0),
    date.zoned(zone, 2014, 0, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate multi-year ticks", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 0, 11, 18), date.zoned(zone, 2014, 2, 2)]);
  assert.deepEqual(x.ticks(6), [
    date.zoned(zone,  500, 0, 1, 0, 0),
    date.zoned(zone, 1000, 0, 1, 0, 0),
    date.zoned(zone, 1500, 0, 1, 0, 0),
    date.zoned(zone, 2000, 0, 1, 0, 0)
  ]);
});

it("time.ticks(count) returns one tick for an empty domain", () => {
  var x = zonedTime.scaleZoned(zone, 7).domain([date.zoned(zone, 2014, 2, 2), date.zoned(zone, 2014, 2, 2)]);
  assert.deepEqual(x.ticks(6), [date.zoned(zone, 2014, 2, 2)]);
});

it("time.ticks() returns descending ticks for a descending domain", () => {
  var x = zonedTime.scaleZoned(zone, 7);
  assert.deepEqual(x.domain([date.zoned(zone, 2014, 2, 2), date.zoned(zone, 2010, 11, 18)]).ticks(4), [date.zoned(zone, 2014, 0, 1, 0, 0), date.zoned(zone, 2013, 0, 1, 0, 0), date.zoned(zone, 2012, 0, 1, 0, 0), date.zoned(zone, 2011, 0, 1, 0, 0)]);
  assert.deepEqual(x.domain([date.zoned(zone, 2011, 10, 2), date.zoned(zone, 2010, 11, 18)]).ticks(4), [date.zoned(zone, 2011, 9, 1, 0, 0), date.zoned(zone, 2011, 6, 1, 0, 0), date.zoned(zone, 2011, 3, 1, 0, 0), date.zoned(zone, 2011, 0, 1, 0, 0)]);
});
