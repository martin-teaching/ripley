'use strict';
module.exports = function(sequelize, DataTypes) {
  var incidentDetails = sequelize.define('incident_details', {
    details: DataTypes.TEXT,
    description: DataTypes.TEXT,
    primary_key: {
        type: DataTypes.STRING,
        primaryKey: true,
      }
  	}, {
    classMethods: {
      associate: function(models) {
    	  incidentDetails.belongsTo(models.incidents,  {foreignKey: 'foreign_key'});
      }
    }
  });
  incidentDetails.removeAttribute("updatedAt");
  incidentDetails.removeAttribute("createdAt");
  return incidentDetails;
};
