"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
var call = client_1.client.update();
call.write({ id: "1", companyId: "1", name: "Tools", category: "Purple" });
call.on("data", function (data) {
    console.log('Updating card for the first time...', data);
    if (data.status === "UPDATED") {
        console.log('Updating card for the second time...', data);
        call.write({ id: "1", companyId: "1", name: "Tools", category: "Brown" });
        call.end();
    }
});
