"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Username cannot be empty!'},
        isUnique: function(value) {
          return users.find({where: {name: value}})
          .then(function(user) {
            if (user) {
              throw new Error('User already exists!');
            }
          });
        },
      }
    },
    password: DataTypes.STRING,
    interval: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {msg: 'Work interval must be a number'},
        max: {
          args: 60,
          msg: 'Work interval must be 60 min or less'
        },
        min: {
          args: 0,
          msg: 'Work interval must be 0 min or greater'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {msg: 'Break duration must be a number'},
        max: {
          args: 60,
          msg: 'Break duration must be 60 min or less'
        },
        min: {
          args: 0,
          msg: 'Break duration must be 0 min or greater'
        }
      }
    }
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