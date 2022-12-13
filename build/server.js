"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_js_1 = require("@grpc/grpc-js");
var proto_loader_1 = require("@grpc/proto-loader");
var path_1 = require("path");
var sleep_1 = require("./utils/sleep");
var packageDefinition = (0, proto_loader_1.loadSync)((0, path_1.join)(__dirname, "../src/protos/card.proto"));
var proto = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
var cards = [
    {
        id: "1",
        companyId: "1",
        name: "Energy",
        category: "Red",
    },
    {
        id: "2",
        companyId: "2",
        name: "Food",
        category: "Blue",
    },
    {
        id: "3",
        companyId: "2",
        name: "Technology",
        category: "Pink",
    },
];
var card;
var server = new grpc_js_1.Server();
function list(call) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, cards_1, card_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Client calling LIST from the server...");
                    _i = 0, cards_1 = cards;
                    _a.label = 1;
                case 1:
                    if (!(_i < cards_1.length)) return [3 /*break*/, 4];
                    card_1 = cards_1[_i];
                    call.write(card_1);
                    return [4 /*yield*/, (0, sleep_1.sleep)(2500)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Call ended on server. \n");
                    call.end();
                    return [2 /*return*/];
            }
        });
    });
}
function add(_a, callback) {
    var request = _a.request;
    console.log("Client calling ADD from the server...");
    cards.push(request);
    callback(null, {});
}
function remove(call, callback) {
    console.log("Client calling REMOVE from the server...");
    call.on("data", function (data) {
        console.log("server -> removing card: ", JSON.stringify(data));
        cards.splice(cards.findIndex(function (card) { return card.id === data.id; }), 1);
        console.log("server -> quantity cards: ", JSON.stringify(cards.length));
    });
    call.on("end", function () { return callback(null, { removed: true }); });
}
function update(call) {
    console.log("Client calling UPDATE from the server...");
    call.on("data", function (data) {
        console.log("server -> data", JSON.stringify(data));
        var cardIndex = cards.findIndex(function (card) { return card.id === data.id; });
        card = Object.assign({}, cards[cardIndex], __assign({}, data));
        cards[cardIndex] = card;
        console.log(JSON.stringify(card));
    });
    call.write({ status: "UPDATED" });
    call.end();
}
server.addService(proto.CardService.service, {
    list: list,
    add: add,
    remove: remove,
    update: update,
});
server.bindAsync("127.0.0.1:50051", grpc_js_1.ServerCredentials.createInsecure(), function () {
    server.start();
    console.log("Server running at http://127.0.0.1:50051 \n");
});
