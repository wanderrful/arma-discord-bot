//*** Used as a reference for all mission events
export interface Mission {
    eventId: number;
    missionName: string;
    groups: Array<MissionGroup>;
}

export interface MissionGroup {
    groupName: string;
    slots: Array<MissionSlot>;
}

export interface MissionSlot {
    slotName: string;
    user: string; //unique id reference to the client (is it a number?)
}



//*** Mission-related command Argument structs
export interface ArgsManageMission {
    eventId: number;
    missionName: string;
}

export interface ArgsManageMissionSlot {
    eventId: number;
    groupName: string;
    slotName: string;
}