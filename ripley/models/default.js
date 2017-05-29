"use strict";

module.exports = function(sequelize, DataTypes) {
  var default_model = sequelize.define("default", {
    default_model: DataTypes.STRING
  }, {
    classMethods: {}
  });

  return default_model;
};
