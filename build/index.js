"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arma_bot_1 = require("./arma_bot");
function initBot() {
    let Bot = new arma_bot_1.default();
    Bot.login(process.env.BOT_KEY);
}
exports.default = initBot;
initBot();
//# sourceMappingURL=index.js.map