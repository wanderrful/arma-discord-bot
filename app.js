//fulfill Heroku's requirement for a port binding by creating a simple dummy website
var http = require("http");
var express = require("express");

let app = express();

app.set("port", process.env.PORT || 8081);

app.get("/", (req, res) => {
    res.write("Hello world!\n");
    res.end();
});

app.listen( app.get("port"), () => {
    console.log( "*** LISTENING" );
});



//start the bot
let start_bot = require("./build/index");
start_bot.default();