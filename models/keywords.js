"use strict";
module.exports = function(sequelize, DataTypes) {
  var keywords = sequelize.define("keywords", {
    term: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return keywords;
};