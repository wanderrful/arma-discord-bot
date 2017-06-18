const MissionDatabase = require('sqlite');



MissionDatabase.open( Path.join(__dirname, "database.sqlite") );



modules.exports = MissionDatabase;
