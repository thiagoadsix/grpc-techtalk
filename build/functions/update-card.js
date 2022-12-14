"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
var sleep_1 = require("../utils/sleep");
var call = client_1.client.update();
var updateFirsCard = function () {
    var card = { id: "1", companyId: "1", name: "Tools", category: "Purple" };
    console.log("Updating card for the first time...", card);
    call.write(card);
    (0, sleep_1.sleepFor)(2500);
};
updateFirsCard();
call.on("data", function (data) {
    console.log("Card updated", data);
    var card = { id: "1", companyId: "1", name: "Tools", category: "Brown" };
    console.log("Updating card for the second time...", card);
    call.write(card);
    (0, sleep_1.sleepFor)(2500);
    console.log("Card updated", data);
});
call.on("end", function () {
    (0, sleep_1.sleepFor)(2500);
    console.log("\nTask ended on client.");
});
