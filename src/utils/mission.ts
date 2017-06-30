//*** Used as a reference for all mission events
export interface Mission {
    eventId: number,
    data: MissionData,
    groups: Array<MissionGroup>
}

export interface MissionData {
    missionId: number,
    missionName: string
}

export interface MissionGroup {
    groupName: string,
    slots: Array<MissionSlot>
}

export interface MissionSlot {
    slotName: string,
    user: number //reference to the client (is it a number?)
}



//*** Mission-related command Argument structs
export interface ArgsCreateMission {
    eventId: number, 
    givenData: MissionData, 
    givenGroups: Array<MissionGroup>
}