"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: consider migrating this to arma_bot.ts as one giant monster file where everything is self-contained in the class definition?
const Discord = require("discord.js");
function HandleMessage(a_Message) {
    let BotReference = a_Message.client;
    let CommandPrefix = BotReference.CommandPrefix;
    let bIsCommand = a_Message.content.startsWith(CommandPrefix);
    let bIsDirectMessage = a_Message.channel instanceof Discord.DMChannel;
    if (bIsCommand && !bIsDirectMessage) {
        //parse the message for commands
        let GivenInput = a_Message.content.split(" ");
        let GivenCommand = {
            cmd: GivenInput.shift().substr(1).toLowerCase(),
            args: GivenInput
        };
        //*** COMMAND PARSING AND HANDLING
        switch (GivenCommand.cmd) {
            //case (CommandPrefix + ""): { break; }
            //*** MISSION COMMANDS
            case ("cm"): {
                a_Message.channel.send("Command \'Create Mission\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_createMission({
                    eventId: Number(GivenCommand.args[0]),
                    missionName: GivenCommand.args[1]
                });
                if (noErrors) {
                    a_Message.channel.send("Mission creation successful!");
                }
                else {
                    a_Message.channel.send("ERROR: mission creation failed somehow!");
                }
                break;
            }
            case ("dm"): {
                a_Message.channel.send("Command \'Delete Mission\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_deleteMission({
                    eventId: Number(GivenCommand.args[0]),
                    missionName: GivenCommand.args[1]
                });
                if (noErrors) {
                    a_Message.channel.send("Mission deletion was successful!");
                }
                else {
                    a_Message.channel.send("ERROR: given mission was not found in the MissionList!");
                }
                break;
            }
            case ("mas"): {
                a_Message.channel.send("Command \'Add Slot\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_addMissionSlot({
                    eventId: Number(GivenCommand.args[0]),
                    groupName: GivenCommand.args[1],
                    slotName: GivenCommand.args[2]
                });
                if (noErrors) {
                    a_Message.channel.send("Slot addition was successful!");
                }
                else {
                    a_Message.channel.send("Slot addition failed!  Was the eventId valid?");
                }
                break;
            }
            case ("mds"): {
                a_Message.channel.send("Command \'Delete Slot\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_removeMissionSlot({
                    eventId: Number(GivenCommand.args[0]),
                    groupName: GivenCommand.args[1],
                    slotName: GivenCommand.args[2]
                });
                if (noErrors) {
                    a_Message.channel.send("Slot deletion was successful!");
                }
                else {
                    a_Message.channel.send("Slot addition failed!  Were the arguments all valid?");
                }
                break;
            }
            //*** RESERVATION COMMANDS
            case ("reserve"): {
                a_Message.channel.send("*** Command \'Reserve Slot\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_reserveMissionSlot({
                    eventId: Number(GivenCommand.args[0]),
                    groupName: GivenCommand.args[1],
                    slotName: GivenCommand.args[2]
                }, a_Message.author.username);
                if (noErrors) {
                    a_Message.channel.send("Slot has been reserved successfully!");
                }
                else {
                    a_Message.channel.send("ERROR: given slot was not found or it has already been reserved!");
                }
                break;
            }
            case ("cancel"): {
                a_Message.channel.send("*** Command \'Cancel Slot Reservation\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_cancelReservation(Number(GivenCommand.args[0]), a_Message.author);
                if (noErrors) {
                    a_Message.channel.send("Slot reservation has been cancelled successfully!");
                }
                else {
                    a_Message.channel.send("ERROR: your username was not found in the roster for the given event's id number!");
                }
                break;
            }
            case ("check"): {
                a_Message.channel.send("*** Command \'Check Slot Reservation\' called!  args: " + GivenCommand.args);
                break;
            }
            //*** DEBUG COMMANDS
            case ("list"): {
                //TODO: if an event id is given as an argument, only show that mission's JSON data!
                a_Message.channel.send("MissionList.length: " + BotReference.MissionList.length + "\n" +
                    "MissionList=" + "\n" +
                    "```json\n" +
                    JSON.stringify(BotReference.MissionList, null, 2) +
                    "\n```");
                break;
            }
            case ("shutdown"): {
                a_Message.channel.send("Shutdown command acknowledged.  Shutting down.");
                BotReference.destroy();
            }
            default: {
                a_Message.channel.send("ERROR! invalid command: " + JSON.stringify(GivenCommand, null, 2));
                break;
            }
        }
    }
}
exports.default = HandleMessage;
//# sourceMappingURL=message_handler.js.map