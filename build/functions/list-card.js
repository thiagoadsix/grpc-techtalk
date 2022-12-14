"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
var stream = client_1.client.list();
var count = 0;
stream.on('data', function (data) {
    console.log("".concat(++count, " - ").concat(JSON.stringify(data)));
});
stream.on('end', function () { return console.log('\nTask ended.'); });
