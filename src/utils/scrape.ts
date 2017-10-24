/* This file is meant to be run by a worker via one of Heroku's Dyno things.

 * The purpose of this file is to monitor the Steam group's player counts
 * so that I can use it to figure out when most people are online. That
 * way, I can know when the best times to host group events are!
 * 
 */
import * as scrapy from "node-scrapy";  // to get the data
import * as pg from "pg";               // to record the data



export interface Config {
    url: string,
    model: any
};



// Scrape function to get data.
function fn_getGroupData(config: Config): void {
    scrapy.scrape(config.url, config.model, (err,data) => {
        if (err) return console.error(err);
        
        console.log({
            timestamp: fn_getTimeStamp(),
            ...data
        });
    });
}

// Returns an object timestamp.  Modified from a Gist I found online and convered to TypeScript by me.
function fn_getTimeStamp(): Object {
    let now: Date = new Date();
    let date: Array<String> = [ String(now.getMonth() + 1), String(now.getDate()), String(now.getFullYear()) ];
    let time: Array<String> = [ String(now.getHours()), String(now.getMinutes())];

    for (let i of time) {  
        if ( Number(i) < 10 ) {
          i = "0" + i;
        }
    }
    // Return the formatted string
    return { 
        date: date.join("/"),
        time: time.join(":")
    };
}



// PostgreSQL functions
function fn_connectToPG(): pg.Client {
    const client = new pg.Client();

    client.connect((err) => {
        if (err) {
            console.error("*** DB CONNECTION ERROR: ", err.stack);
        } else {
            console.log("*** DB CONNECTION SUCCESSFUL!");
        }
    });
    client.on("error", (err) => {
        console.error("*** DB ERROR: ", err.stack);
    });

    return client;
}

function fn_query(client: pg.Client, query: Object, ) {
    client.query((err) => {
        if (err) {
            console.error("*** DB ERROR: ", err.stack);
        } else {
            console.log();
        }
    });
}



// Main entry point function
export function fn_run(): void {
    // Configure the data object for scraping
    let config: Config = {
        url: "http://steamcommunity.com/groups/fuckfuckgames",
        model: { 
            count: ".content .membercounts .membercount.members .count",
            ingame: ".content .membercounts .membercount.ingame .count",
            online: ".content .membercounts .membercount.online .count"
        }
    };

    // Connect to the Database
    const client = fn_connectToPG();

    // Finally, begin the looping scrape for data
    setInterval( () => {
        fn_getGroupData(config);
    }, 30 * 60 * 1000);
}



