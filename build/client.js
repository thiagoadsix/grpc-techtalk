"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var grpc_js_1 = require("@grpc/grpc-js");
var proto_loader_1 = require("@grpc/proto-loader");
var path_1 = require("path");
var packageDefinition = (0, proto_loader_1.loadSync)((0, path_1.join)(__dirname, "../src/protos/card.proto"));
var proto = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
exports.client = new proto.CardService("localhost:50051", grpc_js_1.credentials.createInsecure());
