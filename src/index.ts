import * as Discord from "discord.js";

import ArmaBot from "./arma_bot";



//*** Initialize the bot itself
let Bot = new ArmaBot();

//*** Login to Discord and begin running the bot
Bot.login(process.env.BOT_KEY);