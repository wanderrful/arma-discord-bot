"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arma_bot_1 = require("./arma_bot");
const bot_key_1 = require("./bot_key");
function initBot() {
    let Bot = new arma_bot_1.default();
    Bot.login(bot_key_1.default);
}
exports.default = initBot;
initBot();
//# sourceMappingURL=index.js.map