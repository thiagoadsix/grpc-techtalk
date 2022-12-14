"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepFor = exports.sleepAsync = void 0;
var sleepAsync = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
exports.sleepAsync = sleepAsync;
var sleepFor = function (sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { }
};
exports.sleepFor = sleepFor;
