"use strict";
module.exports = function(sequelize, DataTypes) {
  var keywords = sequelize.define("keywords", {
    term: DataTypes.STRING,
    uri: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        keywords.belongsToMany(models.users, {
          through: 'keywords_users',
          foreignKey: 'keyword_id'
        });
      }
    }
  });
  return keywords;
};