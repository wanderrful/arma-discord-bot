const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const Path = require('path');



//*** Initialize the bot itself
const Bot = new Commando.Client({
  commandPrefix: "~",
  disableEveryone: true
});



//*** Register event handlers
Bot.on('error', console.error);
Bot.on('warn', console.warn);
Bot.on('debug', console.log);
Bot.on('ready', () => {
  console.log(`Client ready; logged in as ${Bot.user.username}#${Bot.user.discriminator} (${Bot.user.id})`);
});
Bot.on('disconnect', () => { console.warn('*** Disconnected!'); });
Bot.on('reconnecting', () => { console.warn('*** Reconnecting...'); });
Bot.on('commandError', (cmd, err) => {
	if(err instanceof Commando.FriendlyError) return;
	console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
});
Bot.on('commandBlocked', (msg, reason) => {
	console.log(oneLine`
	   Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
	    blocked; ${reason}
	`);
});



//*** Register the commands avilable to the users
Bot.registry.registerGroups([
  ["grp_reservation", "Reserve a slot or cancel your reservation for the upcoming event!"],
  ["grp_cancel_reservation", "Cancel your standing reservation for the upcoming event!"],
  ["grp_get_event_info", "Display information about the upcoming event and its current slot status!"],
  ["grp_am_i_reserved", "Check whether you already have a standing reservation for the upcoming event!"]
]);
Bot.registry.registerDefaults();
Bot.registry.registerCommandsIn( Path.join(__dirname, "commands") );



//*** Login to Discord and begin running the bot
Bot.login("Mjk2OTMzMTUzMDE5Mzk2MDk3.C75hLg.CtRd87FwV8tZZ8Jytu5T5VtpPAg");



//*** Stuff that I'll probably export to other files and folders
let sv_CurrentMissionRoster = {
  //example mission roster
  "Command": {
    "Commander": "",
    "Command Medic": "",
    "Command JTAC": ""
  },
  "Alpha": {
    "Team Leader": "",
    "Combat Medic": "",
    "Grenadier": "",
    "Rifleman": "",
    "Rifleman": ""
  },
  "Bravo": {
    "Team Leader": "",
    "Combat Medic": "",
    "LAT Rifleman": "",
    "Rifleman": "",
    "Rifleman": ""
  },
  "Support": {
    "Transport Pilot": "",
    "Transport Pilot": "",
    "CAS Pilot": "",
    "CAS Pilot": ""
  }
};
