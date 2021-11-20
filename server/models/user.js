"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Article, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.User.hasMany(models.Comment, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      birth: DataTypes.STRING,
      mobile: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
