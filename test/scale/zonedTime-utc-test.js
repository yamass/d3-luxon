import assert from "assert";
import * as interpolate from "d3-interpolate";
import * as zonedTime from "../../src/index.js";
import * as date from "../date-util.js";

it(`scaleZoned.nice() is an alias for scaleZoned.nice(10)`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 17), date.utc(2009, 0, 1, 23, 42)]);
  assert.deepEqual(x.nice().domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 2)]);
});

it(`scaleZoned.nice() can nice sub-second domains`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2013, 0, 1, 12, 0, 0, 0), date.utc(2013, 0, 1, 12, 0, 0, 128)]);
  assert.deepEqual(x.nice().domain(), [date.utc(2013, 0, 1, 12, 0, 0, 0), date.utc(2013, 0, 1, 12, 0, 0, 130)]);
});

it(`scaleZoned.nice() can nice multi-year domains`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2001, 0, 1), date.utc(2138, 0, 1)]);
  assert.deepEqual(x.nice().domain(), [date.utc(2000, 0, 1), date.utc(2140, 0, 1)]);
});

it(`scaleZoned.nice() can nice empty domains`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 0, 12)]);
  assert.deepEqual(x.nice().domain(), [date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 0, 12)]);
});

it(`scaleZoned.nice(count) nices using the specified tick count`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 17), date.utc(2009, 0, 1, 23, 42)]);
  assert.deepEqual(x.nice(100).domain(), [date.utc(2009, 0, 1, 0, 15), date.utc(2009, 0, 1, 23, 45)]);
  assert.deepEqual(x.nice(10).domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 2)]);
});

it(`scaleZoned.nice(interval) nices using the specified time interval`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 23, 48)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay("UTC")).domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 2)]);
  assert.deepEqual(x.nice(zonedTime.zonedWeek("UTC", 7)).domain(), [date.utc(2008, 11, 28), date.utc(2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedMonth("UTC")).domain(), [date.utc(2008, 11, 1), date.utc(2009, 1, 1)]);
  assert.deepEqual(x.nice(zonedTime.zonedYear("UTC")).domain(), [date.utc(2008, 0, 1), date.utc(2010, 0, 1)]);
});

it(`scaleZoned.nice(interval) can nice empty domains`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 0, 12)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay("UTC")).domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 2)]);
});

it(`scaleZoned.nice(interval) can nice a polylinear domain, only affecting its extent`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 23, 48), date.utc(2009, 0, 2, 23, 48)]).nice(zonedTime.zonedDay("UTC"));
  assert.deepEqual(x.domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 1, 23, 48), date.utc(2009, 0, 3)]);
});

it(`scaleZoned.nice(interval.every(step)) nices using the specified time interval and step`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1, 0, 12), date.utc(2009, 0, 1, 23, 48)]);
  assert.deepEqual(x.nice(zonedTime.zonedDay("UTC").every(3)).domain(), [date.utc(2009, 0, 1), date.utc(2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedWeek("UTC", 7).every(2)).domain(), [date.utc(2008, 11, 21), date.utc(2009, 0, 4)]);
  assert.deepEqual(x.nice(zonedTime.zonedMonth("UTC").every(3)).domain(), [date.utc(2008, 9, 1), date.utc(2009, 3, 1)]);
  assert.deepEqual(x.nice(zonedTime.zonedYear("UTC").every(10)).domain(), [date.utc(2000, 0, 1), date.utc(2010, 0, 1)]);
});

it(`scaleZoned.copy() isolates changes to the domain`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1), date.utc(2010, 0, 1)]), y = x.copy();
  x.domain([date.utc(2010, 0, 1), date.utc(2011, 0, 1)]);
  assert.deepEqual(y.domain(), [date.utc(2009, 0, 1), date.utc(2010, 0, 1)]);
  assert.strictEqual(x(date.utc(2010, 0, 1)), 0);
  assert.strictEqual(y(date.utc(2010, 0, 1)), 1);
  y.domain([date.utc(2011, 0, 1), date.utc(2012, 0, 1)]);
  assert.strictEqual(x(date.utc(2011, 0, 1)), 1);
  assert.strictEqual(y(date.utc(2011, 0, 1)), 0);
  assert.deepEqual(x.domain(), [date.utc(2010, 0, 1), date.utc(2011, 0, 1)]);
  assert.deepEqual(y.domain(), [date.utc(2011, 0, 1), date.utc(2012, 0, 1)]);
});

it(`scaleZoned.copy() isolates changes to the range`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1), date.utc(2010, 0, 1)]), y = x.copy();
  x.range([1, 2]);
  assert.deepEqual(x.invert(1), date.utc(2009, 0, 1));
  assert.deepEqual(y.invert(1), date.utc(2010, 0, 1));
  assert.deepEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assert.deepEqual(x.invert(2), date.utc(2010, 0, 1));
  assert.deepEqual(y.invert(2), date.utc(2009, 0, 1));
  assert.deepEqual(x.range(), [1, 2]);
  assert.deepEqual(y.range(), [2, 3]);
});

it(`scaleZoned.copy() isolates changes to the interpolator`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1), date.utc(2010, 0, 1)]).range(["red", "blue"]),
      i = x.interpolate(),
      y = x.copy();
  x.interpolate(interpolate.interpolateHsl);
  assert.strictEqual(x(date.utc(2009, 6, 1)), "rgb(255, 0, 253)");
  assert.strictEqual(y(date.utc(2009, 6, 1)), "rgb(129, 0, 126)");
  assert.strictEqual(y.interpolate(), i);
});

it(`scaleZoned.copy() isolates changes to clamping`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2009, 0, 1), date.utc(2010, 0, 1)]).clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(date.utc(2011, 0, 1)), 2);
  assert.strictEqual(y(date.utc(2011, 0, 1)), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(date.utc(2011, 0, 1)), 2);
  assert.strictEqual(y(date.utc(2011, 0, 1)), 2);
  assert.strictEqual(x.clamp(), false);
});

it(`scaleZoned.ticks(interval) observes the specified tick interval`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 1, 0), date.utc(2011, 0, 1, 12, 4, 4)]);
  assert.deepEqual(x.ticks(zonedTime.zonedMinute("UTC")), [
    date.utc(2011, 0, 1, 12, 1),
    date.utc(2011, 0, 1, 12, 2),
    date.utc(2011, 0, 1, 12, 3),
    date.utc(2011, 0, 1, 12, 4)
  ]);
});

it(`scaleZoned.ticks(interval) observes the specified named tick interval`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 1, 0), date.utc(2011, 0, 1, 12, 4, 4)]);
  assert.deepEqual(x.ticks(zonedTime.zonedMinute("UTC")), [
    date.utc(2011, 0, 1, 12, 1),
    date.utc(2011, 0, 1, 12, 2),
    date.utc(2011, 0, 1, 12, 3),
    date.utc(2011, 0, 1, 12, 4)
  ]);
});

it(`scaleZoned.ticks(interval.every(step)) observes the specified tick interval and step`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 33, 4)]);
  assert.deepEqual(x.ticks(zonedTime.zonedMinute("UTC").every(10)), [
    date.utc(2011, 0, 1, 12, 0),
    date.utc(2011, 0, 1, 12, 10),
    date.utc(2011, 0, 1, 12, 20),
    date.utc(2011, 0, 1, 12, 30)
  ]);
});

it(`scaleZoned.ticks(count) can generate sub-second ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 0, 1)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 0, 0,   0),
    date.utc(2011, 0, 1, 12, 0, 0, 200),
    date.utc(2011, 0, 1, 12, 0, 0, 400),
    date.utc(2011, 0, 1, 12, 0, 0, 600),
    date.utc(2011, 0, 1, 12, 0, 0, 800),
    date.utc(2011, 0, 1, 12, 0, 1,   0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-second ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 0, 4)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 0, 0),
    date.utc(2011, 0, 1, 12, 0, 1),
    date.utc(2011, 0, 1, 12, 0, 2),
    date.utc(2011, 0, 1, 12, 0, 3),
    date.utc(2011, 0, 1, 12, 0, 4)
  ]);
});

it(`scaleZoned.ticks(count) can generate 5-second ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 0, 20)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 0, 0),
    date.utc(2011, 0, 1, 12, 0, 5),
    date.utc(2011, 0, 1, 12, 0, 10),
    date.utc(2011, 0, 1, 12, 0, 15),
    date.utc(2011, 0, 1, 12, 0, 20)
  ]);
});

it(`scaleZoned.ticks(count) can generate 15-second ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 0, 50)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 0, 0),
    date.utc(2011, 0, 1, 12, 0, 15),
    date.utc(2011, 0, 1, 12, 0, 30),
    date.utc(2011, 0, 1, 12, 0, 45)
  ]);
});

it(`scaleZoned.ticks(count) can generate 30-second ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 0), date.utc(2011, 0, 1, 12, 1, 50)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 0, 0),
    date.utc(2011, 0, 1, 12, 0, 30),
    date.utc(2011, 0, 1, 12, 1, 0),
    date.utc(2011, 0, 1, 12, 1, 30)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-minute ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 0, 27), date.utc(2011, 0, 1, 12, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 1),
    date.utc(2011, 0, 1, 12, 2),
    date.utc(2011, 0, 1, 12, 3),
    date.utc(2011, 0, 1, 12, 4)
  ]);
});

it(`scaleZoned.ticks(count) can generate 5-minute ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 3, 27), date.utc(2011, 0, 1, 12, 21, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 5),
    date.utc(2011, 0, 1, 12, 10),
    date.utc(2011, 0, 1, 12, 15),
    date.utc(2011, 0, 1, 12, 20)
  ]);
});

it(`scaleZoned.ticks(count) can generate 15-minute ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 8, 27), date.utc(2011, 0, 1, 13, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 15),
    date.utc(2011, 0, 1, 12, 30),
    date.utc(2011, 0, 1, 12, 45),
    date.utc(2011, 0, 1, 13, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 30-minute ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 28, 27), date.utc(2011, 0, 1, 14, 4, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 12, 30),
    date.utc(2011, 0, 1, 13, 0),
    date.utc(2011, 0, 1, 13, 30),
    date.utc(2011, 0, 1, 14, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-hour ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 12, 28, 27), date.utc(2011, 0, 1, 16, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 13, 0),
    date.utc(2011, 0, 1, 14, 0),
    date.utc(2011, 0, 1, 15, 0),
    date.utc(2011, 0, 1, 16, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 3-hour ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 14, 28, 27), date.utc(2011, 0, 2, 1, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 15, 0),
    date.utc(2011, 0, 1, 18, 0),
    date.utc(2011, 0, 1, 21, 0),
    date.utc(2011, 0, 2, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 6-hour ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 16, 28, 27), date.utc(2011, 0, 2, 14, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 18, 0),
    date.utc(2011, 0, 2, 0, 0),
    date.utc(2011, 0, 2, 6, 0),
    date.utc(2011, 0, 2, 12, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 12-hour ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 16, 28, 27), date.utc(2011, 0, 3, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 2, 0, 0),
    date.utc(2011, 0, 2, 12, 0),
    date.utc(2011, 0, 3, 0, 0),
    date.utc(2011, 0, 3, 12, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-day ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 16, 28, 27), date.utc(2011, 0, 5, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 2, 0, 0),
    date.utc(2011, 0, 3, 0, 0),
    date.utc(2011, 0, 4, 0, 0),
    date.utc(2011, 0, 5, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 2-day ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 2, 16, 28, 27), date.utc(2011, 0, 9, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 3, 0, 0),
    date.utc(2011, 0, 5, 0, 0),
    date.utc(2011, 0, 7, 0, 0),
    date.utc(2011, 0, 9, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-week ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 1, 16, 28, 27), date.utc(2011, 0, 23, 21, 34, 12)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 2, 0, 0),
    date.utc(2011, 0, 9, 0, 0),
    date.utc(2011, 0, 16, 0, 0),
    date.utc(2011, 0, 23, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-month ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2011, 0, 18), date.utc(2011, 4, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 1, 1, 0, 0),
    date.utc(2011, 2, 1, 0, 0),
    date.utc(2011, 3, 1, 0, 0),
    date.utc(2011, 4, 1, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 3-month ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2010, 11, 18), date.utc(2011, 10, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 0, 0),
    date.utc(2011, 3, 1, 0, 0),
    date.utc(2011, 6, 1, 0, 0),
    date.utc(2011, 9, 1, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate 1-year ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2010, 11, 18), date.utc(2014, 2, 2)]);
  assert.deepEqual(x.ticks(4), [
    date.utc(2011, 0, 1, 0, 0),
    date.utc(2012, 0, 1, 0, 0),
    date.utc(2013, 0, 1, 0, 0),
    date.utc(2014, 0, 1, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) can generate multi-year ticks`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(0, 11, 18), date.utc(2014, 2, 2)]);
  assert.deepEqual(x.ticks(6), [
    date.utc( 500, 0, 1, 0, 0),
    date.utc(1000, 0, 1, 0, 0),
    date.utc(1500, 0, 1, 0, 0),
    date.utc(2000, 0, 1, 0, 0)
  ]);
});

it(`scaleZoned.ticks(count) returns one tick for an empty domain`, () => {
  var x = zonedTime.scaleZoned("UTC", 7).domain([date.utc(2014, 2, 2), date.utc(2014, 2, 2)]);
  assert.deepEqual(x.ticks(6), [date.utc(2014, 2, 2)]);
});

it(`scaleZoned.tickFormat()(date) formats year on New Year's`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 0, 1)), "2011");
  assert.strictEqual(f(date.utc(2012, 0, 1)), "2012");
  assert.strictEqual(f(date.utc(2013, 0, 1)), "2013");
});

it(`scaleZoned.tickFormat()(date) formats month on the 1st of each month`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 1)), "February");
  assert.strictEqual(f(date.utc(2011, 2, 1)), "March");
  assert.strictEqual(f(date.utc(2011, 3, 1)), "April");
});

it(`scaleZoned.tickFormat()(date) formats week on Sunday midnight`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 6)), "Feb 6");
  assert.strictEqual(f(date.utc(2011, 1, 13)), "Feb 13");
  assert.strictEqual(f(date.utc(2011, 1, 20)), "Feb 20");
});

it(`scaleZoned.tickFormat()(date) formats date on midnight`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 2)), "Feb 2"); // !! intentionally differs from default implementation
  assert.strictEqual(f(date.utc(2011, 1, 3)), "Feb 3"); // !! intentionally differs from default implementation
  assert.strictEqual(f(date.utc(2011, 1, 4)), "Feb 4"); // !! intentionally differs from default implementation
});

it(`scaleZoned.tickFormat()(date) formats hour on minute zero`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 2, 11)), "11 AM");
  assert.strictEqual(f(date.utc(2011, 1, 2, 12)), "12 PM");
  assert.strictEqual(f(date.utc(2011, 1, 2, 13)), "1 PM");
});

it(`scaleZoned.tickFormat()(date) formats minute on second zero`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 2, 11, 59)), "11:59");
  assert.strictEqual(f(date.utc(2011, 1, 2, 12,  1)), "12:01");
  assert.strictEqual(f(date.utc(2011, 1, 2, 12,  2)), "12:02");
});

it(`scaleZoned.tickFormat()(date) otherwise, formats second`, () => {
  var f = zonedTime.scaleZoned("UTC", 7).tickFormat();
  assert.strictEqual(f(date.utc(2011, 1, 2, 12,  1,  9)), ":09");
  assert.strictEqual(f(date.utc(2011, 1, 2, 12,  1, 10)), ":10");
  assert.strictEqual(f(date.utc(2011, 1, 2, 12,  1, 11)), ":11");
});
