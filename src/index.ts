import * as Discord from "discord.js";

import ArmaBot from "./arma_bot";
//import BotKey from "./bot_key"; //purposefully gitignored:  backup in case environment variables aren't configured properly



export default function initBot() {
    //*** Initialize the bot itself
    let Bot = new ArmaBot();

    //*** Login to Discord and begin running the bot
    Bot.login(process.env.BOT_KEY);
}

initBot();