import Discord = require("discord.js");
import * as Commands from "./command";



let CommandPrefix: string = "~";



export default function HandleMessage (a_Message: Discord.Message): void {

    let bIsCommand: boolean = a_Message.content.startsWith(CommandPrefix);
    let bIsDirectMessage: boolean = a_Message.channel instanceof Discord.DMChannel;

    if (bIsCommand && !bIsDirectMessage) {
        //parse the message for commands
        let GivenInput = a_Message.content.split(" ");

        let GivenCommand: Commands.Command = {
            cmd: GivenInput.shift().substr(1),
            args: GivenInput.splice(1)
        };

        //*** COMMAND PARSING AND HANDLING
        switch (GivenCommand.cmd) {
            //case (CommandPrefix + ""): { break; }

            //*** MISSION COMMANDS
            case ("cm"): { //create mission
                a_Message.channel.sendMessage( "*** Command \'Create Mission\' called!  args: " + GivenCommand.args );
                break;
            }

            case ("md"): { //delete mission
                a_Message.channel.sendMessage( "*** Command \'Delete Mission\' called!  args: " + GivenCommand.args );
                break;
            }

            case ("as"): { //add slot
                a_Message.channel.sendMessage( "*** Command \'Add Slot\' called!  args: " + GivenCommand.args );
                break;
            }

            case ("ds"): { //delete slot
                a_Message.channel.sendMessage( "*** Command \'Delete Slot\' called!  args: " + GivenCommand.args );
                break;
            }



            //*** RESERVATION COMMANDS
            case ("reserve"): { //reserve slot
                a_Message.channel.sendMessage( "*** Command \'Reserve Slot\' called!  args: " + GivenCommand.args );
                break;
            }

            case ("cancel"): { //cancel reservation
                a_Message.channel.sendMessage( "*** Command \'Cancel Slot Reservation\' called!  args: " + GivenCommand.args );
                break;
            }

            case ("check"): { //check reservation
                a_Message.channel.sendMessage( "*** Command \'Check Slot Reservation\' called!  args: " + GivenCommand.args );
                break;
            }
            


            default: { //error case (invalid command)
                a_Message.reply("ERROR: invalid command!");
                break;
            }
        }
    }
}