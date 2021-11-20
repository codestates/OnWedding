"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Article.hasMany(models.Comment, {
        foreignKey: "article_id",
        sourceKey: "id",
      });
      models.Article.belongsTo(models.User, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.Article.hasMany(models.Article_Hashtag, {
        foreignKey: "article_id",
        sourceKey: "id",
      });

      // define association here
    }
  }
  Article.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      message: DataTypes.TEXT,
      image: DataTypes.STRING,
      total_comment: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
