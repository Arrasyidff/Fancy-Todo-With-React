'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/hashingPass')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'UserId',
        sourceKey: 'id'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate (user, opt) {
        user.password = hashPass(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};