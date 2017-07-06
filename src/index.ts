//environment variables defined by the heroku app
import * as Discord from "discord.js";
import ArmaBot from "./arma_bot";



//*** Initialize the bot itself
let Bot = new ArmaBot();

//*** Login to Discord and begin running the bot
Bot.login(process.env.BOT_KEY);


/* TODO - incorporate the use of the Heroku Postgres database!
pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    //will need to translate the MissionList JSON object into a postgres-compatible format
});
*/