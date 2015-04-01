"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: DataTypes.STRING,
    interval: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.keywords, {
          through: 'keywords_users',
          foreignKey: 'user_id'
        });
      }
    }
  });
  return users;
};