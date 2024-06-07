import assert from "assert";
import * as zonedTime from "../../dist/index.js";
import * as date from "../date-util.js";

it("zonedTime().tickFormat will return localized strings", () => {
    var zone = "Europe/Berlin";
    let x = zonedTime.scaleZoned(zone, 7, "de-DE");
    let tickFormat = x.tickFormat();

    assert.strictEqual(tickFormat(date.zoned(zone, 2019, 11, 31, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 0)), "2020");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 30, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 0)), "Februar");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 12, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 0)), "13. Feb.");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 14, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 0)), "15:00");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 34, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 0)), "18:35");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 23, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 0)), ":24");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 1)), ".001");

  });

it("zonedTime().tickFormat will return localized strings", () => {
    var zone = "America/Los_Angeles";
    var x = zonedTime.scaleZoned(zone, 7, "en-US");
    let tickFormat = x.tickFormat();

    assert.strictEqual(tickFormat(date.zoned(zone, 2019, 11, 31, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 0)), "2020");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 0, 30, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 0)), "February");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 12, 23, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 0)), "Feb 13");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 14, 59, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 0)), "3 PM");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 34, 59, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 0)), "6:35");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 1)), ".001");

    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 23, 999)), ".999");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 0)), ":24");
    assert.strictEqual(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 1)), ".001");

  });

