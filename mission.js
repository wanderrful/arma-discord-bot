const MissionDatabase = require("mission-database");



//*** This is meant to be a utility class of static database functions!
class Mission {
  constructor() {}

  //*** Create a new mission
  static fn_CreateMission( a_MissionName ) {
    command = "CREATE TABLE IF NOT EXISTS " +  a_MissionName " ( " +
    "GroupName CHAR(40), " +
    "SlotName CHAR(40), " +
    "UserName CHAR(40) " +
    ");";
    MissionDatabase.run(command);
  }

  //*** Add an empty slot with the given name to the given Group
  static fn_AddSlot( a_MissionName, a_GivenGroup, a_SlotName ) {
    command = "INSERT INTO " + a_MissionName + " (GroupName, SlotName, UserName) VALUES ( " +
    " 'Alpha', 'Team Leader', ''" +
    " );";
    MissionDatabase.run(command);
  }
  //*** Remove the given Group from the list of Slots
  static fn_RemoveGroup( a_GivenGroup ) {
    MissionDatabase.run("");
  }
  //*** Remove the given Slot from the given Group
  static fn_RemoveSlot( a_GivenGroup, a_GivenSlot ) {
    MissionDatabase.run("");
  }

  //*** Reserve a given slot for a given user
  static fn_ReserveSlot( a_MissionName, a_GivenGroup, a_GivenSlot, a_GivenUser ) {
    command = "UPDATE " + a_MissionName +
    " SET UserName = " + a_GivenUser +
    " WHERE ( GroupName = " + a_GivenGroup +
    " AND SlotName = " + a_GivenSlot +
    " );";
    MissionDatabase.run(command);
  }

  //*** Change the name of the Mission
  static set fn_SetMissionName( a_NewName ) {
    MissionDatabase.run("");
  }

  //*** Return the entire Mission Data object for display purposes
  static get GetMissionData( a_MissionName ) {
    command = "SELECT *" +
    " FROM " + a_MissionName +
    " ORDER BY GroupName ASC";
    MissionDatabase.get("");
  }
}



module.exports = Mission;
