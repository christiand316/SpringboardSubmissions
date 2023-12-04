"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var process_1 = require("process");
var axios_1 = require("axios");
var fileName = process_1.default.argv[2];
if (!fileName) {
    console.error("Please pass a filename");
    process_1.default.exit(1);
}
var fileRaw = fs.readFileSync(fileName, "utf-8");
if (!fileRaw) {
    console.error("Failed to find or load file ".concat(fileName));
    process_1.default.exit(1);
}
var urlList = fileRaw.split("\n");
var promises = [];
var timeoutDelay = 5000;
var failsafePromise = new Promise(function (_, reject) { return setTimeout(function () { return reject(new Error("Exceeded timeout")); }, timeoutDelay); });
var _loop_1 = function (url) {
    var promise = axios_1.default.get(url).then(function (response) { return [url, response.data]; }).catch(function () { return [url, "Request timed out"]; });
    promises.push(Promise.race([promise, failsafePromise]));
};
for (var _i = 0, urlList_1 = urlList; _i < urlList_1.length; _i++) {
    var url = urlList_1[_i];
    _loop_1(url);
}
Promise.allSettled(promises).then(function (results) {
    results.forEach(function (result) {
        if (result.status === "fulfilled") {
            var _a = result.value, url = _a[0], data = _a[1];
            var hostname = new URL(url).hostname;
            console.log("".concat(url, " was written to file output/").concat(hostname));
        }
        else {
            var _b = result.reason, url = _b[0], reason = _b[1];
            console.log("".concat(url, " failed due to ").concat(reason));
        }
    });
});
