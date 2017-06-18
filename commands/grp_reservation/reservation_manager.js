const Commando = require("discord.js-commando");
const MissionDatabase = require("mission-database");



class CReserveCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "reserve",
      memberName: "reserve",
      aliases: ["r", "res", "rsv", "rsrv", "resreve", "rsvp"],
      description: "Reserve a slot or cancel your reservation for the upcoming event!",
      group: "grp_reservation",
      examples: ["reserve A1 Marksman", "r B11 TeamLeader"],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: "GroupName",
          prompt: "In which group do you want to reserve a slot?",
          type: "string",
          validate: text => {
            //we want to check that the given GroupName is valid
            return true;
          }
        },
        {
          key: "SlotName",
          prompt: "What is the name of the slot you want to reserve?",
          type: "string",
          validate: text => {
            //we want to check that the given SlotName is validate
            return true;
          }
        }
      ]
    });
  }



  //*** Entry point for what happens when this command is called
  async run(msg, args) {
    const { GroupName } = args;
    const { SlotName } = args;

    if ( !fn_bHasReservation(msg.author) ) {
      if ( !fn_bSlotTaken(GroupName, SlotName) ) {
        fn_ReservePlayerSlot(GroupName, SlotName);
      }
    }

    //delete the original message that called this command, then respond
    msg.reply("*** CReserveCommand::run() called");
  }
}



//*** Utility functions
let fn_bHasReservation = ( a_Client ) => {
  //MissionDatabase.get("");
  return true;
};
let fn_bSlotTaken = ( a_GivenGroup, a_GivenSlot ) => {
  //return whether the given table's row element isn't an empty string
  return false;
};
let fn_ReservePlayerSlot = ( a_GivenGroup, a_GivenSlot ) => {
  //write the given Discord user's name to the given row element
};



module.exports = CReserveCommand;
