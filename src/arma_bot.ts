import * as Discord from "discord.js";

import * as MissionModule from "./utils/mission";
import HandleMessage from "./utils/message_handler";



export default class ArmaBot extends Discord.Client {  

  public static CommandPrefix: string = "~";
  public MissionList: Array<MissionModule.Mission>; //TODO: assign initial value based on saved database or JSON file contents?



  constructor() { 
    super({
      messageCacheLifetime: 600
    }); 

    //*** Register event handlers
    this.on('error', console.error);
    this.on('warn', console.warn);
    this.on('debug', console.log);
    this.on('disconnect', () => { console.warn('*** Disconnected!'); });
    this.on('reconnecting', () => { console.warn('*** Reconnecting...'); });

    this.on('ready', () => {
      console.log(`Client ready; logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`);
    });

    this.on("message", (message) => {
      HandleMessage(message);
    });
  }



  //*** Adds the new mission to the sv_MissionList array and returns a reference to the new mission
  fn_createMission( args: MissionModule.ArgsCreateMission ) : MissionModule.Mission {
    let NewMission: MissionModule.Mission = {
        eventId: args.eventId,
        data: args.givenData,
        groups: []
    };
    this.MissionList.concat(NewMission);
    return NewMission;
  }

  //*** Deletes a mission from the cache based on the given Mission struct
  fn_deleteMission( args: MissionModule.ArgsDeleteMission ): void {
    //search for a Mission struct contained this.MissionList matching the given arguments
    //if one is found: remove it from this.MissionList and report the details
    //if none is found: report the failure to locate a mission matching the given parameters
  }

  fn_createMissionSlot(  ): void {}
};
