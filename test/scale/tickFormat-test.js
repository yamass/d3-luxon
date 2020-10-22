var tape = require("tape"),
    zonedTime = require("../../"),
    date = require("../date-util");

tape("zonedTime().tickFormat will return localized strings", function(test) {
    var zone = "Europe/Berlin";
    let x = zonedTime.scaleZoned(zone, 7, "de-DE");
    let tickFormat = x.tickFormat();

    test.equal(tickFormat(date.zoned(zone, 2019, 11, 31, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 0)), "2020");
    test.equal(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 0, 30, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 0)), "Februar");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 12, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 0)), "13. Feb.");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 14, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 0)), "15:00");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 34, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 0)), "18:35");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 23, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 0)), ":24");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 1)), ".001");

    test.end();
});

tape("zonedTime().tickFormat will return localized strings", function(test) {
    var zone = "America/Los_Angeles";
    var x = zonedTime.scaleZoned(zone, 7, "en-US");
    let tickFormat = x.tickFormat();

    test.equal(tickFormat(date.zoned(zone, 2019, 11, 31, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 0)), "2020");
    test.equal(tickFormat(date.zoned(zone, 2020, 0, 1, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 0, 30, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 0)), "February");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 1, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 12, 23, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 0)), "Feb 13");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 13, 0, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 14, 59, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 0)), "3 PM");
    test.equal(tickFormat(date.zoned(zone, 2020, 1, 15, 15, 0, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 34, 59, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 0)), "6:35");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 35, 0, 1)), ".001");

    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 23, 999)), ".999");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 0)), ":24");
    test.equal(tickFormat(date.zoned(zone, 2020, 2, 15, 18, 41, 24, 1)), ".001");

    test.end();
});

