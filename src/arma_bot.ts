import * as Discord from "discord.js";
import * as pg from "pg";  // Database stuff

import * as MissionModule from "./utils/mission";
import HandleMessage from "./utils/message_handler";



export default class ArmaBot extends Discord.Client {  

  public CommandPrefix: string = ";";
  public MissionList: Array<MissionModule.Mission> = []; //TODO: assign initial value based on saved database or JSON file contents?



  constructor() { 
    super({
      messageCacheLifetime: 600
    }); 

    //*** Register event handlers
    this.on('error', console.error);
    this.on('warn', console.warn);
    this.on('debug', console.log);
    this.on('disconnect', () => {
      /*
       * TODO:
       * - save the MissionList to a database or a json file or something 
       * so that we can read from it again upon the next startup and have persistent data!
       */
      console.warn('*** Disconnected!'); 
    });
    this.on('reconnecting', () => { console.warn('*** Reconnecting...'); });

    this.on('ready', () => {
      /*
       * TODO:
       * - read from the database or storage file
       * - parse that database or storage file into the MissionList format we need!
       */ 
      console.log(`Client ready; logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`);
    });

    this.on("message", (message) => {
      HandleMessage(message);
    });
  }



  //*** Adds the new mission to the sv_MissionList array and returns a reference to the new mission
  fn_createMission( args: MissionModule.ArgsManageMission ) : boolean {
    let NewMission: MissionModule.Mission = {
        eventId: args.eventId,
        missionName: args.missionName,
        groups: []
    };
    //TODO: verify that the current mission data does not already exist in the bot's MissionList!
    this.MissionList.push(NewMission);
    return true;
  }

  //*** Deletes a mission from the cache based on the given Mission struct
  fn_deleteMission( args: MissionModule.ArgsManageMission ): boolean {
    let MissionIndex: number = this.fn_utility_getMissionIndex( args.eventId );
    if (MissionIndex > -1) { //mission found in the MissionList
      this.MissionList.splice(MissionIndex, 1);
      return true;
    }
    //if no mission was found, return false
    return false;
  }

  //*** Adds a slot to the given group for the given mission
  fn_addMissionSlot( args: MissionModule.ArgsManageMissionSlot ): boolean {
    let MissionIndex: number = this.fn_utility_getMissionIndex( args.eventId );
    if (MissionIndex > -1) {
      //mission has been found, so we need to figure out if the given group aleady exists first
      let bIsGroupListEmpty: boolean = this.MissionList[MissionIndex].groups.length == 0;
      let GroupIndex: number = this.fn_utility_getGroupIndex( this.MissionList[MissionIndex].groups, args.groupName );
      let bDoesGroupExist: boolean = !bIsGroupListEmpty && (GroupIndex > -1);
      if (bDoesGroupExist) { 
        //  (if group exists) add the given slot to the group's slot array
        this.MissionList[MissionIndex].groups[GroupIndex].slots.push({
          slotName: args.slotName,
          user: ""
        });
        return true;
      }
      else {
        //  (if group does not exist) create the group and then add the given slot to the new group's slot array
        this.MissionList[MissionIndex].groups.push({
          groupName: args.groupName,
          slots: [
            {
              slotName: args.slotName,
              user: ""
            }
          ]
        });
        return true;
      }
    }
    //if the given mission was not found, return false.
    return false;
  }

  //*** Removes a slot from the given group for the given mission
  fn_removeMissionSlot( args: MissionModule.ArgsManageMissionSlot ): boolean {
    let MissionIndex: number = this.fn_utility_getMissionIndex( args.eventId );
    if (MissionIndex > -1) {
      //mission has been found!  now we verify that the given group exists.
      let bIsGroupListEmpty: boolean = this.MissionList[MissionIndex].groups.length == 0;
      let GroupIndex: number = this.fn_utility_getGroupIndex( this.MissionList[MissionIndex].groups, args.groupName );
      let bDoesGroupExist: boolean = !bIsGroupListEmpty && (GroupIndex > -1);
      if (bDoesGroupExist) {
        //group has been found!  now we verify that the given slot exists.
        let SlotIndex: number = this.fn_utility_getSlotIndex( this.MissionList[MissionIndex].groups[GroupIndex].slots, args.slotName );
        if (SlotIndex > -1) {
          //slot has been found!  finally, we can remove the slot.
          this.MissionList[MissionIndex].groups[GroupIndex].slots.splice(SlotIndex, 1);
          return true;
        }
      }
    }
    //if at any point we fail to locate any of the given parameters, return false.
    return false;
  }

  

  //*** Reserves the given slot for the user!
  fn_reserveMissionSlot( args: MissionModule.ArgsManageMissionSlot, a_UserName: string ): boolean {
    let MissionIndex: number = this.fn_utility_getMissionIndex( args.eventId );
    if (MissionIndex > -1) {
      //mission has been found!  now we verify that the given group exists.
      let bIsGroupListEmpty: boolean = this.MissionList[MissionIndex].groups.length == 0;
      let GroupIndex: number = this.fn_utility_getGroupIndex( this.MissionList[MissionIndex].groups, args.groupName );
      let bDoesGroupExist: boolean = !bIsGroupListEmpty && (GroupIndex > -1);
      if (bDoesGroupExist) {
        //group has been found!  now we verify that the given slot exists.
        let SlotIndex: number = this.fn_utility_getSlotIndex( this.MissionList[MissionIndex].groups[GroupIndex].slots, args.slotName );
        if (SlotIndex > -1) {
          //slot has been found!  now we verify that the slot isn't already reserved by someone else.
          if (this.MissionList[MissionIndex].groups[GroupIndex].slots[SlotIndex].user === "") {
            //the given slot does not already have a reservation!  finally, we can update the entry.
            this.MissionList[MissionIndex].groups[GroupIndex].slots[SlotIndex].user = a_UserName;
            return true;
          }
        }
      }
    }
    return false;
  }

  //*** Cancels a reserved mission slot for the user!
  fn_cancelReservation( a_eventId: number, a_NickName: string) {
    let MissionIndex: number = this.fn_utility_getMissionIndex( a_eventId );
    if (MissionIndex > -1) {
      //mission has been found!  now we verify that the given group exists.
      let bIsGroupListEmpty: boolean = this.MissionList[MissionIndex].groups.length == 0;
      for (let grp of this.MissionList[MissionIndex].groups) {
        for (let slot of grp.slots) {
          if (slot.user === a_NickName) {
            //TODO: instead of checking for the raw username string, I should modify the "user" field to be a struct of both username AND unique discord user id.
            slot.user = "";
            return true;
          }
        }
      }
    }
    return false;
  }



  //*** Utility functions
  fn_utility_getMissionIndex( a_eventId: number ): number {
    let indexOfMission: number = this.MissionList.findIndex( (element: MissionModule.Mission) => {
      return element.eventId === a_eventId;
    });
    return indexOfMission;
  }
  fn_utility_getGroupIndex( a_GroupList: Array<MissionModule.MissionGroup>, a_SearchTerm: string ): number {
    let indexOfGroup: number = a_GroupList.findIndex( (element: MissionModule.MissionGroup) => {
      return element.groupName.toLowerCase() === a_SearchTerm.toLowerCase();
    });
    return indexOfGroup;
  }
  fn_utility_getSlotIndex( a_SlotList: Array<MissionModule.MissionSlot>, a_SearchTerm: string ): number {
    let indexOfSlot: number = a_SlotList.findIndex( (element: MissionModule.MissionSlot) => {
      return element.slotName.toLowerCase() === a_SearchTerm.toLowerCase();
    });
    return indexOfSlot;
  }
  fn_utility_formatJSON( a_JSONData: string ): string {
    return a_JSONData.replace(/[\[\]{},\"]/g, "");
  }



  //*** Database functions
  fn_database_save() {
    throw "Not yet implemented!";
  }
  fn_database_update() {
    throw "Not yet implemented!";
  }

};
