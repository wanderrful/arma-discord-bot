//*** Used as a reference for all mission events
export let MissionList: Array<Mission>;

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
    slots: Array<MissionSlot>
}

export interface MissionSlot {
    slotName: string,
    user: number //reference to the client (is it a number?)
}



//*** Adds the new mission to the sv_MissionList array and returns a reference to the new mission
export function createMission( a_EventId: number, a_GivenData: MissionData, a_GivenGroups: Array<MissionGroup> ) : Mission {
    let NewMission: Mission = {
        eventId: a_EventId,
        data: a_GivenData,
        groups: a_GivenGroups
    };
    MissionList.concat(NewMission);
    return NewMission;
}



//*** Deletes a mission from the cache based on the given Mission struct
export function deleteMission( a_Mission: Mission ): void {}



export function createMissionSlot(  ): void {}