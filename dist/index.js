"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var config = require('./config');
app.get('/', function (req, res) {
    res.send('Hello im Node.js & TypeScript starter!');
});
app.listen(config.PORT, function () {
    console.log("Backend listening on " + config.PORT + " port!");
});
