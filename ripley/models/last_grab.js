'use strict';
module.exports = function(sequelize, DataTypes) {
  var lastGrab = sequelize.define('last_grab', {
    primary_key: {
	    type: DataTypes.STRING,
	    primaryKey: true,
	},
  	grabbed: DataTypes.TEXT,
  	}, 
  	{ 
  	freezeTableName: true 
  	}
  );
  lastGrab.removeAttribute("updatedAt");
  lastGrab.removeAttribute("createdAt");
  return lastGrab;
};
