"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const message_handler_1 = require("./utils/message_handler");
class ArmaBot extends Discord.Client {
    constructor() {
        super({
            messageCacheLifetime: 600
        });
        this.CommandPrefix = ";";
        this.MissionList = [];
        this.on('error', console.error);
        this.on('warn', console.warn);
        this.on('debug', console.log);
        this.on('disconnect', () => {
            console.warn('*** Disconnected!');
        });
        this.on('reconnecting', () => { console.warn('*** Reconnecting...'); });
        this.on('ready', () => {
            console.log(`Client ready; logged in as ${this.user.username}#${this.user.discriminator} (${this.user.id})`);
        });
        this.on("message", (message) => {
            message_handler_1.default(message);
        });
    }
    fn_createMission(args) {
        let NewMission = {
            eventId: args.eventId,
            missionName: args.missionName,
            groups: []
        };
        this.MissionList.push(NewMission);
        return true;
    }
    fn_deleteMission(args) {
        let MissionIndex = this.fn_utility_getMissionIndex(args.eventId);
        if (MissionIndex > -1) {
            this.MissionList.splice(MissionIndex, 1);
            return true;
        }
        return false;
    }
    fn_addMissionSlot(args) {
        let MissionIndex = this.fn_utility_getMissionIndex(args.eventId);
        if (MissionIndex > -1) {
            let bIsGroupListEmpty = this.MissionList[MissionIndex].groups.length == 0;
            let GroupIndex = this.fn_utility_getGroupIndex(this.MissionList[MissionIndex].groups, args.groupName);
            let bDoesGroupExist = !bIsGroupListEmpty && (GroupIndex > -1);
            if (bDoesGroupExist) {
                this.MissionList[MissionIndex].groups[GroupIndex].slots.push({
                    slotName: args.slotName,
                    user: ""
                });
                return true;
            }
            else {
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
        return false;
    }
    fn_removeMissionSlot(args) {
        let MissionIndex = this.fn_utility_getMissionIndex(args.eventId);
        if (MissionIndex > -1) {
            let bIsGroupListEmpty = this.MissionList[MissionIndex].groups.length == 0;
            let GroupIndex = this.fn_utility_getGroupIndex(this.MissionList[MissionIndex].groups, args.groupName);
            let bDoesGroupExist = !bIsGroupListEmpty && (GroupIndex > -1);
            if (bDoesGroupExist) {
                let SlotIndex = this.fn_utility_getSlotIndex(this.MissionList[MissionIndex].groups[GroupIndex].slots, args.slotName);
                if (SlotIndex > -1) {
                    this.MissionList[MissionIndex].groups[GroupIndex].slots.splice(SlotIndex, 1);
                    return true;
                }
            }
        }
        return false;
    }
    fn_reserveMissionSlot(args, a_UserName) {
        let MissionIndex = this.fn_utility_getMissionIndex(args.eventId);
        if (MissionIndex > -1) {
            let bIsGroupListEmpty = this.MissionList[MissionIndex].groups.length == 0;
            let GroupIndex = this.fn_utility_getGroupIndex(this.MissionList[MissionIndex].groups, args.groupName);
            let bDoesGroupExist = !bIsGroupListEmpty && (GroupIndex > -1);
            if (bDoesGroupExist) {
                let SlotIndex = this.fn_utility_getSlotIndex(this.MissionList[MissionIndex].groups[GroupIndex].slots, args.slotName);
                if (SlotIndex > -1) {
                    if (this.MissionList[MissionIndex].groups[GroupIndex].slots[SlotIndex].user === "") {
                        this.MissionList[MissionIndex].groups[GroupIndex].slots[SlotIndex].user = a_UserName;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    fn_cancelReservation(a_eventId, a_User) {
        let MissionIndex = this.fn_utility_getMissionIndex(a_eventId);
        if (MissionIndex > -1) {
            let bIsGroupListEmpty = this.MissionList[MissionIndex].groups.length == 0;
            for (let grp of this.MissionList[MissionIndex].groups) {
                for (let slot of grp.slots) {
                    if (slot.user === a_User.username) {
                        slot.user = "";
                        return true;
                    }
                }
            }
        }
        return false;
    }
    fn_utility_getMissionIndex(a_eventId) {
        let indexOfMission = this.MissionList.findIndex((element) => {
            return element.eventId === a_eventId;
        });
        return indexOfMission;
    }
    fn_utility_getGroupIndex(a_GroupList, a_SearchTerm) {
        let indexOfGroup = a_GroupList.findIndex((element) => {
            return element.groupName.toLowerCase() === a_SearchTerm.toLowerCase();
        });
        return indexOfGroup;
    }
    fn_utility_getSlotIndex(a_SlotList, a_SearchTerm) {
        let indexOfSlot = a_SlotList.findIndex((element) => {
            return element.slotName.toLowerCase() === a_SearchTerm.toLowerCase();
        });
        return indexOfSlot;
    }
    fn_utility_formatJSON(a_JSONData) {
        return a_JSONData.replace(/[\[\]{},\"]/g, "");
    }
}
exports.default = ArmaBot;
;
//# sourceMappingURL=arma_bot.js.map