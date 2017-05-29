'use strict';
module.exports = function(sequelize, DataTypes) {
  var access = sequelize.define('access', {
    group_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return access;
};
