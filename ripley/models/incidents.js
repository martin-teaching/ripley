'use strict';
module.exports = function(sequelize, DataTypes) {
  var incidents = sequelize.define('incidents', {
    dateandtime: {
	    type: DataTypes.DATE,
	    get: function() {
	      return require('moment').utc(this.getDataValue('dateandtime')).format('YYYY-MM-DD HH:mm:ss');
	    }
	},
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    shape: DataTypes.TEXT,
    duration: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    posted: {
    	type: DataTypes.DATEONLY,
	    get: function() {
	      return require('moment').utc(this.getDataValue('posted')).format('YYYY-MM-DD');
	    }
	},
    primary_key: {
        type: DataTypes.STRING,
        primaryKey: true,
      }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  incidents.removeAttribute("updatedAt");
  incidents.removeAttribute("createdAt");
  return incidents;
};
