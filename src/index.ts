import * as Discord from "discord.js";

import ArmaBot from "./arma_bot";
import BotKey from "./bot_key"; //purposefully gitignored:  this file only exports the login key code for the bot



//*** Initialize the bot itself
let Bot = new ArmaBot();



//*** Login to Discord and begin running the bot
Bot.login(BotKey);



//*** Node.js web server interface
import * as http from "http";

http.createServer( (req: any, res: any) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello world!\n");
}).listen(8081);

console.log("Server running on port 8081");