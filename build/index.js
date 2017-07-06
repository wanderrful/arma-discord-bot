"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arma_bot_1 = require("./arma_bot");
const bot_key_1 = require("./bot_key");
let Bot = new arma_bot_1.default();
Bot.login(bot_key_1.default);
const http = require("http");
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello world!\n");
}).listen(8081);
console.log("Server running on port 8081");
//# sourceMappingURL=index.js.map