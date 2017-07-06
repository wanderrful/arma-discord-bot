"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
function HandleMessage(a_Message) {
    let BotReference = a_Message.client;
    let CommandPrefix = BotReference.CommandPrefix;
    let bIsCommand = a_Message.content.startsWith(CommandPrefix);
    let bIsDirectMessage = a_Message.channel instanceof Discord.DMChannel;
    let bIsAdmin = a_Message.member.roles.exists("name", "guy");
    if (bIsCommand && !bIsDirectMessage) {
        let GivenInput = a_Message.content.split(" ");
        let GivenCommand = {
            cmd: GivenInput.shift().substr(1).toLowerCase(),
            args: GivenInput
        };
        switch (GivenCommand.cmd) {
            case ("cm"): {
                if (bIsAdmin) {
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
                }
                break;
            }
            case ("dm"): {
                if (bIsAdmin) {
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
                }
                break;
            }
            case ("mas"): {
                if (bIsAdmin) {
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
                }
                break;
            }
            case ("mds"): {
                if (bIsAdmin) {
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
                }
                break;
            }
            case ("reserve"): {
                a_Message.channel.send("*** Command \'Reserve Slot\' called!  args: " + GivenCommand.args);
                let noErrors = BotReference.fn_reserveMissionSlot({
                    eventId: Number(GivenCommand.args[0]),
                    groupName: GivenCommand.args[1],
                    slotName: GivenCommand.args[2]
                }, a_Message.member.nickname);
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
            case ("list"): {
                let Parameter = BotReference.MissionList;
                if (!isNaN(Number(GivenCommand.args[0]))) {
                    let MissionIndex = BotReference.fn_utility_getMissionIndex(Number(GivenCommand.args[0]));
                    if (MissionIndex > -1) {
                        Parameter = BotReference.MissionList[MissionIndex];
                        a_Message.channel.send("```\n" +
                            BotReference.fn_utility_formatJSON(JSON.stringify(Parameter, null, 1)) +
                            "\n```");
                    }
                    else {
                        a_Message.channel.send("ERROR:  mission ID not found!");
                    }
                }
                else {
                    a_Message.channel.send("Invalid argument!  Syntax: ';list IDNUMBER'");
                }
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