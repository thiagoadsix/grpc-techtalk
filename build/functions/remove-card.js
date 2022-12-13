"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
var ids = [1, 3];
var call = client_1.client.remove(function (err, response) {
    if (err)
        throw err;
    console.log("client -> response", JSON.stringify(response));
});
ids.forEach(function (id) {
    call.write({ id: id });
});
call.end();
