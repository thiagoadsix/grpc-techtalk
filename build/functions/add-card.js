"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
client_1.client.add({
    id: "4",
    companyId: "3",
    name: "Marketing",
    category: "Orange",
}, function (error, data) {
    if (error) {
        console.error({ error: error });
    }
    else {
        console.log(JSON.stringify(data));
    }
});
