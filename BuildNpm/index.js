"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = process.env.npm_package_config_port || 4005;
var runningMsg = "The server is running on port " + port;
// app.get("/", (req, res) => {
//   console.log("Server is successfully requested");
//   res.send(runningMsg);
// });
app.use(express_1.default.static(path_1.default.resolve("" + __dirname, "./")));
var server = app.listen(port, function () {
    console.log(runningMsg);
});
module.exports = server;
